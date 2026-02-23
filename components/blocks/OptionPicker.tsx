import { RootState } from '@/store';
import { setScreenValue } from '@/store/screenSlice';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

export const OptionPicker = ({ block }: { block: any }) => {
    const dispatch = useDispatch();
    const currentValue = useSelector((state: RootState) => state.screen.data[block.id]);

    const select = (val: any) => {
        dispatch(setScreenValue({ key: block.id, value: val }));
    };

    return (
        <View style={styles.container}>
            <View style={styles.grid}>
                {block.options?.map((opt: any) => (
                    <TouchableOpacity
                        key={opt}
                        style={[styles.optBtn, currentValue === opt && styles.activeBtn]}
                        onPress={() => select(opt)}
                        activeOpacity={0.7}
                    >
                        <Text style={[styles.value, currentValue === opt && styles.activeText]}>{opt}</Text>
                        {block.unit && (
                            <Text style={[styles.unit, currentValue === opt && styles.activeUnit]}>{block.unit}</Text>
                        )}
                    </TouchableOpacity>
                ))}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginVertical: 20,
        width: '100%',
    },
    grid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 12,
        justifyContent: 'center',
    },
    optBtn: {
        backgroundColor: '#FFFFFF',
        borderWidth: 1.5,
        borderColor: '#E5E7EB',
        paddingVertical: 18,
        paddingHorizontal: 24,
        borderRadius: 16,
        alignItems: 'center',
        justifyContent: 'center',
        minWidth: 90,
    },
    activeBtn: {
        borderColor: '#FACC15',
        backgroundColor: 'rgba(250, 204, 21, 0.05)',
        shadowColor: '#FACC15',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 3,
    },
    value: {
        fontSize: 22,
        fontWeight: '600',
        color: '#1F2937',
    },
    activeText: {
        color: '#1F2937',
    },
    unit: {
        fontSize: 10,
        textTransform: 'uppercase',
        color: '#6B7280',
        letterSpacing: 1,
        marginTop: 4,
        fontWeight: '600',
    },
    activeUnit: {
        color: '#B45309',
    },
});
