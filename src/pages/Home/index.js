import React, { useState, useCallback } from 'react' 
import { View, Text, TouchableOpacity, Alert } from 'react-native' 
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore' 
import database from '../../config/firebaseconfig' 
import { List, IconButton, Badge } from 'react-native-paper' 
import { useFocusEffect } from '@react-navigation/native' 

export default function Home({ navigation }) {
  const [tasks, setTasks] = useState([]) 

  useFocusEffect(
    useCallback(() => {
      fetchTasks() 
      return () => { } 
    }, [])
  ) 

  const fetchTasks = async () => {
    try {
      const tasksCollection = collection(database, 'Tasks') 
      const snapshot = await getDocs(tasksCollection) 

      const tasksData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) 

      setTasks(tasksData) 
    } catch (error) {
      console.error('Error getting tasks: ', error) 
    }
  } 

  const deleteTask = (id) => {
    const taskRef = doc(database, 'Tasks', id) 
    deleteDoc(taskRef)
      .then(() => {
        Alert.alert('Task excluída com sucesso!')
        fetchTasks()
      })
      .catch((error) => {
        Alert.alert('Erro ao concluir task: ' + error.message)
      })
  }

  const getTaskIcon = (type) => {
    switch (type) {
      case 1:
        return 'clipboard-text'
      case 2:
        return 'cart'
    }
  } 

  return (
    <View style={{ flex: 1 }}>
      <List.Section>
        {tasks.map((task) => (
          <List.Item
            key={task.id}
            title={task.title}
            description={task.description}
            left={() => <List.Icon icon={getTaskIcon(task.type)} />}
            onPress={() => navigation.navigate("Details", {
              id: task.id,
              title: task.title,
              description: task.description,
              type: task.type,
              status: task.status,
              createdAt: task.createdAt,
              finishedAt: task.finishedAt
            })}
            right={() => (
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                {task.status && (
                  <Badge
                    visible={task.status}
                    style={{ marginLeft: 10, color: "white", backgroundColor: "green", height: 20, }}
                  >
                    Concluída
                  </Badge>
                )}
                <IconButton
                  icon="delete"
                  size={20}
                  onPress={() => deleteTask(task.id)}
                />
              </View>
            )}
          />
        ))}
      </List.Section>

      <TouchableOpacity
        style={{
          width: 60,
          height: 60,
          position: "absolute",
          bottom: 30,
          left: 20,
          backgroundColor: "purple",
          borderRadius: 50,
          justifyContent: "center",
          alignItems: "center"
        }}
        onPress={() => navigation.navigate("NewTask")}
      >
        <Text style={{ color: 'white', fontSize: 20 }}>+</Text>
      </TouchableOpacity>
    </View>
  ) 
}
