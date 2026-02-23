import { BlurView } from 'expo-blur';
import React from 'react';
import { Modal, SafeAreaView, StyleSheet, View } from 'react-native';
import { BlockRenderer } from '../blocks/BlockRenderer';

export const LockRitualOverlay = ({ manifest }: { manifest: any }) => {
    return (
        <Modal transparent animationType="fade" visible={true}>
            <BlurView intensity={30} tint="dark" style={StyleSheet.absoluteFill}>
                <SafeAreaView style={styles.container}>
                    <View style={styles.content}>
                        {manifest.blocks.map((block: any, index: number) => (
                            <BlockRenderer key={index} block={block} />
                        ))}
                    </View>
                </SafeAreaView>
            </BlurView>
        </Modal>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    content: {
        padding: 32,
        width: '90%',
        backgroundColor: 'rgba(17, 24, 39, 0.95)',
        borderRadius: 32,
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.1)',
        alignItems: 'center',
        gap: 24,
    },
});
