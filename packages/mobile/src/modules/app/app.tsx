import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useFonts } from 'expo-font';
import { RootNavigator } from '../navigation/components/root-navigator';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { FONTS } from 'src/shared/styles';
import Toast from 'react-native-toast-message';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { BottomSheetProvider } from 'src/shared/contexts/bottom-sheet';

export const App = () => {
	const [fontsLoaded, fontsError] = useFonts({
		[FONTS.poppinsRegular]: require('../../../assets/fonts/Poppins-Regular.ttf'),
		[FONTS.poppinsMedium]: require('../../../assets/fonts/Poppins-Medium.ttf'),
		[FONTS.poppinsSemiBold]: require('../../../assets/fonts/Poppins-SemiBold.ttf'),
		[FONTS.poppinsBold]: require('../../../assets/fonts/Poppins-Bold.ttf'),
	});

	const queryClient = new QueryClient();

	useEffect(() => {
		if (fontsLoaded || fontsError) {
			SplashScreen.hideAsync();
		}
	}, [fontsLoaded, fontsError]);

	if (!fontsLoaded && !fontsError) {
		return null;
	}

	return (
		<QueryClientProvider client={queryClient}>
			<GestureHandlerRootView>
				<SafeAreaProvider>
					<BottomSheetProvider>
						<RootNavigator />
						<Toast />
					</BottomSheetProvider>
				</SafeAreaProvider>
			</GestureHandlerRootView>
		</QueryClientProvider>
	);
};
