import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import {
	createContext,
	PropsWithChildren,
	ReactNode,
	useContext,
	useRef,
	useState,
} from 'react';

type BottomSheetContextType = {
	openSheet: (component: ReactNode) => void;
	closeSheet: () => void;
};

const BottomSheetContext = createContext<BottomSheetContextType>({
	openSheet: (content: ReactNode) => {},
	closeSheet: () => {},
});

export const BottomSheetProvider = ({ children }: PropsWithChildren) => {
	const [content, setContent] = useState<ReactNode>(null);

	const bottomSheetRef = useRef<BottomSheet>(null);

	const openSheet = (newContent: ReactNode) => {
		setContent(newContent);
		bottomSheetRef.current?.expand();
	};

	const closeSheet = () => bottomSheetRef.current?.close();

	return (
		<BottomSheetContext.Provider value={{ openSheet, closeSheet }}>
			{children}
			<BottomSheet
				ref={bottomSheetRef}
				index={-1}
				snapPoints={['25%']}
				enablePanDownToClose={true}
			>
				<BottomSheetView>{content}</BottomSheetView>
			</BottomSheet>
		</BottomSheetContext.Provider>
	);
};

export const useBottomSheetContext = () => useContext(BottomSheetContext);
