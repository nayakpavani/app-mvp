import { RootState } from '@/store';
import React from 'react';
import { useSelector } from 'react-redux';
import {
    ChoiceStackContainer,
    CompanionDashboardContainer,
    ComposerContainer,
    LockRitualOverlay,
    PortalContainer,
    PracticeRunnerContainer,
    StableScanContainer
} from './index';

const getContainerMap = (): Record<string, React.FC<any>> => ({
    portal: PortalContainer,
    choice_stack: ChoiceStackContainer,
    composer: ComposerContainer,
    stable_scan: StableScanContainer,
    practice_runner: PracticeRunnerContainer,
    insights_progress: CompanionDashboardContainer,
    companion_dashboard: CompanionDashboardContainer,
    lock_ritual_overlay: LockRitualOverlay,
    routine_builder: ComposerContainer,
    routine_locked: ComposerContainer,
    embodiment_challenge_runner: ComposerContainer,
    awareness_trigger: ComposerContainer,
    cycle_transitions: ComposerContainer,
    daily_insight: ComposerContainer,
    cycle_complete_overview: ComposerContainer,
});

export default function ScreenRenderer() {
    const { currentContainer, currentManifest } = useSelector((state: RootState) => state.screen);

    const ContainerMap = getContainerMap();
    const ContainerComponent = ContainerMap[currentContainer];

    if (!ContainerComponent) {
        console.warn(`Container ${currentContainer} not found in map.`);
        return null;
    }

    return <ContainerComponent manifest={currentManifest} />;
}
