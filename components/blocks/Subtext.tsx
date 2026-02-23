import { RootState } from '@/store';
import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { useSelector } from 'react-redux';

export const Subtext = ({ block }: { block: any }) => {
    const currentManifest = useSelector((state: RootState) => state.screen.currentManifest);
    const isLight = currentManifest?.tone?.theme === 'light_sandal';

    const isGold = block.style === 'gold' || (typeof block.style === 'string' && block.style.includes('gold'));

    return (
        <Text style={[
            styles.text,
            isLight && styles.lightThemeText,
            isGold && styles.goldText,
            block.style
        ]}>
            {block.content}
        </Text>
    );
};

const styles = StyleSheet.create({
    text: {
        fontSize: 16,
        color: 'rgba(255, 255, 255, 0.5)',
        textAlign: 'center',
        marginBottom: 24,
        lineHeight: 24,
        fontStyle: 'italic',
        fontWeight: '300',
        width: '100%',
    },
    lightThemeText: {
        color: '#9CA3AF',
        fontStyle: 'normal',
        fontSize: 15,
        marginBottom: 40,
    },
    goldText: {
        color: 'rgba(250, 204, 21, 0.6)',
    },
});
