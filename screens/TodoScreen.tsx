import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, ActivityIndicator } from 'react-native';

export function TodoScreen() {
  const [todos, setTodos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('https://dummyjson.com/todos')
      .then(res => res.json())
      .then(data => {
        setTodos(data.todos);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <View className="flex-1 items-center justify-center bg-white">
        <ActivityIndicator size="large" color="#3b82f6" />
        <Text className="mt-4 text-gray-600">Loading...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View className="flex-1 items-center justify-center bg-white p-4">
        <Text className="text-red-500 text-lg">Error: {error}</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-white p-4">
      <FlatList
        data={todos}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <View className="mb-4">
            <Text className="text-base mb-1">{item.todo}</Text>
            <Text className="text-sm text-gray-500 mb-1">
              {item.completed ? 'Completed' : 'Not Completed'}
            </Text>
            <Text className="text-sm text-gray-500">User ID: {item.userId}</Text>
          </View>
        )}
      />
    </View>
  );
}
