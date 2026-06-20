import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useCart } from "../cart-context";

export default function CartScreen() {
  const { cartItems, totalPrice, removeFromCart, clearCart } = useCart();

  if (cartItems.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyTitle}>Your cart is empty.</Text>
        <Text style={styles.emptySubtitle}>
          Tap a product to add it and come back here.
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Cart</Text>

      {cartItems.map((item) => (
        <View key={item.id} style={styles.cartItem}>
          <View style={styles.itemInfo}>
            <Text style={styles.itemTitle}>{item.title}</Text>
            <Text style={styles.itemSubtitle}>
              {item.quantity} × ₱{item.price.toFixed(2)}
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => removeFromCart(item.id)}
            style={styles.removeButton}
          >
            <Text style={styles.removeButtonText}>Remove</Text>
          </TouchableOpacity>
        </View>
      ))}

      <View style={styles.summaryContainer}>
        <Text style={styles.summaryText}>Total</Text>
        <Text style={styles.summaryAmount}>₱{totalPrice.toFixed(2)}</Text>
      </View>

      <TouchableOpacity onPress={clearCart} style={styles.clearButton}>
        <Text style={styles.clearButtonText}>Clear cart</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
  },
  emptyContainer: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  emptyTitle: {
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 12,
    color: "#111827",
  },
  emptySubtitle: {
    fontSize: 16,
    color: "#4B5563",
    textAlign: "center",
    lineHeight: 22,
  },
  title: {
    fontSize: 26,
    fontWeight: "700",
    color: "#111827",
    marginBottom: 24,
  },
  cartItem: {
    backgroundColor: "#F3F4F6",
    padding: 16,
    borderRadius: 16,
    marginBottom: 14,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  itemInfo: {
    flex: 1,
    paddingRight: 12,
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#111827",
    marginBottom: 4,
  },
  itemSubtitle: {
    fontSize: 14,
    color: "#6B7280",
  },
  removeButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: "#EF4444",
    borderRadius: 10,
  },
  removeButtonText: {
    color: "#fff",
    fontWeight: "700",
  },
  summaryContainer: {
    marginTop: 10,
    padding: 18,
    backgroundColor: "#E5E7EB",
    borderRadius: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  summaryText: {
    fontSize: 16,
    color: "#374151",
    fontWeight: "600",
  },
  summaryAmount: {
    fontSize: 18,
    fontWeight: "700",
    color: "#111827",
  },
  clearButton: {
    marginTop: 18,
    backgroundColor: "#1F2937",
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: "center",
  },
  clearButtonText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 16,
  },
});
