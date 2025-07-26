import React, { useEffect, useState } from 'react';
import { FlatList, View, ActivityIndicator, Alert } from 'react-native';
import * as FileSystem from 'expo-file-system';
// @ts-ignore: expo-location is available at runtime via Expo SDK
import * as Location from 'expo-location';
import { Container } from '../components/Container';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '../components/ui/card';
import { Avatar, AvatarImage } from '../components/ui/avatar';
import { Button } from '../components/ui/button';
import { Text } from '../components/ui/text';
import { useCart } from '../context/CartContext';

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
  const { addToCart } = useCart();

  useEffect(() => {
    // Load products from products.json
    const loadProducts = async () => {
      try {
        const fileUri = FileSystem.bundleDirectory + 'assets/data/products.json';
        const data = await FileSystem.readAsStringAsync(fileUri);
        setProducts(JSON.parse(data));
      } catch (e) {
        Alert.alert('Error', 'Could not load products.');
      } finally {
        setLoading(false);
      }
    };
    loadProducts();
  }, []);

  useEffect(() => {
    // Get device location
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
      <View className="mb-6">
        <Text className="text-lg font-semibold mb-2">Your Location:</Text>
        {locLoading ? (
          <ActivityIndicator size="small" />
        ) : location ? (
          <Text>
            Lat: {location.latitude.toFixed(5)}, Lng: {location.longitude.toFixed(5)}
          </Text>
        ) : (
          <Text>Location unavailable</Text>
        )}
      </View>
      <FlatList
        data={products}
        keyExtractor={item => item.id.toString()}
        numColumns={2}
        columnWrapperStyle={{ gap: 16 }}
        contentContainerStyle={{ gap: 16 }}
        renderItem={({ item }) => (
          <Card className="flex-1 m-1">
            <CardHeader className="items-center">
              <Avatar className="h-20 w-20 mb-2" alt={item.name}>
                <AvatarImage source={{ uri: item.image }} />
              </Avatar>
              <CardTitle className="text-center">{item.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <Text className="text-lg font-bold mb-2">${item.price.toFixed(2)}</Text>
              <Text className="text-sm text-muted-foreground mb-2">Stock: {item.stock}</Text>
            </CardContent>
            <CardFooter>
              <Button onPress={() => addToCart(item)} className="flex-1">
                <Text>Add to Cart</Text>
              </Button>
            </CardFooter>
          </Card>
        )}
      />
    </Container>
  );
} 