import { navigate } from '@/store/screenSlice';
import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useDispatch } from 'react-redux';

export const ChoiceCard = ({ block }: { block: any }) => {
    const dispatch = useDispatch();
    const [selectedId, setSelectedId] = useState<string | null>(null);

    const handleSelect = (option: any) => {
        setSelectedId(option.id);

        // Visual feedback delay
        setTimeout(() => {
            if (block.on_select?.default) {
                dispatch(navigate(block.on_select.default.target));
            } else if (option.action) {
                dispatch(navigate(option.action.target));
            }
        }, 300);
    };

    return (
        <View style={styles.container}>
            {block.options?.map((option: any) => (
                <TouchableOpacity
                    key={option.id}
                    style={styles.card}
                    activeOpacity={0.8}
                    onPress={() => handleSelect(option)}
                >
                    <View style={styles.cardContent}>
                        <View style={styles.textContainer}>
                            <Text style={styles.title}>{option.title}</Text>
                            {option.description && (
                                <Text style={styles.description}>{option.description}</Text>
                            )}
                        </View>
                        <View style={[
                            styles.radioCircle,
                            selectedId === option.id && styles.radioCircleSelected
                        ]}>
                            {selectedId === option.id && <View style={styles.radioInner} />}
                        </View>
                    </View>
                </TouchableOpacity>
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        marginVertical: 12,
    },
    card: {
        backgroundColor: '#FFFFFF',
        paddingVertical: 20,
        paddingHorizontal: 24,
        borderRadius: 12,
        marginBottom: 16,
        // Cleaner shadow
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.03,
        shadowRadius: 10,
        elevation: 1,
    },
    cardContent: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    textContainer: {
        flex: 1,
        paddingRight: 16,
    },
    title: {
        color: '#374151',
        fontSize: 18,
        fontWeight: '400',
        marginBottom: 4,
        fontFamily: 'System',
    },
    description: {
        color: '#9CA3AF',
        fontSize: 14,
        lineHeight: 20,
        fontWeight: '300',
    },
    radioCircle: {
        width: 28,
        height: 28,
        borderRadius: 14,
        borderWidth: 1,
        borderColor: '#E5E7EB',
        alignItems: 'center',
        justifyContent: 'center',
    },
    radioCircleSelected: {
        borderColor: '#FACC15',
    },
    radioInner: {
        width: 14,
        height: 14,
        borderRadius: 7,
        backgroundColor: '#FACC15',
    },
});
