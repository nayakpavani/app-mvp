import { RootState } from '@/store';
import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { useSelector } from 'react-redux';

export const Headline = ({ block }: { block: any }) => {
    const currentManifest = useSelector((state: RootState) => state.screen.currentManifest);
    const isLight = currentManifest?.tone?.theme === 'light_sandal';
    const isGold = block.style === 'gold' || (typeof block.style === 'string' && block.style.includes('gold'));

    return (
        <Text style={[
            styles.text,
            isLight && styles.lightThemeText,
            isGold && styles.goldText,
            block.style && typeof block.style === 'object' && block.style
        ]}>
            {block.content}
        </Text>
    );
};

const styles = StyleSheet.create({
    text: {
        fontSize: 28,
        fontWeight: '300',
        color: '#FFFFFF',
        textAlign: 'center',
        marginBottom: 8,
        letterSpacing: 0.5,
        width: '100%',
    },
    lightThemeText: {
        color: '#1F2937',
        fontSize: 26,
        fontWeight: '400',
        letterSpacing: 1,
        lineHeight: 34,
        marginBottom: 12,
    },
    goldText: {
        color: '#FACC15',
    },
});
