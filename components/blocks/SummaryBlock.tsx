import { RootState } from '@/store';
import React, { useMemo } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useSelector } from 'react-redux';

export const SummaryBlock = ({ block }: { block: any }) => {
    const screenData = useSelector((state: RootState) => state.screen.data as any);

    const summaryData = useMemo(() => {
        if (block.fields) {
            return block.fields.map((field: any) => ({
                label: field.label,
                value: screenData[field.value_key] || "—"
            }));
        }

        if (block.data_key) {
            const data = screenData[block.data_key] || {};
            return Object.entries(data).map(([key, value]) => ({
                label: key.replace(/_/g, ' ').toUpperCase(),
                value: value as string
            }));
        }

        return [];
    }, [block.fields, block.data_key, screenData]);

    return (
        <View style={styles.container}>
            {summaryData.map((item: any, i: number) => (
                <View key={i} style={[styles.item, i === summaryData.length - 1 && styles.lastItem]}>
                    <Text style={styles.label}>{item.label}</Text>
                    <Text style={styles.value}>{item.value}</Text>
                </View>
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
        padding: 24,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.05)',
        marginVertical: 20,
        width: '100%',
    },
    item: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(255, 255, 255, 0.05)',
        paddingBottom: 12,
        marginBottom: 12,
    },
    lastItem: {
        borderBottomWidth: 0,
        paddingBottom: 0,
        marginBottom: 0,
    },
    label: {
        fontSize: 10,
        textTransform: 'uppercase',
        letterSpacing: 1.5,
        color: 'rgba(255, 255, 255, 0.4)',
        fontWeight: '700',
    },
    value: {
        fontSize: 16,
        color: '#FFFFFF',
        fontWeight: '300',
    },
});
