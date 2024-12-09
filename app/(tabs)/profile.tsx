import React, { useState } from 'react';
import { Text, View, StyleSheet, TextInput, TouchableWithoutFeedback, Keyboard, TouchableOpacity } from 'react-native';

export default function Profile() {
    const [height, setHeight] = useState('174');
    const [weight, setWeight] = useState('74');

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.container}>
                <Text style={styles.name}>İsim SOYİSİM</Text>
                <View style={styles.infoBox}>
                    <View style={styles.infoRow}>
                        <Text style={styles.label}>Boy</Text>
                        <TextInput
                            style={styles.input}
                            value={height}
                            onChangeText={setHeight}
                            keyboardType="numeric"
                        />
                    </View>
                    <View style={styles.infoRow}>
                        <Text style={styles.label}>Kilo</Text>
                        <TextInput
                            style={styles.input}
                            value={weight}
                            onChangeText={setWeight}
                            keyboardType="numeric"
                        />
                    </View>
                    <View style={styles.infoRow}>
                        <Text style={styles.label}>Yaş</Text>
                        <Text style={styles.textPassive}>21</Text>
                    </View>
                    <View style={styles.infoRow}>
                        <Text style={styles.label}>Kan Grubu</Text>
                        <Text style={styles.textPassive}>A RH+</Text>
                    </View>
                    <View style={[styles.infoRow, styles.lastRow]}>
                        <Text style={styles.label}>Kalan Üyelik Süresi</Text>
                        <Text style={styles.textPassive}>9 Gün</Text>
                    </View>
                </View>
                <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonText}>Güncelle</Text>
                </TouchableOpacity>
            </View>
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    name: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
        marginTop: 20,
        paddingHorizontal: 16,
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
    input: {
        fontSize: 16,
        color: '#333',
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        width: 60,
        textAlign: 'right',
    },
    button: {
        height: 50,
        backgroundColor: "#FFD60A",
        borderRadius: 8,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 10,
        marginHorizontal: 16,
    },
    buttonText: {
        color: "#000",
        fontSize: 18,
    },
});
