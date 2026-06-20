import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import {
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

export default function Register() {
  return (
    <LinearGradient colors={["#0f172a", "#1e293b"]} style={styles.container}>
      <Text style={styles.title}>Create Account</Text>

      <View style={styles.card}>
        <TextInput
          placeholder="Full Name"
          placeholderTextColor="#94a3b8"
          style={styles.input}
        />

        <TextInput
          placeholder="Email"
          placeholderTextColor="#94a3b8"
          style={styles.input}
        />

        <TextInput
          placeholder="Password"
          placeholderTextColor="#94a3b8"
          secureTextEntry
          style={styles.input}
        />

        <TouchableOpacity
          style={styles.button}
          onPress={() => router.replace("/(tabs)")}
        >
          <Text style={styles.buttonText}>Register</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.back()}>
          <Text style={styles.link}>Back to Login</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "white",
    textAlign: "center",
    marginBottom: 20,
  },
  card: {
    backgroundColor: "#0b1220",
    padding: 20,
    borderRadius: 20,
  },
  input: {
    backgroundColor: "#111827",
    padding: 14,
    borderRadius: 12,
    marginBottom: 12,
    color: "white",
  },
  button: {
    backgroundColor: "#22c55e",
    padding: 14,
    borderRadius: 12,
    marginTop: 10,
  },
  buttonText: {
    color: "white",
    textAlign: "center",
    fontWeight: "600",
  },
  link: {
    color: "#60a5fa",
    textAlign: "center",
    marginTop: 15,
  },
});
