import React from 'react';
import { Alert, ScrollView, TouchableOpacity, View, Dimensions } from 'react-native';
import { router } from 'expo-router';
import { Container } from '~/components/Container';
import { Button } from '~/components/ui/button';
import { Text } from '~/components/ui/text';
import { useAuth } from '~/context/AuthContext';
import {
  LogOut,
  User,
  Shield,
  Bell,
  HelpCircle,
  ChevronRight,
  Settings as SettingsIcon,
} from 'lucide-react-native';

const { width } = Dimensions.get('window');

export default function SettingsScreen() {
  const { logout, user } = useAuth();

  const handleLogout = () => {
    Alert.alert('Sign Out', 'Are you sure you want to sign out of your account?', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'Sign Out',
        style: 'destructive',
        onPress: () => {
          logout();
          router.replace('/(auth)/login');
        },
      },
    ]);
  };

  const SettingItem = ({
    icon: Icon,
    title,
    subtitle,
    onPress,
    showChevron = true,
  }: {
    icon: React.ComponentType<any>;
    title: string;
    subtitle?: string;
    onPress?: () => void;
    showChevron?: boolean;
  }) => (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      className="flex-row items-center border-b border-gray-50 px-4 py-5">
      <View className="mr-4 h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-gray-50 to-gray-100">
        <Icon size={22} color="#4b5563" />
      </View>
      <View className="flex-1">
        <Text variant="medium" className="mb-1 text-base text-gray-900">
          {title}
        </Text>
        {subtitle && <Text className="text-sm leading-5 text-gray-500">{subtitle}</Text>}
      </View>
      {showChevron && <ChevronRight size={20} color="#9ca3af" />}
    </TouchableOpacity>
  );

  return (
    <Container>
      <ScrollView
        className="flex-1"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 40 }}>
        <View className="px-6 pb-8 pt-6">
          <View className="mb-6 flex-row items-center">
            <View className="mr-4 h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-green-50 to-green-100">
              <SettingsIcon size={28} color="#16a34a" />
            </View>
            <View className="flex-1">
              <Text variant="bold" className="mb-1 text-2xl text-gray-900">
                Settings
              </Text>
              <Text className="text-sm text-gray-600">Manage your account and preferences</Text>
            </View>
          </View>

          <View className="rounded-3xl border border-green-100 bg-gradient-to-r from-green-50 to-emerald-50 p-6">
            <View className="flex-row items-center">
              <View className="mr-4 h-16 w-16 items-center justify-center rounded-full bg-white shadow-sm">
                <Text className="text-2xl">👤</Text>
              </View>
              <View className="flex-1">
                <Text variant="bold" className="mb-1 text-lg text-gray-900">
                  {user?.username || 'User'}
                </Text>
                <Text className="text-sm text-gray-600">Account • Active</Text>
              </View>
            </View>
          </View>
        </View>

        <View className="space-y-6 px-6">
          <View>
            <Text
              variant="medium"
              className="mb-3 px-1 text-sm uppercase tracking-wider text-gray-500">
              Account
            </Text>
            <View className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
              <SettingItem
                icon={User}
                title="Profile"
                subtitle="Edit your personal information and preferences"
              />
              <SettingItem
                icon={Shield}
                title="Privacy & Security"
                subtitle="Manage your privacy settings and security"
              />
            </View>
          </View>

          <View className="mt-6">
            <Text
              variant="medium"
              className="mb-3 px-1 text-sm uppercase tracking-wider text-gray-500">
              App
            </Text>
            <View className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
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
          </View>

          <View className="pt-4">
            <View className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
              <TouchableOpacity
                onPress={handleLogout}
                activeOpacity={0.7}
                className="flex-row items-center px-4 py-5">
                <View className="mr-4 h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-red-50 to-red-100">
                  <LogOut size={22} color="#dc2626" />
                </View>
                <View className="flex-1">
                  <Text variant="medium" className="mb-1 text-base text-red-600">
                    Sign Out
                  </Text>
                  <Text className="text-sm text-gray-500">Sign out of your account</Text>
                </View>
                <ChevronRight size={20} color="#9ca3af" />
              </TouchableOpacity>
            </View>
          </View>

          <View className="pt-6">
            <View className="items-center">
              <Text className="text-center text-xs text-gray-400">Farm Fresh App v1.0.0</Text>
              <Text className="mt-1 text-center text-xs text-gray-400">
                Fresh from the farm to your table
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </Container>
  );
}
