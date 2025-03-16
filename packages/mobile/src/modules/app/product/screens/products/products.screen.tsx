import { useNavigation } from '@react-navigation/native';
import { Text, View } from 'react-native';
import { NAVIGATION_KEYS, StackNavigation } from 'src/modules/navigation/types';
import { Product } from 'src/services/product/types/product';
import { List } from 'src/shared/components/list';
import { ListItem } from 'src/shared/components/list-item';
import { styles } from './products.styles';
import { useEffect, useState } from 'react';
import { Input } from 'src/shared/components/input';
import { useForm } from 'react-hook-form';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useDebounceEffect, useGetAllProducts } from 'src/hooks/product';
import { COLORS } from 'src/shared/styles';

type FormData = {
	search: string;
};

export const ProductsScreen = () => {
	const { navigate } = useNavigation<StackNavigation>();

	const [productsData, setProductsData] = useState<Product[]>([]);
	const [isFetchingMore, setIsFetchingMore] = useState<boolean>(false);
	const [page, setPage] = useState<number>(1);
	const [debouncedQuery, setDebouncedQuery] = useState('');
	const [sort, setSort] = useState<'asc' | 'desc' | null>(null);
	const [isRefreshing, setIsRefreshing] = useState<boolean>(false);

	const { control, watch } = useForm<FormData>({
		defaultValues: {
			search: '',
		},
	});
	const search = watch('search');

	useDebounceEffect(
		() => {
			setPage(1);
			setDebouncedQuery(search);
		},
		500,
		[search, sort],
	);

	const { data, isLoading, refetch } = useGetAllProducts({
		page,
		pageSize: 10,
		search: debouncedQuery,
		sort: sort ?? undefined,
	});

	useEffect(() => {
		if (data) {
			if (page === 1) {
				setProductsData(data);
			} else {
				setProductsData((prev) => [...prev, ...data]);
			}
			setIsFetchingMore(false);
		}
	}, [data]);

	const loadMore = () => {
		if (!isFetchingMore && data && data.length > 0) {
			setIsFetchingMore(true);
			setPage((previousPage) => previousPage + 1);
		}
	};

	const refreshList = async () => {
		setIsRefreshing(true);
		setPage(1);
		await refetch();
		setIsRefreshing(false);
	};

	return (
		<View style={styles.screenWrapper}>
			<View style={styles.inputSectionWrapper}>
				<Input
					name={'search'}
					control={control}
					placeholder={'Enter product name'}
				/>
				<View style={styles.sortingSection}>
					<Text style={styles.sortingText}>Sort by price:</Text>
					<Ionicons
						onPress={() => setSort('desc')}
						name={'chevron-down-circle-outline'}
						size={24}
						color={
							sort === 'desc' ? COLORS.blue : COLORS.secondaryGrey
						}
					/>
					<Ionicons
						onPress={() => setSort('asc')}
						name={'chevron-up-circle-outline'}
						size={24}
						color={
							sort === 'asc' ? COLORS.blue : COLORS.secondaryGrey
						}
					/>
					<Ionicons
						onPress={() => setSort(null)}
						name={'close-circle-outline'}
						size={24}
						color={!sort ? COLORS.blue : COLORS.secondaryGrey}
					/>
				</View>
			</View>
			<List
				isLoading={isLoading}
				isRefreshing={isRefreshing}
				onRefresh={refreshList}
				data={[...productsData]}
				keyExtractor={(item, index) => item.id + index}
				onEndReachedThreshold={0.25}
				onEndReached={loadMore}
				emptyMessage={'Products not found'}
				renderItem={({ item }) => (
					<ListItem
						onPress={() =>
							navigate(NAVIGATION_KEYS.PRODUCT_INFO, {
								productId: item.id,
							})
						}
						height={78}
					>
						<View style={styles.itemInfoSection}>
							<Text style={styles.text}>{item.name}</Text>
							<View style={styles.infoContainer}>
								<Text style={styles.boldText}>Category:</Text>
								<Text style={styles.text}>{item.category}</Text>
							</View>
						</View>
						<View style={styles.itemInfoSection}>
							<View style={styles.infoContainer}>
								<Text style={styles.boldText}>Price:</Text>
								<Text style={styles.text}>${item.price}</Text>
							</View>
						</View>
					</ListItem>
				)}
			/>
		</View>
	);
};
