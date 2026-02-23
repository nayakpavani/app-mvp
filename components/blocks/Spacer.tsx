import { View } from 'react-native';

export const Spacer = ({ block }: { block: any }) => (
    <View style={{ height: block.height || 20 }} />
);
