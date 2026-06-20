import { Stack } from "expo-router";
import { CartProvider } from "./cart-context";

export default function RootLayout() {
  return (
    <CartProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="login" />
        <Stack.Screen name="register" />
        <Stack.Screen name="(tabs)" />
      </Stack>
    </CartProvider>
  );
}
