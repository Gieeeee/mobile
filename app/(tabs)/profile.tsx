import { router } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function Profile() {
  const handleLogout = () => {
    // Later: AsyncStorage.removeItem("token")
    router.replace("/login");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Settings</Text>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0f172a",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    color: "white",
    fontSize: 24,
    marginBottom: 20,
  },
  logoutButton: {
    backgroundColor: "#ef4444",
    paddingVertical: 14,
    paddingHorizontal: 30,
    borderRadius: 12,
  },
  logoutText: {
    color: "white",
    fontWeight: "600",
  },
});