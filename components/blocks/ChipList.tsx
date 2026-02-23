import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export const ChipList = ({ block }: { block: any }) => {
    return (
        <View style={styles.container}>
            {block.label && <Text style={styles.label}>{block.label}</Text>}
            <View style={styles.chipContainer}>
                {block.options?.map((option: any) => (
                    <TouchableOpacity key={option.id} style={styles.chip} activeOpacity={0.8}>
                        <Text style={styles.chipText}>{option.label}</Text>
                    </TouchableOpacity>
                ))}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        marginVertical: 12,
    },
    label: {
        color: '#9CA3AF',
        fontSize: 12,
        fontWeight: '700',
        letterSpacing: 1,
        marginBottom: 12,
        textTransform: 'uppercase',
    },
    chipContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 8,
    },
    chip: {
        backgroundColor: '#FFFFFF',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 100,
        marginBottom: 8,
    },
    chipText: {
        color: '#1F2937',
        fontSize: 14,
        fontWeight: '500',
    },
});
