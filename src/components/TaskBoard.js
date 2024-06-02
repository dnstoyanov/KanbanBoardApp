import React from 'react';
import {View, Text} from 'react-native';
import Task from './Task';

const TaskBoard = ({tasks, onEdit, onDelete}) => (
  <View>
    {tasks.map(task => (
      <Task key={task.id} task={task} onEdit={onEdit} onDelete={onDelete} />
    ))}
  </View>
);

export default TaskBoard;
