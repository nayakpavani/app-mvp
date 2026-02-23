import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import { ParticleField, Rise } from '../blocks/Animations';
import { BlockRenderer } from '../blocks/BlockRenderer';

export const PortalContainer = ({ manifest }: { manifest: any }) => {
    return (
        <View style={styles.container}>
            {/* Background Layer */}
            <LinearGradient
                colors={['#0E1012', '#080A0C']}
                style={StyleSheet.absoluteFill}
            />

            {/* Radial Ambient Glow Approximation */}
            <View style={styles.glowContainer}>
                <LinearGradient
                    colors={['rgba(250, 204, 21, 0.08)', 'transparent']}
                    style={styles.glowCircle}
                />
            </View>

            {/* Dynamic Particle Field */}
            <ParticleField />

            {/* Content Layer */}
            <SafeAreaView style={styles.safe}>
                <View style={styles.content}>
                    {manifest?.blocks?.map((block: any, index: number) => (
                        <Rise key={index} delay={index * 200}>
                            <BlockRenderer block={block} />
                        </Rise>
                    ))}
                </View>
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
    },
    content: {
        flex: 1,
        padding: 24,
        alignItems: 'center',
        justifyContent: 'center',
    },
    glowContainer: {
        ...StyleSheet.absoluteFillObject,
        alignItems: 'center',
        justifyContent: 'center',
    },
    glowCircle: {
        width: 600,
        height: 600,
        borderRadius: 300,
    },
});
