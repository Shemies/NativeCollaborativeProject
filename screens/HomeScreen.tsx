import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation';

type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;

export function HomeScreen() {
  const navigation = useNavigation<HomeScreenNavigationProp>();

  return (
    <View className="flex-1 items-center justify-center bg-white px-6">
      <Text className="text-3xl font-bold mb-4 text-gray-800">Welcome</Text>
      <Text className="text-base text-gray-600 text-center mb-8">
        This is the home screen
      </Text>
      <TouchableOpacity
        onPress={() => navigation.navigate('Todo')}
        className="bg-blue-500 px-6 py-3 rounded-lg shadow-md active:bg-blue-600"
      >
        <Text className="text-white text-lg font-semibold">Todo Screen</Text>
      </TouchableOpacity>
    </View>
  );
}
