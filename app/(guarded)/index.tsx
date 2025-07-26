import React, { useEffect, useState } from 'react';
import { FlatList, View, ActivityIndicator, Alert } from 'react-native';
// @ts-ignore: expo-location is available at runtime via Expo SDK
import * as Location from 'expo-location';
import { Container } from '~/components/Container';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '~/components/ui/card';
import { Avatar, AvatarImage } from '~/components/ui/avatar';
import { Button } from '~/components/ui/button';
import { Text } from '~/components/ui/text';
import { useCart } from '~/context/CartContext';
import { ShoppingCart, MapPin } from 'lucide-react-native';
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
        <ActivityIndicator size="large" className="mt-20" />
      </Container>
    );
  }

  return (
    <Container>
      <Text className="text-3xl font-extrabold mb-6 text-indigo-800 text-center tracking-tight">Shop Products</Text>
      <View className="mb-6 flex-row items-center bg-white/95 rounded-2xl px-5 py-3 shadow-lg border border-indigo-100">
        <MapPin size={22} color="#6366f1" className="mr-2" />
        <View>
          <Text className="text-base font-semibold mb-0.5 text-gray-800">Your Location</Text>
          {locLoading ? (
            <ActivityIndicator size="small" />
          ) : location ? (
            <Text className="text-sm text-gray-600">
              Lat: {location.latitude.toFixed(5)}, Lng: {location.longitude.toFixed(5)}
            </Text>
          ) : (
            <Text className="text-sm text-gray-600">Location unavailable</Text>
          )}
        </View>
      </View>
      <FlatList
        data={products}
        keyExtractor={item => item.id.toString()}
        numColumns={2}
        columnWrapperStyle={{ gap: 20 }}
        contentContainerStyle={{ gap: 20, paddingBottom: 40, paddingHorizontal: 2 }}
        ListEmptyComponent={
          <View className="items-center mt-16">
            <Text className="text-center text-lg text-gray-500 mb-2">No products found.</Text>
            <MapPin size={40} color="#c7d2fe" />
          </View>
        }
        renderItem={({ item }) => (
          <Card className="flex-1 m-1 bg-white shadow-xl rounded-3xl border border-indigo-100 p-2 transition-all active:scale-95">
            <CardHeader className="items-center pb-1 pt-4">
              <View className="bg-white rounded-2xl shadow-md border border-gray-100 mb-2 p-1">
                <Avatar className="h-24 w-24" alt={item.name}>
                  <AvatarImage source={{ uri: item.image }} style={{ resizeMode: 'contain' }} />
                </Avatar>
              </View>
              <CardTitle className="text-center text-lg font-bold mb-1 text-gray-900 tracking-tight">{item.name}</CardTitle>
            </CardHeader>
            <CardContent className="items-center pb-2">
              <View className="flex-row items-center gap-2 mb-2">
                <Text className="text-base font-semibold px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-100">
                  ${item.price.toFixed(2)}
                </Text>
                {item.stock === 0 ? (
                  <Text className="text-xs px-3 py-1 rounded-full bg-red-50 text-red-600 border border-red-100">Out of Stock</Text>
                ) : (
                  <Text className="text-xs px-3 py-1 rounded-full bg-green-50 text-green-700 border border-green-100">In Stock: {item.stock}</Text>
                )}
              </View>
            </CardContent>
            <CardFooter className="justify-center pb-4 pt-1">
              <Button
                onPress={async () => {
                  setAddingId(item.id);
                  await new Promise(res => setTimeout(res, 400));
                  addToCart(item);
                  setAddingId(null);
                }}
                disabled={item.stock === 0 || addingId === item.id}
                className={`flex-1 flex-row items-center justify-center bg-gradient-to-r from-indigo-500 to-indigo-600 shadow-md rounded-full px-4 py-2 ${item.stock === 0 ? 'opacity-50' : ''}`}
                style={{ minHeight: 44 }}
              >
                {addingId === item.id ? (
                  <ActivityIndicator size="small" color="#fff" className="mr-2" />
                ) : (
                  <ShoppingCart size={18} color="#fff" className="mr-2" />
                )}
                <Text className="text-white font-semibold text-base">
                  {addingId === item.id ? 'Adding...' : 'Add to Cart'}
                </Text>
              </Button>
            </CardFooter>
          </Card>
        )}
      />
    </Container>
  );
} 