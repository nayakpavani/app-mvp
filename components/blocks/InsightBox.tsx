import { StyleSheet, Text, View } from 'react-native';
import { DynamicIcon } from './DynamicIcon';

export const InsightBox = ({ block }: { block: any }) => {
    const items = block.items || [];
    const isHighlight = block.variant === 'highlight';

    return (
        <View style={[styles.container, isHighlight && styles.highlight]}>
            {items.map((item: any, i: number) => (
                <View key={i} style={styles.item}>
                    {item.icon && (
                        <View style={styles.iconWrap}>
                            <DynamicIcon name={item.icon} size={18} color="#FACC15" />
                        </View>
                    )}
                    <View style={styles.textContent}>
                        <Text style={styles.mainText}>{item.text}</Text>
                        {item.subtext && <Text style={styles.subText}>{item.subtext}</Text>}
                    </View>
                </View>
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.1)',
        borderRadius: 16,
        padding: 24,
        marginVertical: 16,
        gap: 16,
    },
    highlight: {
        backgroundColor: 'rgba(250, 204, 21, 0.05)',
        borderColor: 'rgba(250, 204, 21, 0.2)',
        borderLeftWidth: 4,
        borderLeftColor: '#FACC15',
    },
    item: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        gap: 16,
    },
    iconWrap: {
        marginTop: 2,
    },
    textContent: {
        flex: 1,
        gap: 4,
    },
    mainText: {
        fontSize: 15,
        color: '#FFFFFF',
        lineHeight: 22,
        fontWeight: '300',
    },
    subText: {
        fontSize: 13,
        color: 'rgba(255, 255, 255, 0.5)',
        fontStyle: 'italic',
        lineHeight: 18,
    },
});
