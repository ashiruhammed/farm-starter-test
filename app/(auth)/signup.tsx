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

export default function SignupScreen() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{ username?: string; password?: string } | null>(null);
  const { signup } = useAuth();
  const router = useRouter();

  const validate = () => {
    const errs: { username?: string; password?: string } = {};
    if (!username) errs.username = 'Username is required';
    if (!password) errs.password = 'Password is required';
    else if (password.length < 6) errs.password = 'Password must be at least 6 characters';
    return errs;
  };

  const handleSignup = async () => {
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;
    setLoading(true);
    const success = await signup(username, password);
    setLoading(false);
    if (success) {
      Alert.alert('Success', 'Account created!');
      router.replace('/');
    } else {
      setErrors({ username: 'Username already taken or error occurred' });
    }
  };

  return (
    <Container>
      <View className="flex-1 justify-center items-center">
        <Card className="w-full max-w-md p-6 bg-white/90 shadow-lg rounded-2xl">
          <CardHeader className="items-center mb-2">
            <CardTitle className="text-3xl font-bold mb-2">Create Account</CardTitle>
            <Text className="text-muted-foreground mb-4">Sign up to get started</Text>
          </CardHeader>
          <CardContent>
            <FormField
              label="Username"
              value={username}
              onChangeText={setUsername}
              placeholder="Choose a username"
              error={errors?.username}
            />
            <FormField
              label="Password"
              value={password}
              onChangeText={setPassword}
              placeholder="Create a password"
              secureTextEntry
              error={errors?.password}
            />
          </CardContent>
          <CardFooter className="flex-col gap-4">
            <Button onPress={handleSignup} disabled={loading} className="w-full bg-indigo-500">
              <Text className="text-white text-lg font-semibold">
                {loading ? 'Signing up...' : 'Sign Up'}
              </Text>
            </Button>
            <Text className="mt-2 text-center text-base">
              Already have an account?{' '}
              <Text className="text-indigo-600 font-semibold" onPress={() => router.push('/login')}>
                Login
              </Text>
            </Text>
          </CardFooter>
        </Card>
      </View>
    </Container>
  );
} 