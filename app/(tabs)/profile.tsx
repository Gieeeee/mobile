import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useUser } from "../context/user-context";

export default function Profile() {
  const { user, logout } = useUser();

  const handleLogout = () => {
    logout();
    router.replace("/login");
  };

  const handleNotifications = () => {
    // TODO: open notifications
  };

  const handleQR = () => {
    // TODO: open QR scanner / show QR
  };

  const handleInvoice = () => {
    // TODO: view invoices
  };

  return (
    <View style={styles.container}>
      <View style={styles.leftColumn}>
        <Ionicons name="person-circle-outline" size={64} color="white" />
        <Text style={styles.name}>{user?.name || "Your Name"}</Text>

        <View style={styles.buttonRow}>
          <TouchableOpacity
            style={styles.notifButton}
            onPress={handleNotifications}
            accessibilityLabel="Notifications"
          >
            <Ionicons name="notifications-outline" size={20} color="white" />
            <Text style={styles.buttonText}>Notifications</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.qrButton, { marginTop: 12 }]}
            onPress={handleQR}
            accessibilityLabel="QR Code"
          >
            <Ionicons name="qr-code-outline" size={20} color="white" />
            <Text style={styles.buttonText}>QR Code</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.invoiceButton, { marginTop: 12 }]}
            onPress={handleInvoice}
            accessibilityLabel="Invoice"
          >
            <Ionicons name="receipt-outline" size={20} color="white" />
            <Text style={styles.buttonText}>Invoice</Text>
          </TouchableOpacity>
        </View>
      </View>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Ionicons name="log-out" size={20} color="white" />
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0f172a",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    padding: 20,
  },
  title: {
    color: "white",
    fontSize: 24,
    marginBottom: 20,
  },
  logoutButton: {
    backgroundColor: "#ef4444",
    padding: 10,
    paddingHorizontal: 25,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  logoutText: {
    color: "white",
    fontWeight: "600",
  },
  leftColumn: {
    alignSelf: "stretch",
    marginTop: 24,
    
  },
  name: {
    color: "#cbd5e1",
    fontSize: 20,
    marginBottom: 12,
  },
  buttonRow: {
    flexDirection: "column",
    marginBottom: 20,
  },
  qrButton: {
    backgroundColor: "#0b1220",
    padding: 10,
    paddingHorizontal: 14,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  notifButton: {
    backgroundColor: "#0b1220",
    padding: 10,
    paddingHorizontal: 14,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  invoiceButton: {
    backgroundColor: "#0b1220",
    padding: 10,
    paddingHorizontal: 14,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  buttonText: {
    color: "white",
    fontSize: 14,
    marginLeft: 8,
    fontWeight: "500",
  },
});