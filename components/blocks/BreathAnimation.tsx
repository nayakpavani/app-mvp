import { navigate } from '@/store/screenSlice';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Animated, {
    Easing,
    useAnimatedStyle,
    useSharedValue,
    withTiming
} from 'react-native-reanimated';
import { useDispatch } from 'react-redux';

const PHASE_TEXT: Record<string, string> = {
    wait: "Prepare...",
    inhale: "Inhale slowly",
    hold: "Hold with awareness",
    exhale: "Exhale completely",
};

export const BreathAnimation = ({ block }: { block: any }) => {
    const dispatch = useDispatch();
    const [currentCycle, setCurrentCycle] = useState(1);
    const totalCycles = block.cycles || 3;
    const [phase, setPhase] = useState('wait');

    const scale = useSharedValue(1);
    const glowOpacity = useSharedValue(0.2);

    useEffect(() => {
        let isMounted = true;

        const startBreathing = async () => {
            for (let i = 1; i <= totalCycles; i++) {
                if (!isMounted) break;
                setCurrentCycle(i);

                // Inhale (4s)
                setPhase('inhale');
                scale.value = withTiming(2.2, { duration: 4000, easing: Easing.linear });
                await new Promise(r => setTimeout(r, 4000));

                // Hold (4s)
                if (!isMounted) break;
                setPhase('hold');
                glowOpacity.value = withTiming(0.6, { duration: 2000 });
                await new Promise(r => setTimeout(r, 4000));

                // Exhale (4s)
                if (!isMounted) break;
                setPhase('exhale');
                scale.value = withTiming(1, { duration: 4000, easing: Easing.linear });
                glowOpacity.value = withTiming(0.2, { duration: 2000 });
                await new Promise(r => setTimeout(r, 4000));
            }

            if (isMounted) {
                if (block.on_complete) {
                    dispatch(navigate(block.on_complete.target));
                }
            }
        };

        setTimeout(startBreathing, 1000);

        return () => { isMounted = false; };
    }, []);

    const animatedOrbStyle = useAnimatedStyle(() => ({
        transform: [{ scale: scale.value }],
    }));

    const animatedGlowStyle = useAnimatedStyle(() => ({
        opacity: glowOpacity.value,
    }));

    return (
        <View style={styles.container}>
            <Text style={styles.counter}>
                Cycle {Math.min(currentCycle, totalCycles)} of {totalCycles}
            </Text>

            <View style={styles.orbContainer}>
                <Animated.View style={[styles.glow, animatedGlowStyle]} />
                <Animated.View style={[styles.orb, animatedOrbStyle]}>
                    <View style={styles.orbInner} />
                </Animated.View>
            </View>

            <Text style={styles.phaseText}>{PHASE_TEXT[phase]}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        marginVertical: 40,
        width: '100%',
    },
    counter: {
        fontSize: 10,
        textTransform: 'uppercase',
        letterSpacing: 2,
        color: 'rgba(255, 255, 255, 0.4)',
        marginBottom: 40,
    },
    orbContainer: {
        width: 240,
        height: 240,
        alignItems: 'center',
        justifyContent: 'center',
    },
    orb: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: '#FACC15',
        justifyContent: 'center',
        alignItems: 'center',
    },
    orbInner: {
        width: '100%',
        height: '100%',
        borderRadius: 40,
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
    },
    glow: {
        position: 'absolute',
        width: 140,
        height: 140,
        borderRadius: 70,
        backgroundColor: '#FACC15',
        opacity: 0.2,
        // Radial glow approximation using large blur if available or just opacity
    },
    phaseText: {
        marginTop: 60,
        fontSize: 24,
        color: '#FFFFFF',
        fontWeight: '300',
        fontFamily: 'System',
        textAlign: 'center',
    },
});
