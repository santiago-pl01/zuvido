import { Stack } from 'expo-router';
import React from 'react';

export default function ClienteLayout() {
  return (
    <Stack>
      <Stack.Screen name="qrcode" />
      <Stack.Screen name="exemplo" />
      <Stack.Screen name="config" />
    </Stack>
  );
}