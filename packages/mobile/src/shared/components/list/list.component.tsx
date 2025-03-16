import {
	ActivityIndicator,
	FlatList,
	FlatListProps,
	RefreshControl,
	Text,
	View,
} from 'react-native';
import { styles } from './list.styles';
import { COLORS } from 'src/shared/styles';

type ListProps<T> = FlatListProps<T> & {
	isLoading?: boolean;
	isRefreshing?: boolean;
	onRefresh?: () => void;
	emptyMessage: string;
};

export function List<T>({
	isLoading = false,
	isRefreshing = false,
	onRefresh,
	emptyMessage,
	...props
}: ListProps<T>) {
	return (
		<View style={styles.listWrapper}>
			<FlatList
				contentContainerStyle={styles.list}
				showsVerticalScrollIndicator={false}
				ListEmptyComponent={() => {
					return !isLoading ? (
						<View style={styles.emptyContainer}>
							<Text style={styles.emptyMessage}>
								{emptyMessage}
							</Text>
						</View>
					) : null;
				}}
				ListFooterComponent={() => {
					return !isLoading ? null : (
						<ActivityIndicator size={'large'} color={COLORS.blue} />
					);
				}}
				refreshControl={
					<RefreshControl
						refreshing={isRefreshing}
						onRefresh={onRefresh}
					/>
				}
				{...props}
			/>
		</View>
	);
}
