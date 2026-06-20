import API_CONFIG from "@/constants/api";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { useState } from "react";
import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`${API_CONFIG.LOCAL_URL}/api/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await response.json();

      if (data.status) {
        // success
        Alert.alert("Success", data.message);

        // navigate to tabs (authenticated area)
        router.replace("/(tabs)");
      } else {
        Alert.alert("Login Failed", data.message);
      }
    } catch (error) {
      Alert.alert("Error", "Cannot connect to server");
    } finally {
      setLoading(false);
    }
  };

  return (
    <LinearGradient colors={["#0f172a", "#1e293b"]} style={styles.container}>
      <Text style={styles.logo}>HYGIENIX</Text>
      <Text style={styles.subtitle}>Welcome back</Text>

      <View style={styles.card}>
        <TextInput
          placeholder="Email"
          placeholderTextColor="#94a3b8"
          value={email}
          onChangeText={setEmail}
          style={styles.input}
        />

        <TextInput
          placeholder="Password"
          placeholderTextColor="#94a3b8"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
          style={styles.input}
        />

        <TouchableOpacity
          style={styles.button}
          onPress={() => router.replace("/(tabs)")}
        >
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>

        {/* <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>
            {loading ? "Logging in..." : "Login"}
          </Text>
        </TouchableOpacity> */}

        <TouchableOpacity onPress={() => router.push("/register")}>
          <Text style={styles.link}>Don’t have an account? Register</Text>
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
  logo: {
    fontSize: 40,
    fontWeight: "900",
    marginHorizontal: 10,
    color: "white",
    textAlign: "left",
  },
  subtitle: {
    color: "#94a3b8",
    textAlign: "left",
    marginHorizontal: 10,
    marginBottom: 30,
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
    backgroundColor: "#3b82f6",
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
