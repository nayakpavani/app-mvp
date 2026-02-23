import React, { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Animated, {
    Easing,
    useAnimatedStyle,
    useSharedValue,
    withRepeat,
    withTiming
} from 'react-native-reanimated';

export const IdentityIndicator = ({ block }: { block: any }) => {
    const state = block.state || 'steady';
    const pulseScale = useSharedValue(1);
    const pulseOpacity = useSharedValue(0.5);

    const colors: Record<string, string> = {
        steady: '#E8C060',
        reactive: '#ff4d4d',
        drifting: '#4dabff',
    };

    const activeColor = colors[state] || colors.steady;

    useEffect(() => {
        pulseScale.value = withRepeat(
            withTiming(1.6, { duration: 2000, easing: Easing.out(Easing.ease) }),
            -1,
            false
        );
        pulseOpacity.value = withRepeat(
            withTiming(0, { duration: 2000, easing: Easing.out(Easing.ease) }),
            -1,
            false
        );
    }, []);

    const pulseStyle = useAnimatedStyle(() => ({
        transform: [{ scale: pulseScale.value }],
        opacity: pulseOpacity.value,
        borderColor: activeColor,
    }));

    const innerCircleStyle = {
        backgroundColor: activeColor,
        shadowColor: activeColor,
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.8,
        shadowRadius: 10,
    };

    return (
        <View style={styles.container}>
            <View style={styles.ringContainer}>
                <Animated.View style={[styles.pulseRing, pulseStyle]} />
                <View style={[styles.innerCircle, innerCircleStyle]} />
            </View>
            <Text style={styles.label}>{state.toUpperCase()}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        marginVertical: 20,
        gap: 12,
    },
    ringContainer: {
        width: 60,
        height: 60,
        alignItems: 'center',
        justifyContent: 'center',
    },
    innerCircle: {
        width: 14,
        height: 14,
        borderRadius: 7,
        zIndex: 2,
        elevation: 10,
    },
    pulseRing: {
        position: 'absolute',
        width: 60,
        height: 60,
        borderRadius: 30,
        borderWidth: 2,
    },
    label: {
        fontSize: 10,
        letterSpacing: 4,
        color: 'rgba(255, 255, 255, 0.4)',
        fontWeight: '500',
        textTransform: 'uppercase',
    },
});
