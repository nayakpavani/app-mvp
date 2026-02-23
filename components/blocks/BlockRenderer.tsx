import { RootState } from '@/store';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useSelector } from 'react-redux';

// Use relative paths to ensure maximum compatibility with the current bundler config
import { BaselineSlider } from './BaselineSlider';
import { BreathAnimation } from './BreathAnimation';
import { ChipList } from './ChipList';
import { ChoiceCard } from './ChoiceCard';
import { ChoiceGrid } from './ChoiceGrid';
import { GraphBlock } from './GraphBlock';
import { Headline } from './Headline';
import { HelperText } from './HelperText';
import { HoldButton } from './HoldButton';
import { IdentityIndicator } from './IdentityIndicator';
import { InsightBox } from './InsightBox';
import { LotusLogo } from './LotusLogo';
import { MantraDisplay } from './MantraDisplay';
import { MicroLabel } from './MicroLabel';
import { OptionPicker } from './OptionPicker';
import { PracticeCard } from './PracticeCard';
import { PrimaryButton } from './PrimaryButton';
import { RepCounter } from './RepCounter';
import { SankalpDisplay } from './SankalpDisplay';
import { Spacer } from './Spacer';
import { Subtext } from './Subtext';
import { SummaryBlock } from './SummaryBlock';
import { TextArea } from './TextArea';
import { TimerDisplay } from './TimerDisplay';

const getBlockMap = () => ({
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
    option_picker: OptionPicker,
    textarea: TextArea,
    breath_animation: BreathAnimation,
    timer_display: TimerDisplay,
    rep_counter: RepCounter,
    identity_indicator: IdentityIndicator,
    mantra_display: MantraDisplay,
    sankalp_display: SankalpDisplay,
    graph_block: GraphBlock,
    practice_card: PracticeCard,
    baseline_slider: BaselineSlider,
    summary_block: SummaryBlock,
    insight_box: InsightBox,
    hold_button: HoldButton,
    helper_text: HelperText,
});

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

    const BlockMap = getBlockMap() as Record<string, React.FC<any>>;
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
