import React, { useEffect } from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import Animated, {
    Easing,
    useAnimatedStyle,
    useSharedValue,
    withDelay,
    withRepeat,
    withTiming
} from 'react-native-reanimated';

const { width, height } = Dimensions.get('window');
const PARTICLE_COUNT = 30;

const Particle = ({ index }: { index: number }) => {
    const x = useSharedValue(Math.random() * width);
    const y = useSharedValue(Math.random() * height);
    const opacity = useSharedValue(Math.random() * 0.5);

    useEffect(() => {
        x.value = withRepeat(
            withTiming(x.value + (Math.random() - 0.5) * 100, {
                duration: 5000 + Math.random() * 5000,
                easing: Easing.inOut(Easing.ease),
            }),
            -1,
            true
        );
        y.value = withRepeat(
            withTiming(y.value + (Math.random() - 0.5) * 100, {
                duration: 5000 + Math.random() * 5000,
                easing: Easing.inOut(Easing.ease),
            }),
            -1,
            true
        );
        opacity.value = withRepeat(
            withTiming(Math.random() * 0.8, {
                duration: 2000 + Math.random() * 3000,
            }),
            -1,
            true
        );
    }, [x, y, opacity]);

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [{ translateX: x.value }, { translateY: y.value }],
        opacity: opacity.value,
    }));

    return <Animated.View style={[styles.particle, animatedStyle]} />;
};

export const ParticleField = () => {
    return (
        <View style={StyleSheet.absoluteFill}>
            {Array.from({ length: PARTICLE_COUNT }).map((_, i) => (
                <Particle key={i} index={i} />
            ))}
        </View>
    );
};

export const Rise = ({ children, delay = 0 }: { children: React.ReactNode, delay?: number }) => {
    const opacity = useSharedValue(0);
    const translateY = useSharedValue(20);

    useEffect(() => {
        opacity.value = withDelay(delay, withTiming(1, { duration: 1000 }));
        translateY.value = withDelay(delay, withTiming(0, { duration: 1000, easing: Easing.out(Easing.back(1)) }));
    }, [delay, opacity, translateY]);

    const animatedStyle = useAnimatedStyle(() => ({
        opacity: opacity.value,
        transform: [{ translateY: translateY.value }],
        width: '100%',
        alignItems: 'center',
    }));

    return <Animated.View style={animatedStyle}>{children}</Animated.View>;
};

const styles = StyleSheet.create({
    particle: {
        position: 'absolute',
        width: 2,
        height: 2,
        borderRadius: 1,
        backgroundColor: '#C9A84C',
    },
});
