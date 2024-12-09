import {Tabs} from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function TabLayout() {
    return (
        <Tabs
            screenOptions={{
                tabBarActiveTintColor: '#FFD60A',
            }}
        >
            <Tabs.Screen
                name="program"
                options={{
                    title: 'Program',
                    tabBarIcon: ({color, focused}) => (
                        <Ionicons name={focused ? 'barbell' : 'barbell-outline'} color={color}
                                  size={24}/>
                    ),
                }}
            />
            <Tabs.Screen
                name="nutrition"
                options={{
                    title: 'Nutrition',
                    tabBarIcon: ({color, focused}) => (
                        <Ionicons name={focused ? 'nutrition' : 'nutrition-outline'} color={color} size={24}/>
                    ),
                }}
            />
            <Tabs.Screen
                name="profile"
                options={{
                    title: 'Profile',
                    tabBarIcon: ({color, focused}) => (
                        <Ionicons name={focused ? 'person' : 'person-outline'} color={color} size={24}/>
                    ),
                }}
            />
        </Tabs>
    );
}
