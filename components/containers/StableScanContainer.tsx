import { RootState } from '@/store';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useMemo } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSelector } from 'react-redux';
import { BlockRenderer } from '../blocks/BlockRenderer';

export const StableScanContainer = ({ manifest }: { manifest: any }) => {
    const screenData = useSelector((state: RootState) => state.screen.data);

    const dynamicBlocks = useMemo(() => {
        if (!manifest?.blocks) return [];

        const baseBlocks = JSON.parse(JSON.stringify(manifest.blocks));
        const selectionBlock = baseBlocks.find((b: any) => b.id === 'prana_baseline_selection');

        if (selectionBlock) {
            const focus = screenData['scan_focus'] || 'peacecalm';
            if (manifest.optionsMap && manifest.optionsMap[focus]) {
                selectionBlock.options = manifest.optionsMap[focus];
            }

            const defaultInternal = selectionBlock.options?.[0]?.id;
            const selectedId = screenData['prana_baseline_selection'] || defaultInternal;

            if (manifest.subCategorySliders) {
                const sliders = manifest.subCategorySliders[selectedId];
                if (sliders) {
                    const sliderBlocks = sliders.map((s: any) => ({
                        type: "baseline_slider",
                        label: s.label,
                        value: s.value
                    }));
                    return [...baseBlocks, ...sliderBlocks];
                }
            }
        }

        return baseBlocks;
    }, [manifest, screenData]);

    const headerBlocks = dynamicBlocks.filter((b: any) => b.position === 'header');
    const contentBlocks = dynamicBlocks.filter((b: any) => !b.position || b.position === 'content');
    const footerBlocks = dynamicBlocks.filter((b: any) => b.position === 'footer');

    return (
        <SafeAreaView style={styles.safe}>
            <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
                <View style={styles.header}>
                    {headerBlocks.map((block: any, i: number) => (
                        <BlockRenderer key={`header-${i}`} block={block} />
                    ))}
                </View>

                <View style={styles.inputSections}>
                    {contentBlocks.map((block: any, i: number) => (
                        <View key={`block-${i}`} style={styles.blockWrapper}>
                            {block.section_title && (
                                <View style={styles.sectionDivider}>
                                    <Text style={styles.dividerText}>{block.section_title}</Text>
                                    <LinearGradient
                                        colors={['#FACC15', 'transparent']}
                                        start={{ x: 0, y: 0.5 }}
                                        end={{ x: 1, y: 0.5 }}
                                        style={styles.line}
                                    />
                                </View>
                            )}
                            <BlockRenderer block={block} />
                        </View>
                    ))}
                </View>

                <View style={styles.footer}>
                    {footerBlocks.map((block: any, i: number) => (
                        <BlockRenderer key={`footer-${i}`} block={block} />
                    ))}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safe: {
        flex: 1,
        backgroundColor: '#0E1012',
    },
    scrollContent: {
        padding: 24,
        paddingTop: 60,
    },
    header: {
        marginBottom: 40,
        alignItems: 'center',
    },
    inputSections: {
        gap: 32,
    },
    blockWrapper: {
        width: '100%',
    },
    sectionDivider: {
        marginBottom: 20,
        gap: 8,
    },
    dividerText: {
        fontSize: 12,
        textTransform: 'uppercase',
        letterSpacing: 2,
        color: '#FACC15',
        fontWeight: '600',
        fontFamily: 'System',
    },
    line: {
        height: 1,
        opacity: 0.3,
        width: '100%',
    },
    footer: {
        marginTop: 60,
        paddingBottom: 40,
        gap: 16,
        alignItems: 'center',
    },
});
