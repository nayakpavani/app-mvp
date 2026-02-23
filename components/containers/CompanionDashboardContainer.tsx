import { RootState } from '@/store';
import React, { useMemo } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Svg, { Circle } from 'react-native-svg';
import { useSelector } from 'react-redux';
import { BlockRenderer } from '../blocks/BlockRenderer';

export const CompanionDashboardContainer = ({ manifest }: { manifest: any }) => {
    const screenData = useSelector((state: RootState) => state.screen.data as any);

    const progress = useMemo(() => {
        const practiceCards = manifest.blocks.filter((b: any) => b.type === 'practice_card');
        if (practiceCards.length === 0) return 0;
        const completed = practiceCards.filter((b: any) => screenData[b.id]).length;
        return completed / practiceCards.length;
    }, [manifest.blocks, screenData]);

    const isDayComplete = progress === 1;
    const dayNumber = manifest.day_number || 1;
    const daysRemaining = 14 - dayNumber;

    const headerBlocks = manifest.blocks.filter((b: any) =>
        ['headline', 'subtext', 'identity_indicator'].includes(b.type)
    );

    const practiceBlocks = manifest.blocks.filter((b: any) => b.type === 'practice_card');
    const quickActions = manifest.blocks.filter((b: any) => b.position === 'footer_actions');
    const footerBlocks = manifest.blocks.filter((b: any) => b.position === 'footer');

    return (
        <SafeAreaView style={styles.safe}>
            <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
                <View style={styles.headerSection}>
                    {headerBlocks.map((block: any, i: number) => (
                        <BlockRenderer key={`header-${i}`} block={block} />
                    ))}
                    <View style={styles.cycleProgressContainer}>
                        <View style={[styles.barFill, { width: `${(dayNumber / 14) * 100}%` }]} />
                    </View>
                </View>

                <View style={styles.progressSection}>
                    <View style={styles.progressRingOuter}>
                        <View style={styles.progressRingInner}>
                            <Text style={styles.dayCount}>Day {dayNumber}</Text>
                            <Text style={styles.statusMsg}>{isDayComplete ? "Day Sealed" : "Begins Today"}</Text>
                        </View>
                        <Svg width="180" height="180" viewBox="0 0 100 100" style={styles.ringSvg}>
                            <Circle cx="50" cy="50" r="45" stroke="#F4EEE0" strokeWidth="4" fill="none" opacity={0.1} />
                            <Circle
                                cx="50"
                                cy="50"
                                r="45"
                                stroke={isDayComplete ? "#10B981" : "#FACC15"}
                                strokeWidth="4"
                                strokeLinecap="round"
                                fill="none"
                                strokeDasharray="282.7"
                                strokeDashoffset={282.7 - 282.7 * progress}
                            />
                        </Svg>
                    </View>
                </View>

                {isDayComplete && (
                    <View style={styles.reminderSection}>
                        <Text style={styles.remainingText}>
                            {daysRemaining} sessions remaining in this cycle.
                        </Text>
                    </View>
                )}

                <View style={styles.practiceList}>
                    {practiceBlocks.map((block: any, i: number) => (
                        <BlockRenderer key={`practice-${i}`} block={block} />
                    ))}
                </View>

                <View style={styles.quickActions}>
                    {quickActions.map((block: any, i: number) => (
                        <BlockRenderer key={`action-${i}`} block={block} />
                    ))}
                </View>

                <View style={styles.dashboardFooter}>
                    <View style={styles.divider}>
                        <View style={styles.diamond} />
                    </View>
                    <View style={styles.footerLinkWrap}>
                        {footerBlocks.map((block: any, i: number) => (
                            <BlockRenderer key={`footer-${i}`} block={block} />
                        ))}
                    </View>
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
        paddingTop: 40,
    },
    headerSection: {
        alignItems: 'center',
        marginBottom: 32,
    },
    cycleProgressContainer: {
        height: 2,
        backgroundColor: 'rgba(255,255,255,0.1)',
        width: '100%',
        marginTop: 20,
        borderRadius: 1,
        overflow: 'hidden',
    },
    barFill: {
        height: '100%',
        backgroundColor: '#FACC15',
    },
    progressSection: {
        alignItems: 'center',
        marginVertical: 40,
    },
    progressRingOuter: {
        width: 180,
        height: 180,
        alignItems: 'center',
        justifyContent: 'center',
    },
    progressRingInner: {
        alignItems: 'center',
        zIndex: 2,
    },
    dayCount: {
        fontSize: 32,
        color: '#FFFFFF',
        fontWeight: '300',
    },
    statusMsg: {
        fontSize: 14,
        color: 'rgba(255,255,255,0.4)',
    },
    ringSvg: {
        position: 'absolute',
        transform: [{ rotate: '-90deg' }],
    },
    practiceList: {
        gap: 16,
        marginBottom: 32,
    },
    quickActions: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 12,
        marginBottom: 40,
    },
    reminderSection: {
        alignItems: 'center',
        marginBottom: 24,
    },
    remainingText: {
        fontSize: 16,
        color: '#FACC15',
        fontStyle: 'italic',
        textAlign: 'center',
    },
    dashboardFooter: {
        marginTop: 'auto',
        alignItems: 'center',
    },
    divider: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: 1,
        backgroundColor: 'rgba(255,255,255,0.1)',
        marginVertical: 20,
    },
    diamond: {
        width: 6,
        height: 6,
        backgroundColor: '#FACC15',
        transform: [{ rotate: '45deg' }],
        position: 'absolute',
    },
    footerLinkWrap: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
});
