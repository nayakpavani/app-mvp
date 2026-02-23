import { goBack, navigate } from '@/store/screenSlice';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useMemo, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch } from 'react-redux';
import { BlockRenderer } from '../blocks/BlockRenderer';

export const PracticeRunnerContainer = ({ manifest }: { manifest: any }) => {
    const dispatch = useDispatch();
    const [count, setCount] = useState(0);

    const statusMessage = useMemo(() => {
        if (count === 0) return "Ready to begin";
        if (count < manifest.target_count / 2) return "Chant focused...";
        if (count < manifest.target_count) return "Feel the resonance...";
        return "Practice complete";
    }, [count, manifest.target_count]);

    const logRep = () => {
        if (manifest.variant === 'mantra_runner') {
            if (count < manifest.target_count) {
                const newCount = count + 1;
                setCount(newCount);
                if (newCount >= manifest.target_count) {
                    setTimeout(() => {
                        const action = manifest.on_complete || manifest.complete_action;
                        if (action) dispatch(navigate(action.target));
                    }, 1000);
                }
            }
        }
    };

    return (
        <View style={styles.container}>
            <LinearGradient
                colors={['#0E1012', '#080A0C']}
                style={StyleSheet.absoluteFill}
            />

            <SafeAreaView style={styles.safe}>
                <View style={styles.header}>
                    <TouchableOpacity
                        style={styles.exitBtn}
                        onPress={() => dispatch(goBack())}
                    >
                        <Ionicons name="close" size={20} color="rgba(255,255,255,0.6)" />
                        <Text style={styles.exitText}>Exit</Text>
                    </TouchableOpacity>
                </View>

                <TouchableOpacity
                    style={styles.centerStage}
                    activeOpacity={manifest.variant === 'mantra_runner' ? 0.9 : 1}
                    onPress={logRep}
                >
                    {manifest.variant === 'mantra_runner' && (
                        <View style={styles.mantraContent}>
                            <View style={styles.statusChip}>
                                <Text style={styles.statusText}>{statusMessage}</Text>
                            </View>
                            <Text style={styles.mantraText}>{manifest.mantra_text}</Text>
                            <View style={styles.counterRing}>
                                <Text style={styles.countText}>{count}</Text>
                                <Text style={styles.totalText}>/ {manifest.target_count}</Text>
                            </View>
                            <Text style={styles.tapHint}>Tap for each repetition</Text>
                        </View>
                    )}

                    {manifest.variant === 'sankalp_embody' && (
                        <View style={styles.sankalpContent}>
                            <View style={styles.statusChip}>
                                <Text style={styles.statusText}>Embodiment</Text>
                            </View>
                            <Text style={styles.sankalpText}>&quot;{manifest.sankalp_text}&quot;</Text>
                            <Text style={styles.instruction}>Read slowly. Internalize. Commit.</Text>
                            <TouchableOpacity
                                style={styles.activateBtn}
                                onPress={() => dispatch(navigate((manifest.on_complete || manifest.complete_action).target))}
                            >
                                <Text style={styles.activateText}>I Embody This →</Text>
                            </TouchableOpacity>
                        </View>
                    )}

                    {!manifest.variant && manifest.blocks && (
                        <View style={styles.blockContent}>
                            {manifest.blocks.map((block: any, i: number) => (
                                <BlockRenderer key={i} block={block} />
                            ))}
                        </View>
                    )}
                </TouchableOpacity>

                {manifest.variant === 'mantra_runner' && (
                    <View style={styles.progressBarWrap}>
                        <View style={[styles.progressLine, { width: `${(count / manifest.target_count) * 100}%` }]} />
                    </View>
                )}
            </SafeAreaView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#0E1012',
    },
    safe: {
        flex: 1,
        paddingHorizontal: 24,
    },
    header: {
        height: 60,
        justifyContent: 'center',
    },
    exitBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(255,255,255,0.05)',
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 20,
        alignSelf: 'flex-start',
        gap: 4,
    },
    exitText: {
        color: 'rgba(255,255,255,0.6)',
        fontSize: 14,
    },
    centerStage: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    mantraContent: {
        alignItems: 'center',
        width: '100%',
    },
    sankalpContent: {
        alignItems: 'center',
        width: '100%',
    },
    statusChip: {
        paddingVertical: 6,
        paddingHorizontal: 12,
        borderRadius: 100,
        backgroundColor: 'rgba(250, 204, 21, 0.1)',
        marginBottom: 24,
    },
    statusText: {
        fontSize: 12,
        textTransform: 'uppercase',
        letterSpacing: 2,
        color: '#FACC15',
        fontWeight: '600',
    },
    mantraText: {
        fontSize: 40,
        color: '#FFFFFF',
        textAlign: 'center',
        marginBottom: 40,
        fontWeight: '300',
        fontFamily: 'System',
    },
    sankalpText: {
        fontSize: 32,
        color: '#FFFFFF',
        textAlign: 'center',
        marginBottom: 40,
        fontStyle: 'italic',
        fontWeight: '300',
    },
    counterRing: {
        flexDirection: 'row',
        alignItems: 'baseline',
        marginBottom: 20,
    },
    countText: {
        fontSize: 84,
        fontWeight: '200',
        color: '#FFFFFF',
    },
    totalText: {
        fontSize: 24,
        color: 'rgba(255,255,255,0.4)',
        marginLeft: 8,
    },
    tapHint: {
        color: 'rgba(255,255,255,0.4)',
        textTransform: 'uppercase',
        letterSpacing: 2,
        fontSize: 12,
        marginTop: 20,
    },
    instruction: {
        color: 'rgba(255,255,255,0.5)',
        fontSize: 16,
        marginBottom: 40,
        textAlign: 'center',
    },
    activateBtn: {
        backgroundColor: '#FACC15',
        paddingVertical: 18,
        paddingHorizontal: 40,
        borderRadius: 40,
    },
    activateText: {
        color: '#111827',
        fontWeight: '700',
        fontSize: 18,
    },
    blockContent: {
        width: '100%',
        alignItems: 'center',
    },
    progressBarWrap: {
        height: 4,
        backgroundColor: 'rgba(255,255,255,0.1)',
        width: '100%',
        borderRadius: 2,
        overflow: 'hidden',
        marginBottom: 40,
    },
    progressLine: {
        height: '100%',
        backgroundColor: '#FACC15',
    },
});
