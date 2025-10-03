// App.js
import React from 'react';
import { StatusBar, useColorScheme } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { ContactProvider } from './src/utils/ContactContext';
import ContactListScreen from './src/screens/ContactList/ContactListScreen';
import AddContactScreen from './src/screens/AddContact/AddContactScreen';
import ContactDetailsScreen from './src/screens/ContactDetails/ContactDetailsScreen'; // create this if you haven't already

const Stack = createNativeStackNavigator();

export default function App() {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <SafeAreaProvider>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <ContactProvider>
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName="ContactList"
            screenOptions={{
              headerStyle: { backgroundColor: '#3498db' },
              headerTintColor: '#fff',
              headerTitleStyle: { fontWeight: 'bold' },
            }}
          >
            <Stack.Screen
              name="ContactList"
              component={ContactListScreen}
              options={{ title: 'Contacts' }}
            />
            <Stack.Screen
              name="AddContact"
              component={AddContactScreen}
              options={({ route }) => ({
                title: route?.params?.contact ? 'Edit Contact' : 'Add Contact',
              })}
            />
            <Stack.Screen
              name="ContactDetails"
              component={ContactDetailsScreen}
              options={{ title: 'Contact Details' }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </ContactProvider>
    </SafeAreaProvider>
  );
}
