import {firestore} from '../../firebase';

const tasksCollection = firestore().collection('tasks');

export const getTasks = callback => {
  return tasksCollection.onSnapshot(snapshot => {
    const tasks = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));
    callback(tasks);
  });
};

export const addTask = async task => {
  try {
    await tasksCollection.add({...task, status: 'new'});
    return {success: true};
  } catch (error) {
    return {success: false, error: error.message};
  }
};

export const updateTask = async (taskId, updatedTask) => {
  try {
    const taskDoc = await tasksCollection.doc(taskId).get();
    const taskData = taskDoc.data();

    if (taskData.status === 'completed') {
      return {success: false, error: 'Completed tasks cannot be edited.'};
    }

    await tasksCollection.doc(taskId).update(updatedTask);
    return {success: true};
  } catch (error) {
    return {success: false, error: error.message};
  }
};

export const deleteTask = async taskId => {
  try {
    await tasksCollection.doc(taskId).delete();
    return {success: true};
  } catch (error) {
    return {success: false, error: error.message};
  }
};

export const changeTaskStatus = async (taskId, newStatus) => {
  try {
    const taskDoc = await tasksCollection.doc(taskId).get();
    const taskData = taskDoc.data();

    if (taskData.status === 'completed') {
      return {
        success: false,
        error: 'Completed tasks cannot have their status changed.',
      };
    }

    if (taskData.status === 'new' && newStatus === 'in progress') {
      await tasksCollection.doc(taskId).update({status: 'in progress'});
    } else if (
      taskData.status === 'in progress' &&
      (newStatus === 'new' || newStatus === 'completed')
    ) {
      await tasksCollection.doc(taskId).update({status: newStatus});
    } else if (taskData.status === 'new' && newStatus === 'completed') {
      await tasksCollection.doc(taskId).update({status: 'completed'});
    } else {
      return {success: false, error: 'Invalid status change.'};
    }

    return {success: true};
  } catch (error) {
    return {success: false, error: error.message};
  }
};
