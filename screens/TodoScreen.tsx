import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, ActivityIndicator, Image } from 'react-native';

export function TodoScreen() {
  const [todos, setTodos] = useState<any[]>([]);
  const [users, setUsers] = useState<{ [key: number]: any }>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('https://dummyjson.com/todos')
      .then(res => res.json())
      .then(data => {
        setTodos(data.todos);
        
        const uniqueUserIds: number[] = Array.from(new Set(data.todos.map((todo: any) => todo.userId)));
        
        Promise.all(
          uniqueUserIds.map((userId) =>
            fetch(`https://dummyjson.com/users/${userId}`)
              .then(res => res.json())
              .then(userData => ({ userId, userData }))
              .catch(() => ({ userId, userData: null }))
          )
        ).then(userResults => {
          const usersMap: { [key: number]: any } = {};
          userResults.forEach(({ userId, userData }) => {
            if (userData) {
              usersMap[userId] = userData;
            }
          });
          setUsers(usersMap);
          setLoading(false);
        });
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <View className="flex-1 items-center justify-center bg-gray-50">
        <ActivityIndicator size="large" color="#3b82f6" />
        <Text className="mt-4 text-gray-600 text-lg">Loading todos...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View className="flex-1 items-center justify-center bg-gray-50 p-6">
        <View className="bg-red-50 border border-red-200 rounded-lg p-6 items-center">
          <Text className="text-red-600 text-xl font-semibold mb-2">Error</Text>
          <Text className="text-red-500 text-center">{error}</Text>
        </View>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-gray-50">
      <FlatList
        data={todos}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={{ padding: 16 }}
        renderItem={({ item }) => {
          const user = users[item.userId];
          return (
            <View className="bg-white rounded-lg p-4 mb-3 shadow-sm border border-gray-200">
              <Text className="text-base font-medium text-gray-800 mb-3">
                {item.todo}
              </Text>
              <View className="flex-row items-center justify-between mb-3">
                <View
                  className={`px-3 py-1 rounded-full ${
                    item.completed
                      ? 'bg-green-100'
                      : 'bg-yellow-100'
                  }`}
                >
                  <Text
                    className={`text-xs font-semibold ${
                      item.completed
                        ? 'text-green-700'
                        : 'text-yellow-700'
                    }`}
                  >
                    {item.completed ? '✓ Completed' : '○ Not Completed'}
                  </Text>
                </View>
              </View>
              {user && (
                <View className="flex-row items-center mt-2 pt-3 border-t border-gray-100">
                  <Image
                    source={{ uri: user.image }}
                    className="w-8 h-8 rounded-full mr-2"
                  />
                  <Text className="text-sm text-gray-700 font-medium">
                    {user.firstName} {user.lastName}
                  </Text>
                </View>
              )}
            </View>
          );
        }}
        ListFooterComponent={() => (
          <Text className="text-sm text-gray-500 mt-1">{todos.length} items</Text>
        )}
      />
    </View>
  );
}
