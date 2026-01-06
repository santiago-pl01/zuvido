import { Stack } from 'expo-router';
import React from 'react';

export default function AppLayout() {
  return (
    <Stack screenOptions={{
      headerStyle: { backgroundColor: '#FFEE93' },
      headerTintColor: '#1A1A1A',
      headerTitleStyle: { fontWeight: 'bold' },
    }}>
      <Stack.Screen 
        name="clientes" 
        options={{
          title: 'Menu Acessível aaaaaaaaaaaa',
        }} 
      />
    </Stack>
  );
}