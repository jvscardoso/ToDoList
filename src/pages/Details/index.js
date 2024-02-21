import React, { useState, useEffect } from 'react' 
import { View, Alert } from 'react-native' 
import { doc, updateDoc, deleteDoc } from 'firebase/firestore' 
import database from '../../config/firebaseconfig' 
import { Card, Title, Paragraph, IconButton, TextInput } from 'react-native-paper' 

const Details = ({ route, navigation }) => {
  const { id, title, description, type, status, createdAt, finishedAt } = route.params 
  const [task, setTask] = useState({ id, title, description, type, status, createdAt, finishedAt }) 
  const [isEditing, setIsEditing] = useState(false)

  useEffect(() => {

  }, [status]) 

  const toggleTaskStatus = async () => {
    try {
      const taskRef = doc(database, 'Tasks', id) 
      const newStatus = !task.status 
      await updateDoc(taskRef, { status: newStatus }) 
      setTask({ ...task, status: newStatus }) 
      Alert.alert(newStatus ? 'Task reaberta com sucesso!' : 'Task concluída com sucesso!') 
    } catch (error) {
      Alert.alert('Erro ao atualizar status da task: ' + error.message) 
    }
  } 

  const deleteTask = (id) => {
    const taskRef = doc(database, 'Tasks', id) 
    deleteDoc(taskRef)
      .then(() => {
        Alert.alert('Task excluída com sucesso!') 
        navigation.goBack() 
      })
      .catch((error) => {
        Alert.alert('Erro ao excluir task: ' + error.message) 
      }) 
  } 

  const handleEdit = () => {
    setIsEditing(true)
  }
  const handleSave = async () => {
    try {
      const taskRef = doc(database, 'Tasks', id) 
      await updateDoc(taskRef, { title: task.title, description: task.description })
      setIsEditing(false)
      Alert.alert('Task atualizada com sucesso!')
    } catch (error) {
      Alert.alert('Erro ao atualizar task: ' + error.message)
    }
  } 

  const handleCancel = () => {
    setIsEditing(false) 
  } 

  return (
    <View style={{ flex:   1, padding:   10 }}>
      <Card>
        <Card.Content>
          {isEditing ? (
            <>
              <TextInput
                label="Título"
                value={task.title}
                onChangeText={text => setTask({ ...task, title: text })}
              />
              <TextInput
                label="Descrição"
                value={task.description}
                onChangeText={text => setTask({ ...task, description: text })}
              />
              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <IconButton
                  icon="check"
                  color="green"
                  size={20}
                  onPress={handleSave}
                  style={{ marginTop:   10 }}
                />
                <IconButton
                  icon="close"
                  color="red"
                  size={20}
                  onPress={handleCancel}
                  style={{ marginTop:   10 }}
                />
              </View>
            </>
          ) : (
            <>
              <Title>{task.title}</Title>
              <Paragraph>{task.description}</Paragraph>
              <Paragraph>Tipo: {task.type ===   1 ? 'Tarefa' : 'Compra'}</Paragraph>
              <Paragraph>Status: {task.status ? 'Concluído' : 'Pendente'}</Paragraph>
              <Paragraph>Data de Cadastro: {new Date(task.createdAt).toLocaleString()}</Paragraph>
              {task.status && <Paragraph>Data de Término: {new Date(task.finishedAt).toLocaleString()}</Paragraph>}
              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <IconButton
                  icon={task.status ? "refresh" : "check"}
                  color={task.status ? "blue" : "green"}
                  size={20}
                  onPress={toggleTaskStatus}
                  style={{ marginTop:   10 }}
                />
                <IconButton
                  icon="pencil"
                  color="blue"
                  size={20}
                  onPress={handleEdit}
                  style={{ marginTop:   10 }}
                />
                <IconButton
                  icon="delete"
                  size={20}
                  onPress={() => deleteTask(task.id)}
                />
              </View>
            </>
          )}
        </Card.Content>
      </Card>
    </View>
  ) 
} 

export default Details 