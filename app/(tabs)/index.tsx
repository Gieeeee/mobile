import Ionicons from '@expo/vector-icons/Ionicons';
import { router } from 'expo-router';
import { useState } from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

const newArrivals = [
  { id: 1, title: 'Hand Sanitizer', price: '₱5.99', image: 'https://via.placeholder.com/150/FF1493/FFFFFF?text=Sanitizer' },
  { id: 2, title: 'Cleaning Supplies', price: '₱12.99', image: 'https://via.placeholder.com/150/4169E1/FFFFFF?text=Cleaning' },
  { id: 3, title: 'Disinfectant', price: '₱8.99', image: 'https://via.placeholder.com/150/FFD700/FFFFFF?text=Disinfectant' },
];

const featured = [
  { id: 1, title: 'Premium Cleaner', price: '₱15.99', image: 'https://via.placeholder.com/150/FF1493/FFFFFF?text=Premium' },
  { id: 2, title: 'Deluxe Sanitizer', price: '₱13.99', image: 'https://via.placeholder.com/150/4169E1/FFFFFF?text=Deluxe' },
  { id: 3, title: 'Eco-Friendly', price: '₱9.99', image: 'https://via.placeholder.com/150/FFD700/FFFFFF?text=Eco' },
];

export default function HomeScreen() {
  const [search, setSearch] = useState('');

  const handleViewAllProducts = () => {
    router.push('/(tabs)/products');
  };

  const handleSearch = () => {
    if (search.trim()) {
      router.push({
        pathname: '/(tabs)/products',
        params: { searchQuery: search },
      });
    }
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Search Bar */}
      <View style={styles.searchWrapper}>
        <View style={styles.searchBarContainer}>
          <Ionicons name="search" size={20} color="#6B7280" />
          <TextInput
            style={[styles.searchInput, { fontSize: 15 }]}
            placeholder="Search Products"
            placeholderTextColor="#9CA3AF"
            value={search}
            onChangeText={setSearch}
            onSubmitEditing={handleSearch}
            autoCapitalize="none"
            autoCorrect={false}
            returnKeyType="search"
          />
          {search.length > 0 && (
            <TouchableOpacity onPress={() => setSearch('')} style={styles.clearButton}>
              <Ionicons name="close" size={10} color="#9CA3AF" />
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* NEW ARRIVALS Section */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>NEW ARRIVALS!</Text>
          <TouchableOpacity onPress={handleViewAllProducts}>
            <Text style={styles.viewMore}>Go to products &gt;</Text>
          </TouchableOpacity>
        </View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.productScroll}
        >
          {newArrivals.map((item) => (
            <TouchableOpacity key={item.id} style={styles.productCard}>
              <Image
                source={{ uri: item.image }}
                style={styles.productImage}
              />
              <Text style={styles.productTitle}>{item.title}</Text>
              <Text style={styles.productPrice}>{item.price}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* FEATURED Section */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>FEATURED</Text>
          <TouchableOpacity onPress={handleViewAllProducts}>
            <Text style={styles.viewMore}>Go to products &gt;</Text>
          </TouchableOpacity>
        </View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.productScroll}
        >
          {featured.map((item) => (
            <TouchableOpacity key={item.id} style={styles.productCard}>
              <Image
                source={{ uri: item.image }}
                style={styles.productImage}
              />
              <Text style={styles.productTitle}>{item.title}</Text>
              <Text style={styles.productPrice}>{item.price}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    backgroundColor: '#fff', 
    paddingTop: 10,
  },
  searchWrapper: {
    paddingHorizontal: 16, 
    marginBottom: 16,
  },
  searchBarContainer: {
    flexDirection: 'row', 
    alignItems: 'center', 
    backgroundColor: '#F3F4F6', 
    borderRadius: 8, 
    paddingHorizontal: 12, 
    height: 44 
  },
  input: {
    flex: 1,
    marginLeft: 8, 
    color: '#000'
  },
  clearWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  clearButton: {
    padding: 4,
  },
  searchInput: {
    flex: 1,
    marginLeft: 8, 
    color: '#000'
  },
  section: {
    marginBottom: 24,
    paddingHorizontal: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#000',
  },
  viewMore: {
    fontSize: 12,
    color: '#666',
  },
  productScroll: {
    paddingRight: 16,
  },
  productCard: {
    marginRight: 12,
    borderRadius: 8,
    backgroundColor: '#fff',
    overflow: 'hidden',
    width: 130,
  },
  productImage: {
    width: 130,
    height: 130,
    backgroundColor: '#E5E7EB',
  },
  productTitle: {
    fontSize: 12,
    fontWeight: '600',
    color: '#000',
    marginTop: 8,
    marginHorizontal: 8,
  },
  productPrice: {
    fontSize: 14,
    fontWeight: '700',
    color: '#000',
    marginHorizontal: 8,
    marginBottom: 8,
  },
});
