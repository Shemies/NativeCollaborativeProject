import React, { useState, useEffect } from 'react';
import { View, Text, FlatList } from 'react-native';

export function TodoScreen() {
  const [todos, setTodos] = useState<any[]>([]);

  useEffect(() => {
    fetch('https://dummyjson.com/todos')
      .then(res => res.json())
      .then(data => setTodos(data.todos));
  }, []);

  return (
    <View className="flex-1 bg-white p-4">
      <FlatList
        data={todos}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <View>
            <Text className="text-base mb-2">{item.todo}</Text>
            <Text className="text-base mb-2">{item.completed ? 'Completed' : 'Not Completed'}</Text>
            <Text className="text-base mb-2">{item.userId}</Text>
          </View>
        )}
      />
    </View>
  );
}
