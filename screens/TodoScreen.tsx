import React from 'react';
import { View, Text, ScrollView } from 'react-native';

export function TodoScreen() {
  return (
    <ScrollView 
      className="flex-1 bg-white"
      contentContainerStyle={{ padding: 24 }}
    >
      <View className="items-center justify-center">
        <Text className="text-2xl font-bold mb-4 text-gray-800">Todo Screen</Text>
        <Text className="text-base text-gray-600 text-center">
          This is the Todo screen.
        </Text>
      </View>
    </ScrollView>
  );
}
