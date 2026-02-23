import React from 'react';
import { SafeAreaView, ScrollView, StatusBar, StyleSheet, View } from 'react-native';
import { BlockRenderer } from '../blocks/BlockRenderer';

export const ChoiceStackContainer = ({ manifest }: { manifest: any }) => {
    // Determine theme properties
    const isLightSandal = manifest.tone?.theme === 'light_sandal';
    const backgroundColor = isLightSandal ? '#FAF7F2' : '#111827';
    const statusBarStyle = isLightSandal ? 'dark-content' : 'light-content';

    return (
        <SafeAreaView style={[styles.safe, { backgroundColor }]}>
            <StatusBar barStyle={statusBarStyle} />
            <View style={styles.container}>
                <ScrollView
                    contentContainerStyle={styles.scrollContent}
                    showsVerticalScrollIndicator={false}
                    alwaysBounceVertical={false}
                >
                    {manifest.blocks.map((block: any, index: number) => (
                        <BlockRenderer key={index} block={block} />
                    ))}
                    {/* Bottom spacer for comfortable scrolling */}
                    <View style={{ height: 40 }} />
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
        paddingHorizontal: 24,
        paddingTop: 60,
        paddingBottom: 24,
    },
});
