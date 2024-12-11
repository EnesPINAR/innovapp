import React, { useState, useRef, useEffect } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import Collapsible from 'react-native-collapsible';
import YoutubeIframe from 'react-native-youtube-iframe';
import Ionicons from '@expo/vector-icons/Ionicons';
import api from '../../lib/axios';
import LoadingSpinner from '../../components/LoadingSpinner';

interface Movement {
  id: number;
  name: string;
  video: string;
  sets: number;
  reps: number;
}

interface Program {
  id: number;
  name: string;
  movements: Movement[];
}

interface User {
  active: boolean;
}

export default function Program() {
    const [activeSections, setActiveSections] = useState<number[]>([]);
    const [program, setProgram] = useState<Program[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [rotateAnims, setRotateAnims] = useState<Animated.Value[]>([]);
    const [isActive, setIsActive] = useState<boolean>(false);

    useEffect(() => {
        const fetchUserAndProgram = async () => {
            try {
                setIsLoading(true);
                setError(null);
                
                const userResponse = await api.get<User[]>('/api/users/');
                const isUserActive = userResponse.data[0].active;
                setIsActive(isUserActive);

                if (isUserActive) {
                    const programResponse = await api.get<Program[]>('/api/programs/');
                    setProgram(programResponse.data);
                }
                
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Bir hata oluştu');
                console.error('Error:', err);
            } finally {
                setIsLoading(false);
            }
        };

        fetchUserAndProgram();
    }, []);

    useEffect(() => {
        if (program && program[0]?.movements) {
            setRotateAnims(program[0].movements.map(() => new Animated.Value(0)));
        }
    }, [program]);

    const toggleSection = (index: number) => {
        const isActive = activeSections.includes(index);
        Animated.timing(rotateAnims[index], {
            toValue: isActive ? 0 : 1,
            duration: 300,
            useNativeDriver: true,
        }).start();

        setActiveSections((prevSections) =>
            isActive
                ? prevSections.filter((s) => s !== index)
                : [...prevSections, index]
        );
    };

    if (!isActive) {
        return (
            <View style={styles.container}>
                <View style={[styles.infoBox, { marginTop: 20 }]}>
                    <View style={styles.infoRow}>
                        <Text style={styles.textPassive}>Görüntülemek için üyeliğinizi yenileyiniz.</Text>
                    </View>
                </View>
            </View>
        );
    }

    if (isLoading) {
        return <LoadingSpinner />;
    }

    if (error) {
        return (
            <View style={styles.container}>
                <Text>Hata: {error}</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            {program && program.length > 0 ? (
                <>
                    <Text style={styles.title}>{program[0].name}</Text>
                    {program[0].movements.map((movement, index) => (
                        <View key={movement.id}>
                            <TouchableOpacity onPress={() => toggleSection(index)} style={styles.exerciseRow}>
                                <Text style={styles.exerciseName}>{movement.name}</Text>
                                <View style={styles.rightContent}>
                                    <Text style={styles.setText}>{movement.reps} x {movement.sets}</Text>
                                    <Animated.View style={{ transform: [{ 
                                        rotate: rotateAnims[index]?.interpolate({
                                            inputRange: [0, 1],
                                            outputRange: ['0deg', '180deg']
                                        }) || '0deg'
                                    }] }}>
                                        <Ionicons name="chevron-down" size={24} color="#666" />
                                    </Animated.View>
                                </View>
                            </TouchableOpacity>
                            <Collapsible collapsed={!activeSections.includes(index)}>
                                <View style={styles.collapsibleContent}>
                                    <YoutubeIframe
                                        height={200}
                                        play={false}
                                        videoId={movement.video.includes('/shorts/') 
                                            ? movement.video.split('/shorts/')[1]
                                            : movement.video.split('v=')[1]}
                                    />
                                </View>
                            </Collapsible>
                        </View>
                    ))}
                </>
            ) : (
                <Text>Size atanmış bir program bulunmamaktadır.</Text>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    logo: {
        width: '100%',
        height: 50,
        marginVertical: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        paddingHorizontal: 16,
        marginBottom: 16,
        marginTop: 20,
    },
    exerciseRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 16,
        paddingHorizontal: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    exerciseName: {
        fontSize: 16,
    },
    collapsibleContent: {
        paddingHorizontal: 16,
        paddingVertical: 8,
        backgroundColor: '#f9f9f9',
    },
    setText: {
        fontSize: 16,
        color: '#666',
    },
    rightContent: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    infoBox: {
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        marginHorizontal: 16,
    },
    infoRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 12,
        paddingHorizontal: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
    },
    lastRow: {
        borderBottomWidth: 0,
    },
    label: {
        fontSize: 16,
        color: '#333',
    },
    value: {
        fontSize: 16,
        color: '#333',
    },
    textPassive: {
        fontSize: 16,
        color: '#7B7B7B',
    },
});
