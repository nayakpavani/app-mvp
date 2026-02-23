import { RootState } from '@/store';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useSelector } from 'react-redux';

// Use relative paths to ensure maximum compatibility with the current bundler config
import { ChipList } from './ChipList';
import { ChoiceCard } from './ChoiceCard';
import { ChoiceGrid } from './ChoiceGrid';
import { Headline } from './Headline';
import { LotusLogo } from './LotusLogo';
import { MicroLabel } from './MicroLabel';
import { PrimaryButton } from './PrimaryButton';
import { Spacer } from './Spacer';
import { Subtext } from './Subtext';

const BlockMap: Record<string, React.FC<any>> = {
    headline: Headline,
    subtext: Subtext,
    instruction_text: Subtext,
    micro_label: MicroLabel,
    primary_button: PrimaryButton,
    choice_card: ChoiceCard,
    chip_list: ChipList,
    choice_grid: ChoiceGrid,
    spacer: Spacer,
    lotus_logo: LotusLogo,
};

const UnknownBlock = ({ type }: { type: string }) => (
    <View style={styles.unknown}>
        <Text style={styles.unknownText}>Unknown block: {type}</Text>
    </View>
);

export const BlockRenderer = ({ block }: { block: any }) => {
    const screenData = useSelector((state: RootState) => state.screen.data);

    if (!block) return null;

    // 1. Interpolate string values ({{key}} -> data[key])
    const interpolatedBlock = JSON.parse(
        JSON.stringify(block).replace(/\{\{(.*?)\}\}/g, (match, p1) => {
            const keys = p1.trim().split('.');
            let v: any = screenData;
            for (const k of keys) {
                v = v?.[k];
            }
            return v !== undefined && v !== null ? v : match;
        })
    );

    const Component = BlockMap[interpolatedBlock.type];

    if (!Component) {
        return <UnknownBlock type={interpolatedBlock.type} />;
    }

    return <Component block={interpolatedBlock} />;
};

const styles = StyleSheet.create({
    unknown: {
        padding: 12,
        backgroundColor: 'rgba(239, 68, 68, 0.1)',
        borderRadius: 8,
        marginVertical: 8,
        borderWidth: 1,
        borderColor: 'rgba(239, 68, 68, 0.3)',
    },
    unknownText: {
        color: '#EF4444',
        fontSize: 12,
        fontWeight: '600',
    },
});
