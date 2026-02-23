import { RootState } from '@/store';
import { navigate } from '@/store/screenSlice';
import { LinearGradient } from 'expo-linear-gradient';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { DynamicIcon } from './DynamicIcon';

export const PracticeCard = ({ block }: { block: any }) => {
    const dispatch = useDispatch();
    const screenData = useSelector((state: RootState) => state.screen.data as any);

    const isCompleted = block.id ? !!screenData[block.id] : false;

    const handleAction = () => {
        if (isCompleted) return;
        if (block.action) {
            dispatch(navigate(block.action.target));
        }
    };

    const handleInfo = () => {
        if (block.info_action) {
            dispatch(navigate(block.info_action.target));
        }
    };

    const title = block.id ? (screenData[block.id + '_title'] || block.title) : block.title;
    const description = block.id ? (screenData[block.id + '_description'] || block.description) : block.description;
    const meta = block.id ? (screenData[block.id + '_meta'] || block.meta) : block.meta;

    return (
        <TouchableOpacity
            style={[styles.card, isCompleted && styles.completedCard]}
            onPress={handleAction}
            activeOpacity={isCompleted ? 1 : 0.8}
        >
            <View style={[styles.accentLine, isCompleted && styles.completedAccentLine]} />

            <View style={styles.content}>
                <View style={styles.iconSection}>
                    <DynamicIcon
                        name={isCompleted ? "fas fa-lock" : (block.icon || "fas fa-leaf")}
                        size={24}
                        color={isCompleted ? "#10B981" : "#FACC15"}
                    />
                </View>

                <View style={styles.textSection}>
                    {block.purpose && <Text style={styles.purposeTag}>{block.purpose}</Text>}
                    <View style={styles.titleRow}>
                        <Text style={styles.title}>{title}</Text>
                        {block.info_action && (
                            <TouchableOpacity onPress={handleInfo}>
                                <DynamicIcon name="fas fa-info-circle" size={18} color="rgba(255,255,255,0.4)" />
                            </TouchableOpacity>
                        )}
                    </View>
                    <Text style={styles.description}>{description}</Text>
                    {meta && <Text style={styles.meta}>{meta}</Text>}
                </View>
            </View>

            {!isCompleted ? (
                <LinearGradient
                    colors={['#FACC15', '#EAB308']}
                    style={styles.actionBtn}
                >
                    <Text style={styles.actionBtnText}>{block.action_label || "START →"}</Text>
                </LinearGradient>
            ) : (
                <View style={styles.completedBadge}>
                    <DynamicIcon name="fas fa-lock" size={10} color="#10B981" style={{ marginRight: 4 }} />
                    <Text style={styles.completedBadgeText}>LOCKED</Text>
                </View>
            )}
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
        borderRadius: 16,
        padding: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        position: 'relative',
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.05)',
        marginBottom: 12,
    },
    completedCard: {
        opacity: 0.6,
    },
    accentLine: {
        position: 'absolute',
        left: 0,
        top: 0,
        bottom: 0,
        width: 4,
        backgroundColor: '#FACC15',
    },
    completedAccentLine: {
        backgroundColor: '#10B981',
    },
    content: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
        gap: 16,
    },
    iconSection: {
        width: 48,
        height: 48,
        borderRadius: 12,
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
        alignItems: 'center',
        justifyContent: 'center',
    },
    textSection: {
        flex: 1,
        justifyContent: 'center',
    },
    purposeTag: {
        fontSize: 9,
        letterSpacing: 1.5,
        color: '#FACC15',
        fontWeight: '700',
        textTransform: 'uppercase',
        marginBottom: 2,
    },
    titleRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
    },
    title: {
        fontSize: 18,
        color: '#FFFFFF',
        fontWeight: '600',
    },
    description: {
        fontSize: 13,
        color: 'rgba(255, 255, 255, 0.5)',
        fontStyle: 'italic',
        marginTop: 2,
    },
    meta: {
        fontSize: 10,
        color: 'rgba(255, 255, 255, 0.3)',
        marginTop: 4,
        letterSpacing: 0.5,
    },
    actionBtn: {
        paddingVertical: 10,
        paddingHorizontal: 16,
        borderRadius: 30,
        marginLeft: 12,
    },
    actionBtnText: {
        color: '#111827',
        fontSize: 11,
        fontWeight: '800',
        letterSpacing: 1,
    },
    completedBadge: {
        backgroundColor: 'rgba(16, 185, 129, 0.1)',
        paddingVertical: 6,
        paddingHorizontal: 12,
        borderRadius: 20,
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'rgba(16, 185, 129, 0.2)',
        marginLeft: 12,
    },
    completedBadgeText: {
        color: '#10B981',
        fontSize: 10,
        fontWeight: '700',
        letterSpacing: 1,
    },
});
