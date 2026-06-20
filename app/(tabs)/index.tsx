import Ionicons from '@expo/vector-icons/Ionicons';
import { useState } from 'react';
import {
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';

export default function HomeScreen() {
  const [search, setSearch] = useState('');

  return (
    <View style={styles.container}>
          {/* Search Bar */}
          <View style={styles.searchWrapper}>
            <View style={styles.searchBarContainer}>
              <Ionicons name="search" size={20} color="#6B7280" />
              <TextInput
                style={[styles.searchInput, { fontSize: 15 }]}
                placeholder="Search items..."
                placeholderTextColor="#9CA3AF"
                value={search}
                onChangeText={setSearch}
                autoCapitalize="none"
                autoCorrect={false}
              />
              {search.length > 0 && (
                <TouchableOpacity onPress={() => setSearch('')} style={styles.clearButton}>
                  <Ionicons name="close" size={10} color="#9CA3AF" />
                </TouchableOpacity>
                
              )}
            </View>
          </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    backgroundColor: '#fff', 
    paddingTop: 10 ,
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
});
