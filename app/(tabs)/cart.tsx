import { StyleSheet, Text, View } from "react-native";

export default function Trackorder() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Track order</Text>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Welcome 👋</Text>
        <Text style={styles.cardText}>You're now logged in to the system.</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0f172a",
    padding: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: "700",
    color: "white",
    marginBottom: 20,
  },
  card: {
    backgroundColor: "#1e293b",
    padding: 20,
    borderRadius: 16,
  },
  cardTitle: {
    color: "white",
    fontSize: 18,
    fontWeight: "600",
  },
  cardText: {
    color: "#94a3b8",
    marginTop: 5,
  },
});
