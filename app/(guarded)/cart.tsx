import React from 'react';
import { FlatList, TouchableOpacity, View } from 'react-native';
import { Container } from '~/components/Container';
import { Button } from '~/components/ui/button';
import { Text } from '~/components/ui/text';
import { useCart } from '~/context/CartContext';
import { Trash2 } from 'lucide-react-native';

export default function CartScreen() {
  const { cart, removeFromCart, total } = useCart();

  const renderCartItem = ({ item }: { item: any }) => (
    <View className="mx-4 mb-4 rounded-2xl bg-white p-4 shadow-sm">
      <View className="flex-row items-center">
        <View className="mr-4 h-16 w-16 rounded-xl bg-gray-100" />
        <View className="flex-1">
          <Text variant="medium" className="text-base text-gray-900">
            {item.name}
          </Text>
          <Text className="text-sm text-gray-600">${item.price}</Text>
          <View className="mt-2 flex-row items-center">
            <Text className="text-base font-medium">Qty: {item.quantity}</Text>
            <TouchableOpacity
              onPress={() => removeFromCart(item.id)}
              className="ml-auto h-8 w-8 items-center justify-center rounded-full bg-red-100">
              <Trash2 size={16} color="#dc2626" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );

  if (cart.length === 0) {
    return (
      <Container>
        <View className="flex-1 items-center justify-center px-4">
          <View className="mb-6 h-24 w-24 items-center justify-center rounded-full bg-gray-100">
            <Text className="text-4xl">🛒</Text>
          </View>
          <Text variant="bold" className="mb-2 text-xl text-gray-900">
            Your cart is empty
          </Text>
          <Text className="text-center text-gray-600">Add some fresh products to get started</Text>
        </View>
      </Container>
    );
  }

  return (
    <Container>
      <View className="mb-6 px-4">
        <Text variant="bold" className="text-2xl text-gray-900">
          Shopping Cart
        </Text>
        <Text className="text-sm text-gray-600">
          {cart.length} item{cart.length !== 1 ? 's' : ''} in your cart
        </Text>
      </View>

      <FlatList
        data={cart}
        renderItem={renderCartItem}
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator={false}
        ListFooterComponent={
          <View className="mx-4 mt-6 rounded-2xl bg-white p-6 shadow-sm">
            <View className="mb-4 flex-row justify-between">
              <Text variant="medium" className="text-lg text-gray-900">
                Total
              </Text>
              <Text variant="bold" className="text-xl text-green-600">
                ${total.toFixed(2)}
              </Text>
            </View>
            <Button className="bg-green-600">
              <Text className="text-white">Proceed to Checkout</Text>
            </Button>
          </View>
        }
      />
    </Container>
  );
}
