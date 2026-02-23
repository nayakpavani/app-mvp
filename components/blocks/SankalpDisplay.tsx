import { RootState } from '@/store';
import { StyleSheet, Text, View } from 'react-native';
import { useSelector } from 'react-redux';

export const SankalpDisplay = ({ block }: { block: any }) => {
    const text = useSelector((state: RootState) => state.screen.data[block.text_key]) || block.content || '...';

    return (
        <View style={styles.container}>
            <Text style={styles.quoteMark}>“</Text>
            <Text style={styles.text}>{text}</Text>
            <Text style={[styles.quoteMark, styles.bottomQuote]}>”</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingVertical: 40,
        width: '100%',
        alignItems: 'center',
    },
    text: {
        fontSize: 28,
        lineHeight: 40,
        color: '#FFFFFF',
        fontStyle: 'italic',
        fontWeight: '300',
        textAlign: 'center',
        paddingHorizontal: 20,
        fontFamily: 'System',
    },
    quoteMark: {
        fontSize: 80,
        color: '#FACC15',
        opacity: 0.2,
        lineHeight: 80,
        height: 60,
    },
    bottomQuote: {
        alignSelf: 'flex-end',
        marginTop: -20,
    },
});
