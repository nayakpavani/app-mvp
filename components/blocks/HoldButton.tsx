import { navigate } from '@/store/screenSlice';
import React, { useRef, useState } from 'react';
import { Animated, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useDispatch } from 'react-redux';

export const HoldButton = ({ block }: { block: any }) => {
    const dispatch = useDispatch();
    const [isHolding, setIsHolding] = useState(false);
    const progress = useRef(new Animated.Value(0)).current;

    const startHold = () => {
        setIsHolding(true);
        Animated.timing(progress, {
            toValue: 1,
            duration: 2000, // 2 seconds hold
            useNativeDriver: false,
        }).start(({ finished }) => {
            if (finished) {
                const action = block.on_complete || block.action;
                if (action) {
                    if (action.type === 'navigate' && action.target) {
                        dispatch(navigate(action.target));
                    } else if (action.type === 'generate_companion') {
                        // For now, simulate generate_companion by navigating to analysis
                        dispatch(navigate({
                            container_id: 'cycle_transitions',
                            state_id: 'companion_analysis'
                        }));
                    }
                }
            }
        });
    };

    const stopHold = () => {
        setIsHolding(false);
        Animated.timing(progress, {
            toValue: 0,
            duration: 200,
            useNativeDriver: false,
        }).start();
    };

    const progressWidth = progress.interpolate({
        inputRange: [0, 1],
        outputRange: ['0%', '100%'],
    });

    const buttonLabel = block.label === 'Hold' ? 'Hold to Commit' : (block.label || 'Hold to Lock');

    return (
        <View style={styles.container}>
            <TouchableOpacity
                style={styles.buttonWrap}
                onPressIn={startHold}
                onPressOut={stopHold}
                activeOpacity={1}
            >
                <Animated.View style={[styles.progressBar, { width: progressWidth }]} />
                <Text style={styles.buttonText}>
                    {isHolding ? 'Committing...' : buttonLabel}
                </Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        alignItems: 'center',
        marginVertical: 20,
    },
    buttonWrap: {
        width: 250,
        height: 60,
        borderRadius: 30,
        overflow: 'hidden',
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.2)',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
    },
    progressBar: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        backgroundColor: '#FACC15',
        opacity: 0.3,
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: '600',
        zIndex: 2,
    },
});
