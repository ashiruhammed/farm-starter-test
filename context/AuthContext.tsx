import React, { createContext, useContext, useState } from 'react';
import * as FileSystem from 'expo-file-system';
import { Alert } from 'react-native';
import usersData from '~/assets/data/users.json';

interface User {
  id: number;
  username: string;
  password: string;
}

interface AuthContextType {
  user: User | null;
  login: (username: string, password: string) => Promise<boolean>;
  signup: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const USERS_FILE = FileSystem.documentDirectory + 'users.json';
const ASSET_USERS_FILE = FileSystem.bundleDirectory + 'assets/data/users.json';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

async function ensureUsersFile() {
  const exists = await FileSystem.getInfoAsync(USERS_FILE);
  if (!exists.exists) {
    await FileSystem.copyAsync({ from: ASSET_USERS_FILE, to: USERS_FILE });
  }
}

async function writeUsers(users: User[]) {
  await FileSystem.writeAsStringAsync(USERS_FILE, JSON.stringify(users, null, 2));
}

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = async (username: string, password: string) => {
    try {
      // Use direct import for reading users
      const users: User[] = usersData as User[];
      const found = users.find(u => u.username === username && u.password === password);
      if (found) {
        setUser(found);
        return true;
      }
      return false;
    } catch (e) {
      Alert.alert('Login Error', 'Could not read users.');
      return false;
    }
  };

  const signup = async (username: string, password: string) => {
    try {
      await ensureUsersFile();
      const data = await FileSystem.readAsStringAsync(USERS_FILE);
      const users: User[] = JSON.parse(data);
      if (users.find(u => u.username === username)) {
        return false; // Username taken
      }
      const newUser = { id: Date.now(), username, password };
      const updated = [...users, newUser];
      await writeUsers(updated);
      setUser(newUser);
      return true;
    } catch (e) {
      Alert.alert('Signup Error', 'Could not save user.');
      return false;
    }
  };

  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
}; 