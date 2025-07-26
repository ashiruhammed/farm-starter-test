import React, { useEffect, useState } from 'react';
import { FlatList, View, ActivityIndicator, Alert, TouchableOpacity } from 'react-native';
// @ts-ignore: expo-location is available at runtime via Expo SDK
import * as Location from 'expo-location';
import { Container } from '~/components/Container';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '~/components/ui/card';
import { Avatar, AvatarImage } from '~/components/ui/avatar';
import { Button } from '~/components/ui/button';
import { Text } from '~/components/ui/text';
import { useCart } from '~/context/CartContext';
import { ShoppingCart, MapPin, Package, Star } from 'lucide-react-native';
import productsData from '~/assets/data/products.json';

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  stock: number;
}

export default function HomeScreen() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [location, setLocation] = useState<{ latitude: number; longitude: number } | null>(null);
  const [locLoading, setLocLoading] = useState(true);
  const [addingId, setAddingId] = useState<number | null>(null);
  const { addToCart } = useCart();

  useEffect(() => {
    setProducts(productsData as Product[]);
    setLoading(false);
  }, []);

  useEffect(() => {
    const getLocation = async () => {
      setLocLoading(true);
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission Denied', 'Location permission is required.');
        setLocLoading(false);
        return;
      }
      let loc = await Location.getCurrentPositionAsync({});
      setLocation({ latitude: loc.coords.latitude, longitude: loc.coords.longitude });
      setLocLoading(false);
    };
    getLocation();
  }, []);

  if (loading) {
    return (
      <Container>
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator size="large" className="mb-4" />
          <Text className="text-gray-500">Loading products...</Text>
        </View>
      </Container>
    );
  }

  return (
    <Container>
      {/* Header Section */}
      <View className="mb-6">
        <Text className="mb-2 text-2xl font-bold text-gray-900">Discover Products</Text>
        <Text className="text-sm text-gray-500">Find amazing products near you</Text>
      </View>

      {/* Location Card */}
      <View className="mb-6 rounded-2xl border border-blue-100 bg-gradient-to-r from-blue-50 to-indigo-50 p-4">
        <View className="flex-row items-center">
          <View className="mr-3 h-10 w-10 items-center justify-center rounded-full bg-blue-100">
            <MapPin size={20} color="#3b82f6" />
          </View>
          <View className="flex-1">
            <Text className="mb-1 text-sm font-medium text-gray-700">Your Location</Text>
            {locLoading ? (
              <View className="flex-row items-center">
                <ActivityIndicator size="small" color="#3b82f6" />
                <Text className="ml-2 text-xs text-gray-500">Getting location...</Text>
              </View>
            ) : location ? (
              <Text className="text-xs text-gray-600">
                {location.latitude.toFixed(4)}, {location.longitude.toFixed(4)}
              </Text>
            ) : (
              <Text className="text-xs text-gray-600">Location unavailable</Text>
            )}
          </View>
        </View>
      </View>

      {/* Products Grid */}
      <FlatList
        data={products}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        columnWrapperStyle={{ gap: 12 }}
        contentContainerStyle={{ gap: 12, paddingBottom: 40 }}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View className="flex-1 items-center justify-center py-20">
            <Package size={48} color="#d1d5db" className="mb-4" />
            <Text className="mb-2 text-center text-gray-500">No products found</Text>
            <Text className="text-center text-sm text-gray-400">
              Check back later for new arrivals
            </Text>
          </View>
        }
        renderItem={({ item }) => (
          <TouchableOpacity className="flex-1" activeOpacity={0.9}>
            <View className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
              {/* Product Image */}
              <View className="relative">
                <View className="h-40 w-full bg-gray-50">
                  <Avatar className="h-full w-full rounded-none" alt={item.name}>
                    <AvatarImage source={{ uri: item.image }} style={{ resizeMode: 'cover' }} />
                  </Avatar>
                </View>

                {/* Stock Badge */}
                <View className="absolute right-3 top-3">
                  {item.stock === 0 ? (
                    <View className="rounded-full bg-red-500 px-2 py-1">
                      <Text className="text-xs font-medium text-white">Out of Stock</Text>
                    </View>
                  ) : item.stock < 5 ? (
                    <View className="rounded-full bg-orange-500 px-2 py-1">
                      <Text className="text-xs font-medium text-white">Low Stock</Text>
                    </View>
                  ) : (
                    <View className="rounded-full bg-green-500 px-2 py-1">
                      <Text className="text-xs font-medium text-white">In Stock</Text>
                    </View>
                  )}
                </View>

                {/* Rating Badge */}
                <View className="absolute left-3 top-3 flex-row items-center rounded-full bg-white/90 px-2 py-1 backdrop-blur-sm">
                  <Star size={12} color="#fbbf24" fill="#fbbf24" />
                  <Text className="ml-1 text-xs font-medium text-gray-700">4.8</Text>
                </View>
              </View>

              {/* Product Info */}
              <View className="p-4">
                <Text
                  className="mb-2 line-clamp-2 text-sm font-semibold text-gray-900"
                  numberOfLines={2}>
                  {item.name}
                </Text>

                <View className="mb-3 flex-row items-center justify-between">
                  <Text className="text-lg font-bold text-gray-900">${item.price.toFixed(2)}</Text>
                  <Text className="text-xs text-gray-500">{item.stock} left</Text>
                </View>

                {/* Add to Cart Button */}
                <Button
                  onPress={async () => {
                    setAddingId(item.id);
                    await new Promise((res) => setTimeout(res, 400));
                    addToCart(item);
                    setAddingId(null);
                  }}
                  disabled={item.stock === 0 || addingId === item.id}
                  className={`w-full rounded-xl py-3 ${
                    item.stock === 0
                      ? 'bg-gray-100'
                      : 'bg-gradient-to-r from-blue-500 to-indigo-600'
                  }`}>
                  {addingId === item.id ? (
                    <View className="flex-row items-center justify-center">
                      <ActivityIndicator size="small" color="#fff" />
                      <Text className="ml-2 font-medium text-white">Adding...</Text>
                    </View>
                  ) : (
                    <View className="flex-row items-center justify-center">
                      <ShoppingCart size={16} color="#fff" />
                      <Text className="ml-2 font-medium text-white">
                        {item.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
                      </Text>
                    </View>
                  )}
                </Button>
              </View>
            </View>
          </TouchableOpacity>
        )}
      />
    </Container>
  );
}
