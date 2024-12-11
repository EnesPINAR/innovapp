import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, TextInput, TouchableWithoutFeedback, Keyboard, TouchableOpacity, Alert } from 'react-native';
import api from '../../lib/axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import LoadingSpinner from '../../components/LoadingSpinner';
import { router } from 'expo-router';

export default function Profile() {
    const [height, setHeight] = useState('');
    const [weight, setWeight] = useState('');
    const [userData, setUserData] = useState({
        name: '',
        age: '',
        blood_type: '',
        membership_days: '',
    });
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetchUserData();
    }, []);

    const fetchUserData = async () => {
        try {
            setIsLoading(true);

            const response = await api.get('/api/users/');
            const data = response.data[0];
            setHeight(data.height?.toString() || '');
            setWeight(data.weight?.toString() || '');
            setUserData({
                name: `${data.first_name} ${data.last_name}`,
                age: data.age?.toString() || '',
                blood_type: data.blood_type || '',
                membership_days: data.remaining_days?.toString() || '',
            });
        } catch (error) {
            console.error('Error fetching user data:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleUpdate = async () => {
        try {
            const token = await AsyncStorage.getItem('userToken');
            const response = await api.get('/api/users/', {
                headers: { 'Authorization': `Token ${token}` }
            });
            const userId = response.data[0].id;
            
            await api.patch(`/api/users/${userId}/`, {
                height: parseInt(height),
                weight: parseInt(weight),
            }, {
                headers: { 'Authorization': `Token ${token}` }
            });
            
            await fetchUserData();
            Alert.alert('Başarılı', 'Profil güncellendi');
        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.error('Full error:', error.response?.data);
                console.error('Status:', error.response?.status);
                console.error('Headers:', error.response?.headers);
            }
            Alert.alert('Hata', 'Profil güncellenirken bir hata oluştu');
        }
    };

    const handleLogout = async () => {
        try {
            const token = await AsyncStorage.getItem('userToken');
            await api.post('/api/logout/', {}, {
                headers: { 'Authorization': `Token ${token}` }
            });
            
            await AsyncStorage.removeItem('userToken');
            router.replace('/(auth)/login');
            
        } catch (error) {
            console.error('Logout failed:', error);
        }
    };

    if (isLoading) {
        return <LoadingSpinner />;
    }

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.container}>
                <Text style={styles.name}>{userData.name}</Text>
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
                        <Text style={styles.textPassive}>{userData.age}</Text>
                    </View>
                    <View style={styles.infoRow}>
                        <Text style={styles.label}>Kan Grubu</Text>
                        <Text style={styles.textPassive}>{userData.blood_type}</Text>
                    </View>
                    <View style={[styles.infoRow, styles.lastRow]}>
                        <Text style={styles.label}>Kalan Üyelik Süresi</Text>
                        <Text style={styles.textPassive}>
                            {parseInt(userData.membership_days) < 0 
                                ? `${Math.abs(parseInt(userData.membership_days))} gün önce bitti`
                                : `${userData.membership_days} Gün`}
                        </Text>
                    </View>
                </View>
                <TouchableOpacity style={styles.button} onPress={handleUpdate}>
                    <Text style={styles.buttonText}>Güncelle</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
                    <Text style={styles.logoutButtonText}>Çıkış Yap</Text>
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
    logoutButton: {
        height: 50,
        backgroundColor: "#FF0000",
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
    logoutButtonText: {
        color: "#fff",
        fontSize: 18,
    },
});
