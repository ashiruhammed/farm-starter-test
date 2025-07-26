import React, { useState } from 'react';
import { Alert, View } from 'react-native';
import { useRouter } from 'expo-router';
import { Container } from '~/components/Container';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '~/components/ui/card';
import { Button } from '~/components/ui/button';
import { Text } from '~/components/ui/text';
import { useAuth } from '~/context/AuthContext';
import { FormField } from '~/components/ui/form-field';
import { User, Lock } from 'lucide-react-native';

export default function LoginScreen() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{ username?: string; password?: string }>({});
  const { login } = useAuth();
  const router = useRouter();

  const validate = () => {
    const errs: { username?: string; password?: string } = {};
    if (!username) errs.username = 'Username is required';
    if (!password) errs.password = 'Password is required';
    return errs;
  };

  const handleLogin = async () => {
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;
    setLoading(true);
    const success = await login(username, password);
    setLoading(false);
    if (success) {
      router.replace('/');
    } else {
      setErrors({ password: 'Invalid username or password' });
    }
  };

  return (
    <Container>
      <View className="flex-1 justify-center items-center">
        <Card className="w-full max-w-md p-6 bg-white/90 shadow-lg rounded-2xl">
          <CardHeader className="items-center mb-2">
            <CardTitle className="text-3xl font-bold mb-2">Welcome Back</CardTitle>
            <Text className="text-muted-foreground mb-4">Login to your account</Text>
          </CardHeader>
          <CardContent>
            <FormField
              label="Username"
              value={username}
              onChangeText={setUsername}
              placeholder="Enter your username"
              error={errors.username}
            />
            <FormField
              label="Password"
              value={password}
              onChangeText={setPassword}
              placeholder="Enter your password"
              secureTextEntry
              error={errors.password}
            />
          </CardContent>
          <CardFooter className="flex-col gap-4">
            <Button onPress={handleLogin} disabled={loading} className="w-full bg-indigo-500">
              <Text className="text-white text-lg font-semibold">
                {loading ? 'Logging in...' : 'Login'}
              </Text>
            </Button>
            <Text className="mt-2 text-center text-base">
              Don't have an account?{' '}
              <Text className="text-indigo-600 font-semibold" onPress={() => router.push('/signup')}>
                Sign up
              </Text>
            </Text>
          </CardFooter>
        </Card>
      </View>
    </Container>
  );
} 