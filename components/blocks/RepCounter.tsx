import { navigate } from '@/store/screenSlice';
import * as Haptics from 'expo-haptics';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Animated, {
    Easing,
    useAnimatedStyle,
    useSharedValue,
    withDelay,
    withRepeat,
    withTiming
} from 'react-native-reanimated';
import { useDispatch } from 'react-redux';

export const RepCounter = ({ block }: { block: any }) => {
    const dispatch = useDispatch();
    const [count, setCount] = useState(0);
    const total = Number(block.total) || 9;

    const logRep = () => {
        if (count < total) {
            const newCount = count + 1;
            setCount(newCount);
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);

            if (newCount === total) {
                setTimeout(() => {
                    if (block.on_complete) {
                        dispatch(navigate(block.on_complete.target));
                    }
                }, 800);
            }
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.counterDisplay}>
                <Text style={styles.current}>{count}</Text>
                <Text style={styles.separator}>/</Text>
                <Text style={styles.total}>{total}</Text>
            </View>

            <TouchableOpacity
                style={styles.tapTarget}
                onPress={logRep}
                activeOpacity={0.7}
            >
                <View style={styles.rings}>
                    {[0, 1, 2].map((i) => (
                        <PulseRing key={i} delay={i * 600} />
                    ))}
                </View>
                <Text style={styles.tapLabel}>Tap</Text>
            </TouchableOpacity>
        </View>
    );
};

const PulseRing = ({ delay }: { delay: number }) => {
    const scale = useSharedValue(0.5);
    const opacity = useSharedValue(0.8);

    useEffect(() => {
        scale.value = withRepeat(
            withDelay(delay, withTiming(1.6, { duration: 2000, easing: Easing.out(Easing.ease) })),
            -1,
            false
        );
        opacity.value = withRepeat(
            withDelay(delay, withTiming(0, { duration: 2000, easing: Easing.out(Easing.ease) })),
            -1,
            false
        );
    }, []);

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [{ scale: scale.value }],
        opacity: opacity.value,
    }));

    return <Animated.View style={[styles.ring, animatedStyle]} />;
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        gap: 40,
        width: '100%',
        paddingVertical: 20,
    },
    counterDisplay: {
        flexDirection: 'row',
        alignItems: 'baseline',
        gap: 12,
    },
    current: {
        fontSize: 72,
        fontWeight: '200',
        color: '#FACC15',
        fontFamily: 'System',
    },
    separator: {
        fontSize: 32,
        color: 'rgba(255, 255, 255, 0.2)',
    },
    total: {
        fontSize: 32,
        color: 'rgba(255, 255, 255, 0.4)',
        fontWeight: '300',
    },
    tapTarget: {
        width: 140,
        height: 140,
        alignItems: 'center',
        justifyContent: 'center',
    },
    rings: {
        ...StyleSheet.absoluteFillObject,
        alignItems: 'center',
        justifyContent: 'center',
    },
    ring: {
        position: 'absolute',
        width: 120,
        height: 120,
        borderRadius: 60,
        borderWidth: 1.5,
        borderColor: '#FACC15',
    },
    tapLabel: {
        fontSize: 14,
        textTransform: 'uppercase',
        letterSpacing: 3,
        color: '#FACC15',
        fontWeight: '700',
        marginTop: 4,
    },
});
