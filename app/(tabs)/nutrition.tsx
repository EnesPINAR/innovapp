import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';

export default function Nutrition() {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>x Kcal Diyet</Text>
            <View>
                <TouchableOpacity style={styles.exerciseRow}>
                    <Text style={styles.exerciseName}>Food Item</Text>
                    <View style={styles.rightContent}>
                        <Text style={styles.setText}>x ad./gr.</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        paddingHorizontal: 16,
        marginBottom: 16,
        marginTop: 20,
        color: '#000',
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
        color: '#000',
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
