import {
    FontAwesome5,
    Ionicons,
    MaterialCommunityIcons
} from '@expo/vector-icons';

interface DynamicIconProps {
    name: string;
    size?: number;
    color?: string;
    style?: any;
}

export const DynamicIcon = ({ name, size = 24, color = '#FFFFFF', style }: DynamicIconProps) => {
    if (!name) return null;

    // Handle FontAwesome 5 style strings: "fas fa-leaf", "far fa-eye", "fa-leaf"
    if (name.startsWith('fas fa-') || name.startsWith('fa-') || name.startsWith('far fa-')) {
        const isRegular = name.startsWith('far fa-');
        const iconName = name.replace('fas fa-', '').replace('fa-', '').replace('far fa-', '');
        return <FontAwesome5 name={iconName} size={size} color={color} style={style} solid={!isRegular} />;
    }

    // Handle Material Community Icons style: "mdi-account"
    if (name.startsWith('mdi-')) {
        const iconName = name.replace('mdi-', '');
        return <MaterialCommunityIcons name={iconName as any} size={size} color={color} style={style} />;
    }

    // Handle Ionicons: "io-heart" or "heart-outline"
    if (name.startsWith('io-')) {
        const iconName = name.replace('io-', '');
        return <Ionicons name={iconName as any} size={size} color={color} style={style} />;
    }

    // Default to FontAwesome5 for anything else, or try to guess
    // Some manifest items might just have "leaf" or "hand-holding"
    return <FontAwesome5 name={name} size={size} color={color} style={style} />;
};
