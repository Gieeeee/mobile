import { Ionicons } from "@expo/vector-icons";
import { useMemo, useState } from 'react';
import {
  Alert,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  useWindowDimensions
} from 'react-native';

// 1. Data Structures
type Category = {
  id: string;
  name: string;
};

type Product = {
  id: string;
  categoryId: string;
  title: string;
  price: number;
  description: string;
  rating: number;      
  reviewCount: number; 
  stock: number;       
};

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

const CATEGORIES: Category[] = [
  { id: 'all', name: 'All Products' },
  { id: '1', name: 'Accessories' },
  { id: '2', name: 'Chemicals' },
  { id: '3', name: 'Machines' },
];

const PRODUCTS: Product[] = [
  { id: 'p1', categoryId: '1', title: 'Microfiber Towel Set', price: 14.99, description: 'Ultra soft absorbent towels', rating: 4.8, reviewCount: 124, stock: 15 },
  { id: 'p2', categoryId: '1', title: 'Heavy Duty Spray Bottle', price: 6.50, description: 'Professional leak-proof sprayer', rating: 4.2, reviewCount: 48, stock: 0 }, 
  { id: 'p3', categoryId: '2', title: 'Floor Cleaner Concentrate', price: 24.99, description: 'Concentrated eco-friendly formula', rating: 4.6, reviewCount: 89, stock: 5 },  
  { id: 'p4', categoryId: '2', title: 'Industrial Degreaser', price: 32.00, description: 'Removes stubborn grease and oil fast', rating: 4.9, reviewCount: 210, stock: 42 },
  { id: 'p5', categoryId: '3', title: 'Commercial Backpack Vac', price: 289.00, description: 'High power lightweight vacuum', rating: 4.7, reviewCount: 35, stock: 3 },    
  { id: 'p6', categoryId: '3', title: 'Automatic Floor Scrubber', price: 1250.00, description: 'Battery powered walk-behind scrubber', rating: 5.0, reviewCount: 12, stock: 2 },
];

export default function App() {
  const [selectedCategoryId, setSelectedCategoryId] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  
  const { fontScale, width } = useWindowDimensions();
  const iconSize = 16 * fontScale;

  const numColumns = width > 768 ? 3 : width > 480 ? 2 : 1; 

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      const matchesCategory = selectedCategoryId === 'all' || product.categoryId === selectedCategoryId;
      const matchesSearch = product.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            product.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategoryId, searchQuery]);

  const handleOrderProduct = (product: Product) => {
    if (product.stock === 0) {
      Alert.alert('Out of Stock', 'This item is currently unavailable.');
      return;
    }
    Alert.alert('Success', `${product.title} has been selected.`);
  };

  const renderCategoryItem = ({ item }: { item: Category }) => {
    const isSelected = item.id === selectedCategoryId;
    return (
      <TouchableOpacity
        onPress={() => setSelectedCategoryId(item.id)}
        style={[styles.categoryButton, isSelected && styles.selectedCategoryButton]}
      >
        <Text style={[styles.categoryText, isSelected && styles.selectedCategoryText, { fontSize: 13 * fontScale }]}>
          {item.name}
        </Text>
      </TouchableOpacity>
    );
  };

  const renderProductItem = ({ item }: { item: Product }) => {
    const isOutOfStock = item.stock === 0;
    const isLowStock = item.stock > 0 && item.stock <= 5;

    return (
      <View style={styles.productCard}>
        <View style={styles.imagePlaceholder}>
          <Text style={{ fontSize: 28 }}>📦</Text>
        </View>

        <View style={styles.detailsContainer}>
          <Text style={[styles.productTitle, { fontSize: 16 * fontScale }]} numberOfLines={1}>
            {item.title}
          </Text>

          <Text style={[styles.productDescription, { fontSize: 12 * fontScale }]} numberOfLines={2}>
            {item.description}
          </Text>

          <View style={styles.ratingRow}>
            <Star size={14 * fontScale} color="#FBBF24" />
            <Text style={[styles.ratingText, { fontSize: 13 * fontScale }]}>
              {item.rating.toFixed(1)}{' '}
              <Text style={styles.reviewCountText}>({item.reviewCount})</Text>
            </Text>
          </View>

          <View style={styles.metaRow}>
            <Text style={[styles.productPrice, { fontSize: 16 * fontScale }]}>
              ₱{item.price.toFixed(2)}
            </Text>
            
            <View style={[
              styles.stockBadge, 
              isOutOfStock ? styles.outOfStockBadge : isLowStock ? styles.lowStockBadge : styles.inStockBadge
            ]}>
              <Text style={[
                styles.stockBadgeText, 
                { fontSize: 11 * fontScale },
                isOutOfStock ? styles.outOfStockText : isLowStock ? styles.lowStockText : styles.inStockText
              ]}>
                {isOutOfStock ? 'No Stock' : isLowStock ? `Only ${item.stock} Left` : 'In Stock'}
              </Text>
            </View>
          </View>

          {/* Interactive Button (No Icon) */}
          <TouchableOpacity
            onPress={() => handleOrderProduct(item)}
            activeOpacity={0.7}
            style={[styles.actionButton, isOutOfStock && styles.disabledButton]}
            disabled={isOutOfStock}
          >
            <Text style={[styles.actionButtonText, { fontSize: 13 * fontScale }]}>
              {isOutOfStock ? 'Sold Out' : 'Buy Now'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {/* Search Bar */}
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
            <TouchableOpacity onPress={() => setSearchQuery('')} style={styles.clearButton}>
              <X size={iconSize} color="#9CA3AF" />
            </TouchableOpacity>
            
          )}
        </View>
      </View>
    {/* Header (No Cart Icon) */}
      <View style={styles.headerRow}>
        <Text style={[styles.headerTitle, { fontSize: 24 * fontScale }]}>CATEGORIES</Text>
      </View>

      {/* Categories List */}
      <FlatList
        horizontal
        data={CATEGORIES}
        renderItem={renderCategoryItem}
        keyExtractor={(item) => item.id}
        showsHorizontalScrollIndicator={false}
        style={styles.categoriesContainer}
      />

      {/* Products Grid */}
      <FlatList
        key={numColumns} 
        data={filteredProducts}
        renderItem={renderProductItem}
        keyExtractor={(item) => item.id}
        numColumns={numColumns}
        columnWrapperStyle={numColumns > 1 ? styles.gridRow : null} 
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
}

