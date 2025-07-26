import { Tabs } from 'expo-router';
import React from 'react';
import HomeIcon from '~/components/icon/home';
import CartIcon from '~/components/icon/cart';
import SettingsIcon from '~/components/icon/settings';

const GuardedLayout = () => {
  return (
    <Tabs
      initialRouteName="index"
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#16a34a',
        tabBarInactiveTintColor: '#6b7280',
        tabBarStyle: {
          backgroundColor: 'white',
          borderTopWidth: 1,
          borderTopColor: '#e5e7eb',
          paddingBottom: 5,
          paddingTop: 5,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '500',
        },
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Products',
          tabBarIcon: ({ color }) => <HomeIcon fill={color} width={24} height={24} />,
        }}
      />

      <Tabs.Screen
        name="cart"
        options={{
          title: 'Cart',
          tabBarIcon: ({ color }) => <CartIcon fill={color} width={24} height={24} />,
        }}
      />

      <Tabs.Screen
        name="settings"
        options={{
          title: 'Settings',
          tabBarIcon: ({ color }) => <SettingsIcon fill={color} width={24} height={24} />,
        }}
      />

      <Tabs.Screen
        name="details"
        options={{
          href: null, // Hide this screen from tab bar
        }}
      />
    </Tabs>
  );
};

export default GuardedLayout;
