import { RootState } from '@/store';
import { navigate } from '@/store/screenSlice';
import { useEffect, useMemo, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Animated, {
    Easing,
    useAnimatedProps,
    useSharedValue,
    withTiming
} from 'react-native-reanimated';
import Svg, { Circle } from 'react-native-svg';
import { useDispatch, useSelector } from 'react-redux';

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

export const TimerDisplay = ({ block }: { block: any }) => {
    const dispatch = useDispatch();
    const screenData = useSelector((state: RootState) => state.screen.data);
    const currentScreen = useSelector((state: RootState) => state.screen.currentManifest);

    const rawDuration = screenData[block.duration_key] || 300;

    const initialSeconds = useMemo(() => {
        if (typeof rawDuration === 'number') return rawDuration;
        const minutes = parseInt(String(rawDuration));
        return isNaN(minutes) ? 300 : minutes * 60;
    }, [rawDuration]);

    const [timeLeft, setTimeLeft] = useState(initialSeconds);
    const progress = useSharedValue(1);

    useEffect(() => {
        let timer: NodeJS.Timeout;

        // Start progress animation
        progress.value = withTiming(0, {
            duration: initialSeconds * 1000,
            easing: Easing.linear
        });

        timer = setInterval(() => {
            setTimeLeft((prev) => {
                if (prev <= 1) {
                    clearInterval(timer);
                    // Handle completion
                    if (currentScreen?.on_complete) {
                        dispatch(navigate(currentScreen.on_complete.target));
                    } else if (block.on_complete) {
                        dispatch(navigate(block.on_complete.target));
                    }
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [initialSeconds]);

    const displayTime = () => {
        const m = Math.floor(timeLeft / 60);
        const s = timeLeft % 60;
        return `${m}:${s.toString().padStart(2, '0')}`;
    };

    const animatedProps = useAnimatedProps(() => {
        const strokeDashoffset = 301.59 * (1 - progress.value);
        return {
            strokeDashoffset,
        };
    });

    return (
        <View style={styles.container}>
            <View style={styles.timerCircle}>
                <Svg width="240" height="240" viewBox="0 0 100 100">
                    <Circle
                        cx="50"
                        cy="50"
                        r="48"
                        stroke="rgba(255, 255, 255, 0.1)"
                        strokeWidth="2"
                        fill="none"
                    />
                    <AnimatedCircle
                        cx="50"
                        cy="50"
                        r="48"
                        stroke="#FACC15"
                        strokeWidth="2"
                        fill="none"
                        strokeDasharray="301.59"
                        animatedProps={animatedProps}
                        strokeLinecap="round"
                        transform="rotate(-90 50 50)"
                    />
                </Svg>
                <View style={styles.textContainer}>
                    <Text style={styles.timeText}>{displayTime()}</Text>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 40,
    },
    timerCircle: {
        width: 240,
        height: 240,
        alignItems: 'center',
        justifyContent: 'center',
    },
    textContainer: {
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center',
    },
    timeText: {
        fontSize: 64,
        fontWeight: '200',
        color: '#FFFFFF',
        letterSpacing: -2,
        fontFamily: 'System',
    },
});