//  styles 
const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#fff', 
    paddingTop: 10 ,
  },
  headerRow: {
    paddingHorizontal: 16, 
    marginBottom: 12,
  },
  headerTitle: {
    fontWeight: 'bold',
    color: '#1F2937'
  },
  searchWrapper: { 
    paddingHorizontal: 16, 
    marginBottom: 12,
  },
  searchBarContainer: {
    flexDirection: 'row', 
    alignItems: 'center', 
    backgroundColor: '#F3F4F6', 
    borderRadius: 8, 
    paddingHorizontal: 12, 
    height: 44 
  },
  searchInput: {
    flex: 1,
    marginLeft: 8, 
    color: '#000' 
  },
  clearButton: {
    padding: 4 
  },
  categoriesContainer: {
    maxHeight: 30, 
    paddingHorizontal: 16, 
    marginBottom: 20
  },
  categoryButton: {
    paddingHorizontal: 16,
    height: 30,
    paddingVertical: 8,
    borderRadius: 18,
    backgroundColor: '#E5E7EB',
    marginRight: 8,
    justifyContent: 'center'
  },
  selectedCategoryButton: {
    backgroundColor: '#1F2937' 
  },
  categoryText: {
    color: '#374151', 
    fontWeight: '500' 
  },
  selectedCategoryText: { 
    color: '#fff' 
  },
  listContent: {
    paddingHorizontal: 16, 
    paddingBottom: 32 
  },
  gridRow: { 
    justifyContent: 'space-between' 
  },
  productCard: {
    flex: 1,
    backgroundColor: '#fff', 
    borderRadius: 12, 
    borderWidth: 1, 
    borderColor: '#E5E7EB', 
    marginBottom: 20, 
    overflow: 'hidden',
    marginHorizontal: 4 
  },
  imagePlaceholder: { 
    height: 120, 
    backgroundColor: '#F9FAFB', 
    justifyContent: 'center', 
    alignItems: 'center' 
  },
  detailsContainer: {
    padding: 12 
  },
  productTitle: {
    fontWeight: 'bold', 
    color: '#1F2937', 
    marginBottom: 4 
  },
  productDescription: { 
    color: '#6B7280', 
    marginBottom: 8 
  },
  ratingRow: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    marginBottom: 8 
  },
  ratingText: {
    marginLeft: 4, 
    fontWeight: '600', 
    color: '#374151' 
  },
  reviewCountText: { 
    color: '#9CA3AF', 
    fontWeight: '400' 
  },
  metaRow: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    marginBottom: 12 
  },
  productPrice: { 
    fontWeight: 'bold', 
    color: '#1F2937' 
  },
  stockBadge: { 
    paddingHorizontal: 8, 
    paddingVertical: 4, 
    borderRadius: 4 
  },
  inStockBadge: { 
    backgroundColor: '#D1FAE5' 
  },
  lowStockBadge: { 
    backgroundColor: '#FEF3C7' 
  },
  outOfStockBadge: { 
    backgroundColor: '#FEE2E2' 
  },
  stockBadgeText: { 
    fontWeight: '600' 
  },
  inStockText: { 
    color: '#065F46' 
  },
  lowStockText: { 
    color: '#92400E' 
  },
  outOfStockText: { 
    color: '#991B1B' 
  },
  actionButton: { 
    backgroundColor: '#1F2937', 
    paddingVertical: 10, 
    borderRadius: 8,
    alignItems: 'center', 
    justifyContent: 'center' 
  },
  disabledButton: { 
    backgroundColor: '#D1D5DB' 
  },
  actionButtonText: { 
    color: '#fff', 
    fontWeight: '600' 
  }
});
