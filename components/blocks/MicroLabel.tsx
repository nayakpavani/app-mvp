import React from 'react';
import { StyleSheet, Text } from 'react-native';

export const MicroLabel = ({ block }: { block: any }) => {
    const isGold = block.style === 'gold' || (typeof block.style === 'string' && block.style.includes('gold'));

    return (
        <Text style={[styles.text, isGold && styles.goldText, block.style]}>
            {block.content}
        </Text>
    );
};

const styles = StyleSheet.create({
    text: {
        fontSize: 10,
        fontWeight: '300',
        color: 'rgba(255, 255, 255, 0.4)',
        letterSpacing: 6,
        textAlign: 'center',
        marginBottom: 8,
        textTransform: 'uppercase',
    },
    goldText: {
        color: 'rgba(250, 204, 21, 0.4)',
    },
});
