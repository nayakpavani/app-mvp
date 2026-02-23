import { RootState } from '@/store';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useSelector } from 'react-redux';

export const GraphBlock = ({ block }: { block: any }) => {
    const data = useSelector((state: RootState) => state.screen.data[block.data_key || 'identity_delta']) || [];

    return (
        <View style={styles.container}>
            {data.map((item: any, index: number) => (
                <View key={index} style={styles.row}>
                    <View style={styles.header}>
                        <Text style={styles.label}>{item.label}</Text>
                        <Text style={styles.value}>
                            +{Math.round(((item.current - item.initial) / 10) * 100)}%
                        </Text>
                    </View>

                    <View style={styles.barContainer}>
                        <View style={[styles.barInitial, { width: `${item.initial * 10}%` }]} />
                        <LinearGradient
                            colors={['#FACC15', '#EAB308']}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 0 }}
                            style={[styles.barCurrent, { width: `${item.current * 10}%` }]}
                        />
                    </View>

                    <View style={styles.footer}>
                        <Text style={styles.footerText}>Initial: {item.initial}/10</Text>
                        <Text style={styles.footerText}>Current: {item.current}/10</Text>
                    </View>
                </View>
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        gap: 24,
        marginVertical: 20,
    },
    row: {
        gap: 8,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    label: {
        fontSize: 18,
        color: '#FFFFFF',
        fontWeight: '300',
        fontFamily: 'System',
    },
    value: {
        fontSize: 14,
        fontWeight: '600',
        color: '#10B981',
    },
    barContainer: {
        height: 6,
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
        borderRadius: 3,
        position: 'relative',
        overflow: 'hidden',
    },
    barInitial: {
        position: 'absolute',
        height: '100%',
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        zIndex: 1,
        borderRadius: 3,
    },
    barCurrent: {
        position: 'absolute',
        height: '100%',
        zIndex: 2,
        borderRadius: 3,
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    footerText: {
        fontSize: 10,
        color: 'rgba(255, 255, 255, 0.4)',
        textTransform: 'uppercase',
        letterSpacing: 0.5,
    },
});
