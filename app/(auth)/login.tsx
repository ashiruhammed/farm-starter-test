import React, { useState } from 'react';
import { router } from 'expo-router';
import { TouchableOpacity, View } from 'react-native';
import AppSafeAreaView from '~/components/custom/app-safe-area';
import BackButton from '~/components/custom/back-button';
import { Button } from '~/components/ui/button';
import { Input } from '~/components/ui/input';
import { Text } from '~/components/ui/text';
import { useAuth } from '~/context/AuthContext';

const LoginScreen = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { login } = useAuth();

  const handleLogin = async () => {
    if (!username || !password) {
      setError('Please fill in all fields');
      return;
    }

    setLoading(true);
    setError('');
    
    const success = await login(username, password);
    setLoading(false);
    
    if (success) {
      router.replace('/(guarded)');
    } else {
      setError('Invalid username or password');
    }
  };

  const isValid = username.length > 0 && password.length > 0;

  return (
    <AppSafeAreaView className="mt-4 px-4">
      <BackButton />
      <Text variant="bold" className="mt-4 text-3xl">
        Welcome back!
      </Text>
      <Text className="mt-2 max-w-[300px] text-sm text-gray-500">
        Sign in to your FarmStarter account to continue shopping
      </Text>
      
      <Input
        className="mt-6 rounded-full px-4 font-medium"
        placeholder="Enter username"
        value={username}
        onChangeText={(text) => {
          setUsername(text);
          setError('');
        }}
      />

      <Input
        className="mt-4 rounded-full px-4 font-medium"
        placeholder="Enter password"
        value={password}
        onChangeText={(text) => {
          setPassword(text);
          setError('');
        }}
        secureTextEntry
      />

      {error ? (
        <Text className="mt-2 text-red-500 text-sm">{error}</Text>
      ) : null}

      <TouchableOpacity className="mt-2 self-start">
        <Text variant="bold" className="text-farm-600 text-sm">
          Forgot password?
        </Text>
      </TouchableOpacity>

      <View className="mt-auto">
        <Button
          onPress={handleLogin}
          disabled={!isValid || loading}
          className={`rounded-full ${
            isValid && !loading
              ? 'bg-farm-600'
              : 'border border-gray-200 bg-gray-50'
          }`}>
          <Text
            variant="medium"
            className={isValid && !loading ? 'text-white' : 'text-gray-400'}>
            {loading ? 'Signing in...' : 'Sign in'}
          </Text>
        </Button>
        <Text className="mt-4 text-center text-sm text-gray-500">
          Don't have an account?{' '}
          <Text 
            variant="bold" 
            className="text-farm-600"
            onPress={() => router.push('/signup')}>
            Sign up
          </Text>
        </Text>
      </View>
    </AppSafeAreaView>
  );
};

export default LoginScreen; 