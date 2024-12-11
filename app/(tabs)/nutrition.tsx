import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import api from '../../lib/axios';
import LoadingSpinner from '@/components/LoadingSpinner';

interface Meal {
    id: number;
    name: string;
    amount: number;
    unit: string;
    protein: number;
    carbs: number;
    oil: number;
    calories: number;
}

interface Diet {
    id: number;
    name: string;
    meals: Meal[];
    total_calories: number;
    total_protein: number;
    total_carbs: number;
    total_oil: number;
}

interface User {
    active: boolean;
}

export default function Nutrition() {
    const [diet, setDiet] = useState<Diet[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [isActive, setIsActive] = useState<boolean>(false);

    useEffect(() => {
        const fetchUserAndDiet = async () => {
            try {
                setIsLoading(true);
                const userResponse = await api.get<User[]>('/api/users/');
                const isUserActive = userResponse.data[0].active;
                setIsActive(isUserActive);

                if (isUserActive) {
                    const dietResponse = await api.get<Diet[]>('/api/diets/');
                    setDiet(dietResponse.data);
                }
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Bir hata oluştu');
                console.error('Error:', err);
            } finally {
                setIsLoading(false);
            }
        };

        fetchUserAndDiet();
    }, []);

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

    return (
        <View style={styles.container}>
            {diet.length > 0 && (
                <>
                    <Text style={styles.title}>{diet[0].name}</Text>
                    
                    <View style={styles.infoBox}>
                    {diet[0].meals.map((meal) => (
                        <View key={meal.id} style={styles.infoRow}>
                            <Text style={styles.label}>{meal.name}</Text>
                            <Text style={styles.textPassive}>{meal.amount} {meal.unit}</Text>
                        </View>
                    ))}
                    </View>

                    <Text style={styles.title}>Toplam Makrolar:</Text>
                    <View style={styles.infoBox}>
                        <View style={styles.infoRow}>
                            <Text style={styles.label}>Kalori</Text>
                            <Text style={styles.textPassive}>{diet[0].total_calories} kcal</Text>
                        </View>
                        <View style={styles.infoRow}>
                            <Text style={styles.label}>Protein</Text>
                            <Text style={styles.textPassive}>{diet[0].total_protein}g</Text>
                        </View>
                        <View style={styles.infoRow}>
                            <Text style={styles.label}>Karbonhidrat</Text>
                            <Text style={styles.textPassive}>{diet[0].total_carbs}g</Text>
                        </View>
                        <View style={styles.infoRow}>
                            <Text style={styles.label}>Yağ</Text>
                            <Text style={styles.textPassive}>{diet[0].total_oil}g</Text>
                        </View>
                    </View>
                </>
            )}
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
    },
    mealRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 16,
        paddingHorizontal: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    mealName: {
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
    textPassive: {
        fontSize: 16,
        color: '#7B7B7B',
    },
});
