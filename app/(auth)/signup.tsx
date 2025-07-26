import React, { useState } from 'react';
import { Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { Container } from '~/components/Container';
import { Input } from '~/components/ui/input';
import { Button } from '~/components/ui/button';
import { Text } from '~/components/ui/text';
import { useAuth } from '~/context/AuthContext';

export default function SignupScreen() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { signup } = useAuth();
  const router = useRouter();

  const handleSignup = async () => {
    setLoading(true);
    const success = await signup(username, password);
    setLoading(false);
    if (success) {
      router.replace('/');
    } else {
      Alert.alert('Signup Failed', 'Username already taken or error occurred.');
    }
  };

  return (
    <Container>
      <Text className="text-2xl font-bold mb-8 text-center">Sign Up</Text>
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
      <Button onPress={handleSignup} disabled={loading}>
        <Text>{loading ? 'Signing up...' : 'Sign Up'}</Text>
      </Button>
      <Text className="mt-6 text-center">
        Already have an account?{' '}
        <Text className="text-primary font-semibold" onPress={() => router.push('/login')}>
          Login
        </Text>
      </Text>
    </Container>
  );
} 