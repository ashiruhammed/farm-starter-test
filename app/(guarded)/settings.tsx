import React from 'react';
import { Alert, ScrollView, TouchableOpacity, View } from 'react-native';
import { Container } from '~/components/Container';
import { Button } from '~/components/ui/button';
import { Text } from '~/components/ui/text';
import { useAuth } from '~/context/AuthContext';
import { LogOut, User, Shield, Bell, HelpCircle } from 'lucide-react-native';

export default function SettingsScreen() {
  const { logout } = useAuth();

  const handleLogout = () => {
    Alert.alert('Logout', 'Are you sure you want to logout?', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'Logout',
        style: 'destructive',
        onPress: logout,
      },
    ]);
  };

  const SettingItem = ({
    icon: Icon,
    title,
    subtitle,
    onPress,
  }: {
    icon: React.ComponentType<any>;
    title: string;
    subtitle?: string;
    onPress?: () => void;
  }) => (
    <TouchableOpacity
      onPress={onPress}
      className="flex-row items-center border-b border-gray-100 py-4">
      <View className="mr-4 h-10 w-10 items-center justify-center rounded-full bg-gray-100">
        <Icon size={20} color="#6b7280" />
      </View>
      <View className="flex-1">
        <Text variant="medium" className="text-base text-gray-900">
          {title}
        </Text>
        {subtitle && <Text className="text-sm text-gray-500">{subtitle}</Text>}
      </View>
    </TouchableOpacity>
  );

  return (
    <Container>
      <ScrollView className="flex-1">
        <View className="mb-6 px-4">
          <Text variant="bold" className="text-2xl text-gray-900">
            Settings
          </Text>
          <Text className="text-sm text-gray-600">Manage your account and preferences</Text>
        </View>

        <View className="mx-4 rounded-2xl bg-white shadow-sm">
          <SettingItem icon={User} title="Profile" subtitle="Edit your personal information" />
          <SettingItem
            icon={Shield}
            title="Privacy & Security"
            subtitle="Manage your privacy settings"
          />
          <SettingItem
            icon={Bell}
            title="Notifications"
            subtitle="Configure notification preferences"
          />
          <SettingItem
            icon={HelpCircle}
            title="Help & Support"
            subtitle="Get help and contact support"
          />
        </View>

        <View className="mt-8 px-4">
          <Button onPress={handleLogout} variant="outline" className="border-red-200 bg-red-50">
            <LogOut size={20} color="#dc2626" className="mr-2" />
            <Text className="text-red-600">Logout</Text>
          </Button>
        </View>
      </ScrollView>
    </Container>
  );
}
