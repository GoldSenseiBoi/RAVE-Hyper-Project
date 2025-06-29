import { Ionicons } from '@expo/vector-icons';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { DarkTheme, NavigationContainer } from '@react-navigation/native';
import { StyleSheet, View } from 'react-native';
import { Provider, useSelector } from 'react-redux';
import HomeScreen from './components/Screen/HomeScreen';
import RecordingScreen from './components/Screen/RecordingScreen';
import UploadRecordingScreen from './components/Screen/UploadRecordingScreen';
import store from './store/store';

const Tab = createBottomTabNavigator();

function MainContent() {
  const { connected } = useSelector(state => state.server);

  if (!connected) {
    return (
      <View style={styles.container}>
        <HomeScreen />
      </View>
    );
  }

  return (
    <NavigationContainer theme={DarkTheme}>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            if (route.name === 'Studio') {
              iconName = focused ? 'headset' : 'headset-outline';
            } else if (route.name === 'Convertisseur') {
              iconName = focused ? 'sync' : 'sync-outline';
            }
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: '#4FC3F7',
          tabBarInactiveTintColor: '#aaa',
          tabBarStyle: {
            backgroundColor: '#1e1e1e',
            borderTopColor: '#333'
          },
          headerShown: false
        })}
      >
        <Tab.Screen name="Studio" component={RecordingScreen} />
        <Tab.Screen name="Convertisseur" component={UploadRecordingScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <Provider store={store}>
      <MainContent />
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
});
