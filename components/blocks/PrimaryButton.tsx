import { navigate } from '@/store/screenSlice';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { useDispatch } from 'react-redux';
import { DynamicIcon } from './DynamicIcon';

export const PrimaryButton = ({ block }: { block: any }) => {
    const dispatch = useDispatch();

    const handlePress = () => {
        if (block.action?.type === 'navigate') {
            dispatch(navigate(block.action.target));
        }
    };

    const isGold = block.style === 'gold' || (typeof block.style === 'string' && block.style.includes('gold'));

    return (
        <TouchableOpacity
            style={[styles.button, isGold && styles.goldButton, styles.row]}
            onPress={handlePress}
            activeOpacity={0.8}
        >
            {block.icon && (
                <DynamicIcon
                    name={block.icon}
                    size={20}
                    color={isGold ? '#111827' : '#FFFFFF'}
                    style={{ marginRight: 10 }}
                />
            )}
            <Text style={[styles.text, isGold && styles.goldText]}>{block.label}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        backgroundColor: '#1F2937',
        paddingVertical: 18,
        paddingHorizontal: 32,
        borderRadius: 16,
        width: '100%',
        alignItems: 'center',
        marginVertical: 12,
        borderWidth: 1,
        borderColor: '#374151',
    },
    goldButton: {
        backgroundColor: '#FACC15',
        borderColor: '#EAB308',
    },
    row: {
        flexDirection: 'row',
    },
    text: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: '600',
        letterSpacing: 0.5,
    },
    goldText: {
        color: '#111827',
    },
});
