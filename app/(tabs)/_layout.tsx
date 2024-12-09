import {Tabs} from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function TabLayout() {
    return (
        <Tabs
            screenOptions={{
                tabBarActiveTintColor: '#ffd33d',
            }}
        >
            <Tabs.Screen
                name="index"
                options={{
                    title: 'Home',
                    tabBarIcon: ({color, focused}) => (
                        <Ionicons name={focused ? 'home-sharp' : 'home-outline'} color={color} size={24}/>
                    ),
                }}
            />
            <Tabs.Screen
                name="program"
                options={{
                    title: 'Program',
                    tabBarIcon: ({color, focused}) => (
                        <Ionicons name={focused ? 'information-circle' : 'information-circle-outline'} color={color}
                                  size={24}/>
                    ),
                }}
            />
            <Tabs.Screen
                name="nutrition"
                options={{
                    title: 'Nutrition',
                    tabBarIcon: ({color, focused}) => (
                        <Ionicons name={focused ? 'information-circle' : 'information-circle-outline'} color={color}
                                  size={24}/>
                    ),
                }}
            />
            <Tabs.Screen
                name="profile"
                options={{
                    title: 'Profile',
                    tabBarIcon: ({color, focused}) => (
                        <Ionicons name={focused ? 'information-circle' : 'information-circle-outline'} color={color}
                                  size={24}/>
                    ),
                }}
            />
        </Tabs>
    );
}
