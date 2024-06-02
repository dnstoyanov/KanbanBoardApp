import React, {useEffect, useState} from 'react';
import {
  View,
  Button,
  TextInput,
  FlatList,
  Text,
  Modal,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import Task from '../components/Task';
import {
  getTasks,
  addTask,
  updateTask,
  deleteTask,
  changeTaskStatus,
} from '../services/FirestoreService';

const BoardScreen = () => {
  const [tasks, setTasks] = useState([]);
  const [currentTask, setCurrentTask] = useState({name: '', description: ''});
  const [modalVisible, setModalVisible] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const unsubscribe = getTasks(setTasks);
    return () => unsubscribe();
  }, []);

  const handleAddOrEditTask = async () => {
    if (currentTask.name && currentTask.description) {
      if (isEditing) {
        await updateTask(currentTask.id, currentTask);
      } else {
        await addTask(currentTask);
      }
      setCurrentTask({name: '', description: ''});
      setModalVisible(false);
      setIsEditing(false);
    }
  };

  const openAddModal = () => {
    setCurrentTask({name: '', description: ''});
    setIsEditing(false);
    setModalVisible(true);
  };

  const openEditModal = task => {
    setCurrentTask(task);
    setIsEditing(true);
    setModalVisible(true);
  };

  const handleDeleteTask = async taskId => {
    await deleteTask(taskId);
  };

  const handleChangeStatus = async (taskId, newStatus) => {
    await changeTaskStatus(taskId, newStatus);
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.container}>
        <Button title="Add Task" onPress={openAddModal} />
        <FlatList
          data={tasks}
          keyExtractor={item => item.id}
          renderItem={({item}) => (
            <Task
              task={item}
              onEdit={openEditModal}
              onDelete={handleDeleteTask}
              onChangeStatus={handleChangeStatus}
            />
          )}
        />
        <Modal
          visible={modalVisible}
          transparent={true}
          animationType="slide"
          onRequestClose={() => {
            setModalVisible(false);
            setIsEditing(false);
            setCurrentTask({name: '', description: ''});
          }}>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.modalContainer}>
              <View style={styles.modalView}>
                <TextInput
                  placeholder="Task Name"
                  value={currentTask.name}
                  onChangeText={text =>
                    setCurrentTask({...currentTask, name: text})
                  }
                  style={styles.input}
                />
                <TextInput
                  placeholder="Task Description"
                  value={currentTask.description}
                  onChangeText={text =>
                    setCurrentTask({...currentTask, description: text})
                  }
                  style={styles.input}
                />
                <View style={styles.buttonRow}>
                  <Button
                    title={isEditing ? 'Save Changes' : 'Add Task'}
                    onPress={handleAddOrEditTask}
                  />
                  <Button
                    title="Cancel"
                    onPress={() => {
                      setModalVisible(false);
                      setIsEditing(false);
                      setCurrentTask({name: '', description: ''});
                    }}
                  />
                </View>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </Modal>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalView: {
    width: 300,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    padding: 8,
    borderRadius: 4,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default BoardScreen;
