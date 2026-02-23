import { RootState } from '@/store';
import { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, {
    Easing,
    useAnimatedStyle,
    useSharedValue,
    withRepeat,
    withTiming
} from 'react-native-reanimated';
import { useSelector } from 'react-redux';

export const MantraDisplay = ({ block }: { block: any }) => {
    const mantraText = useSelector((state: RootState) => state.screen.data[block.text_key]) || 'OM';

    const scale = useSharedValue(1);
    const opacity = useSharedValue(0.8);

    useEffect(() => {
        scale.value = withRepeat(
            withTiming(1.05, { duration: 1500, easing: Easing.inOut(Easing.ease) }),
            -1,
            true
        );
        opacity.value = withRepeat(
            withTiming(1, { duration: 1500, easing: Easing.inOut(Easing.ease) }),
            -1,
            true
        );
    }, []);

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [{ scale: scale.value }],
        opacity: opacity.value,
    }));

    return (
        <View style={styles.container}>
            <Animated.Text style={[styles.text, animatedStyle]}>
                {mantraText}
            </Animated.Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingVertical: 40,
        alignItems: 'center',
        width: '100%',
    },
    text: {
        fontSize: 42,
        color: '#FFFFFF',
        letterSpacing: 4,
        fontWeight: '300',
        textTransform: 'uppercase',
        textAlign: 'center',
        // Text shadow for glow effect
        textShadowColor: 'rgba(250, 204, 21, 0.5)',
        textShadowOffset: { width: 0, height: 0 },
        textShadowRadius: 20,
    },
});
