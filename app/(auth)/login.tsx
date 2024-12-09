import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { useRouter } from "expo-router";

export default function LoginScreen() {
    const router = useRouter();
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = () => {
        const phoneRegex = /^[0-9]{10,15}$/; // 10-15 haneli telefon numarası kontrolü
        if (phone === "" || password === "") {
            Alert.alert("Hata", "Lütfen tüm alanları doldurun.");
            return;
        }
        if (!phoneRegex.test(phone)) {
            Alert.alert("Hata", "Lütfen geçerli bir telefon numarası girin.");
            return;
        }
        Alert.alert("Başarılı", `Hoş geldiniz, ${phone}!`);
        router.replace("/(tabs)");
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Telefon ile Giriş Yap</Text>
            <TextInput
                style={styles.input}
                placeholder="Telefon Numarası"
                placeholderTextColor="#aaa"
                value={phone}
                onChangeText={setPhone}
                keyboardType="phone-pad"
                maxLength={15} // Maksimum karakter sayısı
            />
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
        backgroundColor: "#007BFF",
        borderRadius: 8,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 10,
    },
    buttonText: {
        color: "#fff",
        fontSize: 18,
        fontWeight: "bold",
    },
});
