import React from 'react';
import { StyleSheet, Text } from 'react-native';

export const HelperText = ({ block }: { block: any }) => {
    return (
        <Text style={styles.text}>
            {block.content}
        </Text>
    );
};

const styles = StyleSheet.create({
    text: {
        fontSize: 14,
        color: 'rgba(255, 255, 255, 0.4)',
        textAlign: 'center',
        marginTop: 20,
        fontWeight: '300',
        fontFamily: 'System',
    },
});
