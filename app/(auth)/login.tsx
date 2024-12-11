import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Platform } from "react-native";
import { useRouter } from "expo-router";
import api from '../../lib/axios';
import CountryPicker, { Country, CountryCode } from 'react-native-country-picker-modal';
import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function LoginScreen() {
    const router = useRouter();
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [countryCode, setCountryCode] = useState<CountryCode>('TR');
    const [callingCode, setCallingCode] = useState('90');
    const [showPicker, setShowPicker] = useState(false);

    const onSelectCountry = (country: Country) => {
        setCountryCode(country.cca2);
        setCallingCode(country.callingCode[0]);
        setShowPicker(false);
    };

    const handleLogin = async () => {
        // Update phone number validation to match international format
        const phoneRegex = /^[0-9]{10}$/;  // For Turkish numbers without country code
        if (phone === "" || password === "") {
            Alert.alert("Hata", "Lütfen tüm alanları doldurun.");
            return;
        }
        if (!phoneRegex.test(phone)) {
            Alert.alert("Hata", "Lütfen geçerli bir telefon numarası girin.");
            return;
        }

        try {
            const formattedPhone = `+${callingCode}${phone}`;
            
            const response = await api.post('/api/token/', {
                username: formattedPhone,
                password: password
            });

            // Store the token
            if (response.data.token) {
                await AsyncStorage.setItem('userToken', response.data.token);
                
                // Navigate to program screen
                router.replace("/(tabs)/program");
            } else {
                Alert.alert("Hata", "Token alınamadı.");
            }
        } catch (error: any) {
            if (axios.isAxiosError(error)) {
                console.log('Error response:', error.response?.data);
                if (error.response?.status === 400) {
                    Alert.alert("Hata", "Telefon numarası veya şifre hatalı.");
                } else {
                    Alert.alert("Hata", "Bir hata oluştu. Lütfen daha sonra tekrar deneyin.");
                }
            }
            console.error('Login error:', error);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Innova App</Text>
            <Text style={styles.title}>Hoşgeldiniz</Text>
            <View style={styles.phoneContainer}>
                <TouchableOpacity 
                    style={styles.prefixSelector}
                    onPress={() => setShowPicker(true)}
                >
                    <Text style={styles.phonePrefix}>+{callingCode}</Text>
                </TouchableOpacity>
                <CountryPicker
                    visible={showPicker}
                    onClose={() => setShowPicker(false)}
                    onSelect={onSelectCountry}
                    withFilter
                    withFlag
                    withCallingCode
                    countryCode={countryCode}
                />
                <TextInput
                    style={styles.phoneInput}
                    placeholder="5XX XXX XX XX"
                    placeholderTextColor="#aaa"
                    value={phone}
                    onChangeText={(text) => setPhone(text.replace(/[^0-9]/g, ''))}
                    keyboardType="phone-pad"
                    maxLength={10}
                />
            </View>
            <TextInput
                style={styles.input}
                placeholder="Şifre"
                placeholderTextColor="#aaa"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />
            <TouchableOpacity style={styles.button} onPress={handleLogin}>
                <Text style={styles.buttonText}>Giriş Yap</Text>
            </TouchableOpacity>
            <Text style={styles.passiveText}>Kayıt için kasaya başvurabilirsiniz.</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f5f5f5",
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 30,
        color: "#333",
    },
    input: {
        width: "100%",
        height: 50,
        backgroundColor: "#fff",
        borderRadius: 8,
        paddingHorizontal: 15,
        marginBottom: 15,
        borderWidth: 1,
        borderColor: "#ddd",
    },
    button: {
        width: "100%",
        height: 50,
        backgroundColor: "#FFD60A",
        borderRadius: 8,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 10,
    },
    buttonText: {
        color: "#000",
        fontSize: 18,
        fontWeight: "bold",
    },
    passiveText: {
        color: "#7B7B7B",
        fontSize: 18,
        marginTop: 20,
    },
    phoneContainer: {
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#fff",
        borderRadius: 8,
        marginBottom: 15,
        borderWidth: 1,
        borderColor: "#ddd",
    },
    phonePrefix: {
        paddingLeft: 15,
        paddingRight: 5,
        color: "#000",
        fontSize: 16,
    },
    phoneInput: {
        flex: 1,
        height: 50,
        paddingHorizontal: 5,
    },
    prefixSelector: {
        paddingHorizontal: 0,
        paddingVertical: 0,
        borderRightWidth: 1,
        borderRightColor: '#ddd',
    },
});