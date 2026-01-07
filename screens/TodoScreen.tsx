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
      <View className="flex-1 items-center justify-center bg-indigo-50">
        <View className="items-center">
          <View className="bg-white rounded-2xl p-8 shadow-lg items-center" style={{
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.1,
            shadowRadius: 12,
            elevation: 8,
          }}>
            <ActivityIndicator size="large" color="#6366f1" />
            <Text className="mt-6 text-gray-700 text-lg font-semibold">Loading todos...</Text>
            <Text className="mt-2 text-gray-500 text-sm">Please wait a moment</Text>
          </View>
        </View>
      </View>
    );
  }

  if (error) {
    return (
      <View className="flex-1 items-center justify-center bg-red-50 p-6">
        <View className="bg-white border-2 border-red-200 rounded-2xl p-8 items-center shadow-lg" style={{
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.1,
          shadowRadius: 12,
          elevation: 8,
          maxWidth: 320,
        }}>
          <View className="bg-red-100 rounded-full w-16 h-16 items-center justify-center mb-4">
            <Text className="text-red-600 text-3xl font-bold">!</Text>
          </View>
          <Text className="text-red-600 text-2xl font-bold mb-3">Oops!</Text>
          <Text className="text-red-500 text-center text-base leading-6">{error}</Text>
        </View>
      </View>
    );
  }

  const completedCount = todos.filter(todo => todo.completed).length;
  const totalCount = todos.length;

  return (
    <View className="flex-1 bg-gray-50">
        <View className="bg-gray-600 rounded-full px-4 py-2 my-4 items-center justify-center align-middle mx-auto w-fit">
            <Text className="text-white font-bold text-sm">
            {completedCount} / {totalCount} Completed
            </Text>
        </View>
      <FlatList
        data={todos}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={{ padding: 20, paddingBottom: 40 }}
        showsVerticalScrollIndicator={false}
        renderItem={({ item, index }) => {
          const user = users[item.userId];
          return (
            <View 
              className={`bg-white rounded-2xl mb-4 overflow-hidden ${
                item.completed 
                  ? 'border-2 border-green-200' 
                  : 'border-2 border-amber-500'
              }`}
              
            >
              <View 
                className={`h-1 ${
                  item.completed 
                    ? 'bg-green-500' 
                    : 'bg-amber-500'
                }`}
              />

              <View className="p-5">
                <Text 
                  className={`text-lg font-semibold mb-4 leading-6 ${
                    item.completed 
                      ? 'text-gray-500 line-through' 
                      : 'text-gray-900'
                  }`}
                >
                  {item.todo}
                </Text>

                <View className="flex-row items-center justify-between">
                  <View
                    className="px-4 py-2 rounded-full"
                  >
                    <Text
                      className={`text-xs font-bold ${
                        item.completed
                          ? 'text-green-700'
                          : 'text-amber-700'
                      }`}
                    >
                      {item.completed ? '✓ Completed' : '◯ Not Completed'}
                    </Text>
                  </View>

                  {user && (
                    <View className="flex-row items-center bg-gray-50 rounded-full px-3 py-2 border border-gray-200">
                      <Image
                        source={{ uri: user.image }}
                        className="w-8 h-8 rounded-full mr-2 border-2 border-white shadow-sm"
                      />
                      <Text className="text-sm text-gray-700 font-semibold">
                        {user.firstName} {user.lastName}
                      </Text>
                    </View>
                  )}
                </View>
              </View>
            </View>
          );
        }}
        ListEmptyComponent={() => (
          <View className="items-center justify-center py-20">
            <View className="bg-white rounded-2xl p-8 items-center" style={{
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.1,
              shadowRadius: 12,
              elevation: 8,
            }}>
              <Text className="text-6xl mb-4">📝</Text>
              <Text className="text-gray-700 text-lg font-semibold">No todos found</Text>
            </View>
          </View>
        )}
        ListFooterComponent={() => (
          <View className="items-center mt-4 pt-6 border-t border-gray-200">
            <Text className="text-sm text-gray-500 font-medium">
              Showing {todos.length} {todos.length === 1 ? 'item' : 'items'}
            </Text>
          </View>
        )}
      />
    </View>
  );
}
