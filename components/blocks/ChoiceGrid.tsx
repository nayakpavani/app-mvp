import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export const ChoiceGrid = ({ block }: { block: any }) => {
    return (
        <View style={styles.container}>
            <View style={styles.grid}>
                {block.options?.map((option: any) => (
                    <TouchableOpacity key={option.id} style={styles.item} activeOpacity={0.8}>
                        <View style={styles.iconContainer}>
                            {/* We'll use a placeholder icon if the icon mapping isn't implementation yet */}
                            <Ionicons name="flash-outline" size={24} color="#C9A84C" />
                        </View>
                        <Text style={styles.itemTitle}>{option.title}</Text>
                    </TouchableOpacity>
                ))}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        marginVertical: 16,
    },
    grid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        gap: 12,
    },
    item: {
        width: '48%',
        backgroundColor: 'rgba(31, 41, 55, 0.5)',
        padding: 20,
        borderRadius: 20,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'rgba(75, 85, 99, 0.3)',
    },
    iconContainer: {
        marginBottom: 12,
    },
    itemTitle: {
        color: '#F3F4F6',
        fontSize: 14,
        fontWeight: '600',
        textAlign: 'center',
    },
});
