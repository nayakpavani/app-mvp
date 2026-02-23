import { setScreenValue } from '@/store/screenSlice';
import Slider from '@react-native-community/slider';
import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useDispatch } from 'react-redux';

export const BaselineSlider = ({ block }: { block: any }) => {
    const dispatch = useDispatch();
    const [value, setValue] = useState(block.value || 5);

    const handleValueChange = (val: number) => {
        const rounded = Math.round(val);
        setValue(rounded);
        dispatch(setScreenValue({ key: block.id || block.label, value: rounded }));
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.label}>{block.label}</Text>
            </View>

            <View style={styles.trackWrap}>
                <Text style={styles.hint}>Low</Text>
                <Slider
                    style={styles.slider}
                    minimumValue={1}
                    maximumValue={10}
                    value={value}
                    onValueChange={handleValueChange}
                    minimumTrackTintColor="#FACC15"
                    maximumTrackTintColor="rgba(255, 255, 255, 0.1)"
                    thumbTintColor="#FACC15"
                />
                <Text style={styles.hint}>High</Text>
            </View>

            <Text style={styles.currentValue}>Current: {value} / 10</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginBottom: 40,
        width: '100%',
    },
    header: {
        marginBottom: 16,
    },
    label: {
        fontSize: 20,
        color: '#FFFFFF',
        fontWeight: '300',
        fontFamily: 'System',
    },
    trackWrap: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        marginBottom: 12,
    },
    slider: {
        flex: 1,
        height: 40,
    },
    hint: {
        fontSize: 12,
        color: 'rgba(255, 255, 255, 0.4)',
        textTransform: 'uppercase',
        letterSpacing: 1,
    },
    currentValue: {
        textAlign: 'center',
        fontSize: 14,
        color: '#FACC15',
        letterSpacing: 0.5,
        fontWeight: '600',
    },
});
