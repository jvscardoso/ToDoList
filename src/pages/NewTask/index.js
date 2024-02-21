import React, { useState } from 'react' 
import { View, Alert } from 'react-native' 
import { Picker } from '@react-native-picker/picker' 
import { collection, addDoc } from "firebase/firestore" 
import database from '../../config/firebaseconfig' 
import { TextInput as PaperTextInput, Button, Card, Title, Paragraph } from 'react-native-paper' 

const NewTask = ({ navigation }) => {
  const [title, setTitle] = useState('') 
  const [description, setDescription] = useState('') 
  const [type, setType] = useState(1) 
  const [quantity, setQuantity] = useState('') 

  const addTask = async () => {
    const taskData = {
      title,
      description,
      type,
      status: false,
      createdAt: new Date().toISOString(),
      finishedAt: null
    } 

    if (type === 2) {
      taskData.quantity = quantity 
    }

    try {
      const tasksCollectionRef = collection(database, 'Tasks') 
      const docRef = await addDoc(tasksCollectionRef, taskData) 
      Alert.alert('Task cadastrada com sucesso!') 
      console.log('Task enviada', taskData)
      setTimeout(() => {
        navigation.goBack() 
      }, 1500) 
    } catch (error) {
      Alert.alert('Erro ao concluir task: ' + error.message) 
    }
  } 

  return (
    <View style={{ flex: 1, padding: 10 }}>
      <Card>
        <Card.Content>
          <PaperTextInput
            label="Título"
            value={title}
            onChangeText={setTitle}
          />
          <PaperTextInput
            label="Descrição"
            value={description}
            onChangeText={setDescription}
          />
          <View>
            <Title>Tipo:</Title>
            <Picker
              selectedValue={type}
              onValueChange={(itemValue) => setType(Number(itemValue))}
            >
              <Picker.Item label="Tarefa" value="1" />
              <Picker.Item label="Compra" value="2" />
            </Picker>
          </View>
          {type === 2 && (
            <PaperTextInput
              label="Quantidade"
              value={quantity}
              onChangeText={setQuantity}
            />
          )}
          <Button
            mode="contained"
            onPress={addTask}
            style={{ marginTop: 10 }}
          >
            Adicionar
          </Button>
        </Card.Content>
      </Card>
    </View>
  ) 
}

export default NewTask 
