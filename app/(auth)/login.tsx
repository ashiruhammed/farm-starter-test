import React, { useState } from 'react';
import { Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { useAuth } from '~/context/AuthContext';
import { Container } from '~/components/Container';
import { Text } from '~/components/ui/text';
import { Input } from '~/components/ui/input';
import { Button } from '~/components/ui/button';


export default function LoginScreen() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const router = useRouter();

  const handleLogin = async () => {
    setLoading(true);
    const success = await login(username, password);
    setLoading(false);
    if (success) {
      router.replace('/');
    } else {
      Alert.alert('Login Failed', 'Invalid username or password.');
    }
  };

  return (
    <Container>
      <Text className="text-2xl font-bold mb-8 text-center">Login</Text>
      <Input
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
        autoCapitalize="none"
        className="mb-4"
      />
      <Input
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        className="mb-6"
      />
      <Button onPress={handleLogin} disabled={loading}>
        <Text>{loading ? 'Logging in...' : 'Login'}</Text>
      </Button>
      <Text className="mt-6 text-center">
        Don't have an account?{' '}
        <Text className="text-primary font-semibold" onPress={() => router.push('/signup')}>
          Sign up
        </Text>
      </Text>
    </Container>
  );
} 