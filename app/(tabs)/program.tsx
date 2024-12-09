import React, { useState, useRef } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import Collapsible from 'react-native-collapsible';
import YoutubeIframe from 'react-native-youtube-iframe';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function Program() {
    const [activeSections, setActiveSections] = useState<number[]>([]);
    const rotateAnim = useRef(new Animated.Value(0)).current;

    const toggleSection = (section: number) => {
        const isActive = activeSections.includes(section);
        Animated.timing(rotateAnim, {
            toValue: isActive ? 0 : 1,
            duration: 300,
            useNativeDriver: true,
        }).start();

        setActiveSections((prevSections) =>
            isActive
                ? prevSections.filter((s) => s !== section)
                : [...prevSections, section]
        );
    };

    const rotate = rotateAnim.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '180deg'],
    });

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Push Pull Legs</Text>
            <View>
                <TouchableOpacity onPress={() => toggleSection(0)} style={styles.exerciseRow}>
                    <Text style={styles.exerciseName}>Exercise Name</Text>
                    <View style={styles.rightContent}>
                        <Text style={styles.setText}>12 x 4</Text>
                        <Animated.View style={{ transform: [{ rotate }] }}>
                            <Ionicons 
                                name="chevron-down" 
                                size={24} 
                                color="#666" 
                            />
                        </Animated.View>
                    </View>
                </TouchableOpacity>
                <Collapsible collapsed={!activeSections.includes(0)}>
                    <View style={styles.collapsibleContent}>
                        <YoutubeIframe
                            height={200}
                            play={false}
                            videoId={'EdDqD4aKwxM'} // Replace with your video ID
                        />
                    </View>
                </Collapsible>
            </View>
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
});
