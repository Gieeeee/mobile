import { Stack } from "expo-router";
import { CartProvider } from "./context/cart-context";
import { UserProvider } from "./context/user-context";

export default function RootLayout() {
  return (
    <UserProvider>
      <CartProvider>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="login" />
          <Stack.Screen name="register" />
          <Stack.Screen name="(tabs)" />
        </Stack>
      </CartProvider>
    </UserProvider>
  );
}
