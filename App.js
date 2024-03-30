// import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import CommentsScreen from './components/CommentsScreen'; // Correct import statement
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="WELCOME" component={CommentsScreen} />
      </Stack.Navigator>
    </NavigationContainer>

  );
}