import '@/global.css';

import { useEffect } from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import * as SplashScreen from 'expo-splash-screen';
import { Platform } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import {
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
  useFonts,
} from '@expo-google-fonts/inter';

import { colors } from '@/theme/tokens';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [fontsLoaded] = useFonts({ Inter_400Regular, Inter_500Medium, Inter_600SemiBold, Inter_700Bold });

  useEffect(() => {
    if (fontsLoaded) SplashScreen.hideAsync();
  }, [fontsLoaded]);

  // Web muss auch beim statischen Export rendern, damit Titel, Meta-Daten und
  // Seiteninhalt bereits im initialen HTML für Crawler verfügbar sind.
  if (!fontsLoaded && Platform.OS !== 'web') return null;

  return (
    <SafeAreaProvider>
      <StatusBar style="light" />
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: colors.midnight950 },
          animation: 'fade_from_bottom',
        }}
      >
        <Stack.Screen name="index" />
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="report" options={{ presentation: 'modal' }} />
        <Stack.Screen name="alert/[id]" />
        <Stack.Screen name="substance/[slug]" />
        <Stack.Screen name="safety-check" />
        <Stack.Screen name="breathing" />
        <Stack.Screen name="grounding" />
        <Stack.Screen name="chat" />
        <Stack.Screen name="aftercare" />
        <Stack.Screen name="trusted-contacts" />
      </Stack>
    </SafeAreaProvider>
  );
}
