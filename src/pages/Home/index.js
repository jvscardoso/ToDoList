import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { collection, getDocs, deleteDoc } from 'firebase/firestore';
import database from '../../config/firebaseconfig';
import styles from "./style";
import { FontAwesome } from "@expo/vector-icons";

export default function Home({ navigation }) {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const tasksCollection = collection(database, 'Tasks');
        const snapshot = await getDocs(tasksCollection);

        const tasksData = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));

        setTasks(tasksData);
      } catch (error) {
        console.error('Error getting tasks: ', error);
      }
    };

    fetchTasks();
  }, []);

  const deleteTask = (id) => {
      database.collection("Tasks").doc(id).delete().then(() => {
        console.log("Document successfully deleted!");
      }).catch((error) => {
        console.error("Error removing document: ", error);
      })
    }


  return (
      <View style={styles.container}>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={tasks}
          renderItem={({ item }) => (
            <View style={styles.Tasks}>
              <TouchableOpacity style={styles.deleteIcon} onPress={() => { deleteTask(item.id) }}>
                <FontAwesome name="trash" size={23} color="purple" />
                <Text style={styles.description} onPress={() => navigation.navigate("Details",
                  {
                    id: item.id,
                    description: item.description
                  })
                }>
                  {item.description}
                </Text>
              </TouchableOpacity>
            </View>
          )}
        />

        <TouchableOpacity style={styles.newTaskBtn} onPress={() => navigation.navigate("NewTask")}>
          <Text style={styles.iconButton}>+</Text>
        </TouchableOpacity>
      </View>
    );
  }
