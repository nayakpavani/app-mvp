import { RootState } from '@/store';
import React from 'react';
import { useSelector } from 'react-redux';
import { ChoiceStackContainer, PortalContainer } from './index';

const ContainerMap: Record<string, React.FC<any>> = {
    portal: PortalContainer,
    choice_stack: ChoiceStackContainer,
};

export default function ScreenRenderer() {
    const { currentContainer, currentManifest } = useSelector((state: RootState) => state.screen);

    const ContainerComponent = ContainerMap[currentContainer];

    if (!ContainerComponent) {
        console.warn(`Container ${currentContainer} not found in map.`);
        return null;
    }

    return <ContainerComponent manifest={currentManifest} />;
}
