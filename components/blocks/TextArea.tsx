import { RootState } from '@/store';
import { setScreenValue } from '@/store/screenSlice';
import React from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

export const TextArea = ({ block }: { block: any }) => {
    const dispatch = useDispatch();
    const text = useSelector((state: RootState) => state.screen.data[block.id]) || '';

    const handleChange = (val: string) => {
        dispatch(setScreenValue({ key: block.id, value: val }));
    };

    const limit = block.character_limit || 120;

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                multiline
                placeholder={block.placeholder || 'Write your intention...'}
                placeholderTextColor="#9CA3AF"
                maxLength={limit}
                value={text}
                onChangeText={handleChange}
                textAlignVertical="top"
            />
            <View style={styles.footer}>
                <Text style={styles.charCount}>
                    {text.length} / {limit}
                </Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FFFFFF',
        borderRadius: 20,
        padding: 20,
        width: '100%',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.05,
        shadowRadius: 20,
        elevation: 2,
        marginVertical: 16,
        minHeight: 180,
    },
    input: {
        fontSize: 18,
        color: '#1F2937',
        lineHeight: 28,
        fontFamily: 'System',
        minHeight: 120,
        flex: 1,
    },
    footer: {
        alignItems: 'flex-end',
        marginTop: 12,
    },
    charCount: {
        fontSize: 12,
        color: '#9CA3AF',
        fontWeight: '500',
    },
});
