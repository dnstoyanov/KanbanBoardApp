import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';

const Task = ({task, onEdit, onDelete, onChangeStatus}) => {
  const renderStatusBox = status => {
    const isActive = task.status === status;
    const backgroundColor = isActive ? '#4caf50' : '#e0e0e0';
    const textColor = isActive ? 'white' : 'black';

    return (
      <TouchableOpacity
        onPress={() => onChangeStatus(task.id, status)}
        style={[styles.statusBox, {backgroundColor}]}>
        <Text style={[styles.statusText, {color: textColor}]}>{status}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.taskContainer}>
      <View style={styles.taskDetails}>
        <Text style={styles.taskName}>{task.name}</Text>
        <Text>{task.description}</Text>
        <View style={styles.statusBoxes}>
          {renderStatusBox('new')}
          {renderStatusBox('in progress')}
          {renderStatusBox('completed')}
        </View>
      </View>
      <View style={styles.taskActions}>
        {task.status !== 'completed' && (
          <TouchableOpacity onPress={() => onEdit(task)}>
            <Text style={styles.actionText}>Edit</Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity onPress={() => onDelete(task.id)}>
          <Text style={styles.actionText}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  taskContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    alignItems: 'flex-start',
  },
  taskDetails: {
    flex: 1,
  },
  taskName: {
    fontWeight: 'bold',
  },
  statusBoxes: {
    flexDirection: 'row',
    marginTop: 10,
  },
  statusBox: {
    borderRadius: 4,
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginRight: 10,
  },
  statusText: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  taskActions: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginTop: 5,
  },
  actionText: {
    color: '#4287f5',
    marginRight: 10,
    fontWeight: 'bold',
  },
});

export default Task;
