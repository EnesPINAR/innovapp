import { useEffect } from "react";
import { Stack } from 'expo-router';
import { useRouter } from "expo-router";

export default function RootLayout() {
    const router = useRouter();

    useEffect(() => {
        const isLoggedIn = false;
        if (!isLoggedIn) {
            router.replace("/(auth)/login");
        }
    }, []);
    return (
        <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="(auth)/login" />
            <Stack.Screen name="(tabs)" />
        </Stack>
    );
}
