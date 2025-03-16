import { ScrollView, Text, View } from 'react-native';
import { styles } from './faq.styles';
import { Accordion } from 'src/shared/components/accordion';

export const FAQScreen = () => {
	return (
		<View style={styles.screenWrapper}>
			<ScrollView
				contentContainerStyle={styles.accordionsWrapper}
				showsVerticalScrollIndicator={false}
			>
				<Accordion title={'Is it safe to buy from us?'}>
					<Text style={styles.text}>
						There are many variations of passages of Lorem Ipsum
						available, but the majority have suffered alteration in
						some form, by injected humour, or randomised words which
						don't look even slightly believable. If you are going to
						use a passage of Lorem Ipsum, you need to be sure there
						isn't anything embarrassing hidden in the middle of
						text.
					</Text>
				</Accordion>
				<Accordion title={'Is it safe to buy from us?'}>
					<Text style={styles.text}>
						There are many variations of passages of Lorem Ipsum
						available, but the majority have suffered alteration in
						some form, by injected humour, or randomised words which
						don't look even slightly believable. If you are going to
						use a passage of Lorem Ipsum, you need to be sure there
						isn't anything embarrassing hidden in the middle of
						text.
					</Text>
				</Accordion>
				<Accordion title={'Is it safe to buy from us?'}>
					<Text style={styles.text}>
						There are many variations of passages of Lorem Ipsum
						available, but the majority have suffered alteration in
						some form, by injected humour, or randomised words which
						don't look even slightly believable. If you are going to
						use a passage of Lorem Ipsum, you need to be sure there
						isn't anything embarrassing hidden in the middle of
						text.
					</Text>
				</Accordion>
				<Accordion title={'Is it safe to buy from us?'}>
					<Text style={styles.text}>
						There are many variations of passages of Lorem Ipsum
						available, but the majority have suffered alteration in
						some form, by injected humour, or randomised words which
						don't look even slightly believable. If you are going to
						use a passage of Lorem Ipsum, you need to be sure there
						isn't anything embarrassing hidden in the middle of
						text.
					</Text>
				</Accordion>
				<Accordion title={'Is it safe to buy from us?'}>
					<Text style={styles.text}>
						There are many variations of passages of Lorem Ipsum
						available, but the majority have suffered alteration in
						some form, by injected humour, or randomised words which
						don't look even slightly believable. If you are going to
						use a passage of Lorem Ipsum, you need to be sure there
						isn't anything embarrassing hidden in the middle of
						text.
					</Text>
				</Accordion>
			</ScrollView>
		</View>
	);
};
