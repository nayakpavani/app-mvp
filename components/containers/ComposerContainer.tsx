import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BlockRenderer } from '../blocks/BlockRenderer';

export const ComposerContainer = ({ manifest }: { manifest: any }) => {
    const isLightSandal = manifest.tone?.theme === 'light_sandal';
    const backgroundColor = isLightSandal ? '#FAF7F2' : '#111827';

    return (
        <SafeAreaView style={[styles.safe, { backgroundColor }]}>
            <View style={styles.container}>
                <ScrollView
                    contentContainerStyle={styles.scrollContent}
                    showsVerticalScrollIndicator={false}
                >
                    {manifest.blocks.map((block: any, index: number) => (
                        <BlockRenderer key={index} block={block} />
                    ))}
                </ScrollView>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safe: {
        flex: 1,
    },
    container: {
        flex: 1,
    },
    scrollContent: {
        padding: 24,
        paddingTop: 40,
        paddingBottom: 40,
    },
});
