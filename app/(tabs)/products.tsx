import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useMemo, useState } from "react";
import {
  Alert,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from "react-native";
import { useCart } from "../cart-context";
import { CATEGORIES, Category, PRODUCTS, Product } from "../products-data";

type IconProps = {
  size: number;
  color?: string;
};

const Search = ({ size, color }: IconProps) => (
  <Ionicons name="search" size={size} color={color} />
);
const Star = ({ size, color }: IconProps) => (
  <Ionicons name="star" size={size} color={color} />
);
const X = ({ size, color }: IconProps) => (
  <Ionicons name="close" size={size} color={color} />
);

const formatCurrency = (value: number) => `₱${value.toFixed(2)}`;

export default function App() {
  const [selectedCategoryId, setSelectedCategoryId] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const { addToCart } = useCart();
  const router = useRouter();
  const { fontScale, width } = useWindowDimensions();
  const iconSize = 16 * fontScale;

  const numColumns = width > 768 ? 3 : width > 480 ? 2 : 1;

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      const matchesCategory =
        selectedCategoryId === "all" ||
        product.categoryId === selectedCategoryId;
      const matchesSearch =
        product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategoryId, searchQuery]);

  const handleAddToCart = (product: Product) => {
    if (product.stock === 0) {
      Alert.alert("Out of Stock", "This item is currently unavailable.");
      return;
    }

    addToCart(product);
    Alert.alert(
      "Added to Cart",
      `${product.title} has been added to your cart.`,
    );
  };

  const handleBuyNow = (product: Product) => {
    if (product.stock === 0) {
      Alert.alert("Out of Stock", "This item is currently unavailable.");
      return;
    }

    addToCart(product);
    router.push("/cart");
  };

  const renderCategoryItem = ({ item }: { item: Category }) => {
    const isSelected = item.id === selectedCategoryId;
    return (
      <TouchableOpacity
        onPress={() => setSelectedCategoryId(item.id)}
        style={[
          styles.categoryButton,
          isSelected && styles.selectedCategoryButton,
        ]}
      >
        <Text
          style={[
            styles.categoryText,
            isSelected && styles.selectedCategoryText,
            { fontSize: 13 * fontScale },
          ]}
        >
          {item.name}
        </Text>
      </TouchableOpacity>
    );
  };

  const renderProductItem = ({ item }: { item: Product }) => {
    const isOutOfStock = item.stock === 0;
    const isLowStock = item.stock > 0 && item.stock <= 5;

    return (
      <TouchableOpacity
        onPress={() => setSelectedProduct(item)}
        activeOpacity={0.85}
        style={styles.productCard}
      >
        <View style={styles.imagePlaceholder}>
          <Text style={{ fontSize: 28 }}>📦</Text>
        </View>

        <View style={styles.detailsContainer}>
          <Text
            style={[styles.productTitle, { fontSize: 16 * fontScale }]}
            numberOfLines={1}
          >
            {item.title}
          </Text>

          <Text
            style={[styles.productDescription, { fontSize: 12 * fontScale }]}
            numberOfLines={2}
          >
            {item.description}
          </Text>

          <View style={styles.ratingRow}>
            <Star size={14 * fontScale} color="#FBBF24" />
            <Text style={[styles.ratingText, { fontSize: 13 * fontScale }]}>
              {item.rating.toFixed(1)}{" "}
              <Text style={styles.reviewCountText}>({item.reviewCount})</Text>
            </Text>
          </View>

          <View style={styles.metaRow}>
            <Text style={[styles.productPrice, { fontSize: 16 * fontScale }]}>
              {formatCurrency(item.price)}
            </Text>

            <View
              style={[
                styles.stockBadge,
                isOutOfStock
                  ? styles.outOfStockBadge
                  : isLowStock
                    ? styles.lowStockBadge
                    : styles.inStockBadge,
              ]}
            >
              <Text
                style={[
                  styles.stockBadgeText,
                  { fontSize: 11 * fontScale },
                  isOutOfStock
                    ? styles.outOfStockText
                    : isLowStock
                      ? styles.lowStockText
                      : styles.inStockText,
                ]}
              >
                {isOutOfStock
                  ? "No Stock"
                  : isLowStock
                    ? `Only ${item.stock} Left`
                    : "In Stock"}
              </Text>
            </View>
          </View>

          <TouchableOpacity
            onPress={() => handleBuyNow(item)}
            activeOpacity={0.7}
            style={[styles.actionButton, isOutOfStock && styles.disabledButton]}
            disabled={isOutOfStock}
          >
            <Text
              style={[styles.actionButtonText, { fontSize: 13 * fontScale }]}
            >
              {isOutOfStock ? "Sold Out" : "Buy Now"}
            </Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchWrapper}>
        <View style={styles.searchBarContainer}>
          <Search size={iconSize} color="#6B7280" />
          <TextInput
            style={[styles.searchInput, { fontSize: 15 * fontScale }]}
            placeholder="Search items"
            placeholderTextColor="#9CA3AF"
            value={searchQuery}
            onChangeText={setSearchQuery}
            autoCapitalize="none"
            autoCorrect={false}
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity
              onPress={() => setSearchQuery("")}
              style={styles.clearButton}
            >
              <X size={iconSize} color="#9CA3AF" />
            </TouchableOpacity>
          )}
        </View>
      </View>

      <View style={styles.headerRow}>
        <Text style={[styles.headerTitle, { fontSize: 24 * fontScale }]}>
          CATEGORIES
        </Text>
      </View>

      <FlatList
        horizontal
        data={CATEGORIES}
        renderItem={renderCategoryItem}
        keyExtractor={(item) => item.id}
        showsHorizontalScrollIndicator={false}
        style={styles.categoriesContainer}
      />

      <FlatList
        key={numColumns}
        data={filteredProducts}
        renderItem={renderProductItem}
        keyExtractor={(item) => item.id}
        numColumns={numColumns}
        columnWrapperStyle={numColumns > 1 ? styles.gridRow : undefined}
        contentContainerStyle={styles.listContent}
      />

      {selectedProduct && (
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Product details</Text>
              <TouchableOpacity
                onPress={() => setSelectedProduct(null)}
                style={styles.closeButton}
              >
                <X size={18} color="#111827" />
              </TouchableOpacity>
            </View>

            <View style={styles.modalImage}>
              <Text style={{ fontSize: 44 }}>📦</Text>
            </View>

            <Text style={styles.modalProductTitle}>
              {selectedProduct.title}
            </Text>
            <Text style={styles.modalProductPrice}>
              {formatCurrency(selectedProduct.price)}
            </Text>
            <View style={[styles.ratingRow, { marginBottom: 10 }]}>
              <Star size={16} color="#FBBF24" />
              <Text
                style={[styles.ratingText, { fontSize: 14, marginLeft: 6 }]}
              >
                {selectedProduct.rating.toFixed(1)}
              </Text>
              <Text style={[styles.reviewCountText, { marginLeft: 6 }]}>
                ({selectedProduct.reviewCount} reviews)
              </Text>
            </View>

            <Text style={styles.productDescription}>
              {selectedProduct.description}
            </Text>
            <Text style={styles.modalStockText}>
              {selectedProduct.stock === 0
                ? "Out of Stock"
                : `Stock available: ${selectedProduct.stock}`}
            </Text>

            <View style={styles.modalActions}>
              <TouchableOpacity
                onPress={() => handleAddToCart(selectedProduct)}
                style={[
                  styles.detailButton,
                  styles.addButton,
                  selectedProduct.stock === 0 && styles.disabledButton,
                ]}
                disabled={selectedProduct.stock === 0}
              >
                <Text style={styles.detailButtonText}>Add to Cart</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => handleBuyNow(selectedProduct)}
                style={[
                  styles.detailButton,
                  styles.buyButton,
                  selectedProduct.stock === 0 && styles.disabledButton,
                ]}
                disabled={selectedProduct.stock === 0}
              >
                <Text style={styles.detailButtonText}>Buy Now</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 10,
  },
  headerRow: {
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  headerTitle: {
    fontWeight: "bold",
    color: "#1F2937",
  },
  searchWrapper: {
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  searchBarContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F3F4F6",
    borderRadius: 8,
    paddingHorizontal: 12,
    height: 44,
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    color: "#000",
  },
  clearButton: {
    padding: 4,
  },
  categoriesContainer: {
    maxHeight: 30,
    paddingHorizontal: 16,
    marginBottom: 20,
  },
  categoryButton: {
    paddingHorizontal: 16,
    height: 30,
    paddingVertical: 8,
    borderRadius: 18,
    backgroundColor: "#E5E7EB",
    marginRight: 8,
    justifyContent: "center",
  },
  selectedCategoryButton: {
    backgroundColor: "#1F2937",
  },
  categoryText: {
    color: "#374151",
    fontWeight: "500",
  },
  selectedCategoryText: {
    color: "#fff",
  },
  listContent: {
    paddingHorizontal: 16,
    paddingBottom: 32,
  },
  gridRow: {
    justifyContent: "space-between",
  },
  productCard: {
    flex: 1,
    backgroundColor: "#fff",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    marginBottom: 20,
    overflow: "hidden",
    marginHorizontal: 4,
  },
  imagePlaceholder: {
    height: 120,
    backgroundColor: "#F9FAFB",
    justifyContent: "center",
    alignItems: "center",
  },
  detailsContainer: {
    padding: 12,
  },
  productTitle: {
    fontWeight: "bold",
    color: "#1F2937",
    marginBottom: 4,
  },
  productDescription: {
    color: "#6B7280",
    marginBottom: 8,
  },
  ratingRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  ratingText: {
    marginLeft: 4,
    fontWeight: "600",
    color: "#374151",
  },
  reviewCountText: {
    color: "#9CA3AF",
    fontWeight: "400",
  },
  metaRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  productPrice: {
    fontWeight: "bold",
    color: "#1F2937",
  },
  stockBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  inStockBadge: {
    backgroundColor: "#D1FAE5",
  },
  lowStockBadge: {
    backgroundColor: "#FEF3C7",
  },
  outOfStockBadge: {
    backgroundColor: "#FEE2E2",
  },
  stockBadgeText: {
    fontWeight: "600",
  },
  inStockText: {
    color: "#065F46",
  },
  lowStockText: {
    color: "#92400E",
  },
  outOfStockText: {
    color: "#991B1B",
  },
  actionButton: {
    backgroundColor: "#1F2937",
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  disabledButton: {
    backgroundColor: "#D1D5DB",
  },
  actionButtonText: {
    color: "#fff",
    fontWeight: "600",
  },
  modalOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(15, 23, 42, 0.7)",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  modalContent: {
    width: "100%",
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 20,
    shadowColor: "#000",
    shadowOpacity: 0.12,
    shadowRadius: 20,
    elevation: 12,
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 14,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#111827",
  },
  closeButton: {
    padding: 6,
  },
  modalImage: {
    alignSelf: "center",
    marginBottom: 14,
  },
  modalProductTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#111827",
    marginBottom: 6,
  },
  modalProductPrice: {
    fontSize: 18,
    fontWeight: "700",
    color: "#0B1220",
    marginBottom: 8,
  },
  modalStockText: {
    color: "#374151",
    marginTop: 8,
    marginBottom: 18,
  },
  modalActions: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12,
  },
  detailButton: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  addButton: {
    backgroundColor: "#2563EB",
  },
  buyButton: {
    backgroundColor: "#10B981",
  },
  detailButtonText: {
    color: "#fff",
    fontWeight: "700",
  },
});
