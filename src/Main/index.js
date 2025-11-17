import { useEffect, useState } from 'react';

import { ActivityIndicator, Image } from 'react-native';

import { CenteredContainer, Container } from './styles';

import AddTaskButton from '../components/AddTaskButton';
import DeleteConfirmModal from '../components/DeleteConfirmModal';
import Header from '../components/Header';
import NewTaskModal from '../components/NewTaskModal';
import Tasks from '../components/Tasks';

import { Text } from '../components/Text';

import EditTaskModal from '../components/EditTaskModal';

import taskEmpty from '../assets/images/task.png';

import { api } from '../utils/api';

export default function Main() {
  const [tasks, setTasks] = useState([]);
  const [isDeleteConfirmModalVisible, setIsDeleteConfirmModalVIsible] = useState(false);
  const [isNewTaskModalVisible, setIsNewTaskModalVisible] = useState(false);
  const [isEditTaskModalVisible, setIsEditTaskModalVisible] = useState(false);
  const [taskIdBeingDelete, setTaskIdBeingDelete] = useState();
  const [taskBeingEdit, setTaskBeingEdit] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    api.get('/tasks').then((response) => {
      setTasks(response.data);
      setIsLoading(false);
    }).catch((error) => {
      console.log(error);
    });
  }, []);

  function handleDeleteTask(id) {
    setTaskIdBeingDelete(id);
    setIsDeleteConfirmModalVIsible(true);
  }

  async function handleConfirmDeleteTask() {
    await api.delete(`/tasks/${taskIdBeingDelete}`);
    setTasks((prevState) => prevState.filter(
      (task) => task.id !== taskIdBeingDelete
    ));
    setIsDeleteConfirmModalVIsible(false);
  }

  function handleEditTask(task) {
    setTaskBeingEdit(task);
    setIsEditTaskModalVisible(true);
  }

  async function handleChangeStatus(id) {
    const { data: taskUpdate } = await api.patch(`/tasks/status/${id}`);
    setTasks((prevState) => prevState.map(
      (taskItem) => taskItem.id === id ? taskUpdate : taskItem
    ));
  }

  async function handleCreateTask(task) {
    const { data: taskAdd } = await api.post('/tasks', task);
    setTasks((prevState) => [taskAdd, ...prevState]);
    setIsNewTaskModalVisible(false);
  }

  async function handleUpdateTask(task) {
    const { data: taskUpdate } = await api.put(`/tasks/${task.id}`, task);
    setTasks((prevState) => prevState.map(
      (taskItem) => taskItem.id === task.id ? taskUpdate : taskItem
    ));
    setIsEditTaskModalVisible(false);
  }

  return (
    <Container>
      <Header />

      {!isLoading && tasks.length > 0 && (
        <Tasks
          tasks={tasks}
          onDelete={handleDeleteTask}
          onEditTask={handleEditTask}
          onChangeStatus={handleChangeStatus}
        />
      )}

      {!isLoading && tasks.length === 0 && (
        <CenteredContainer>
          <Image source={taskEmpty} style={{ width: 200, height: 200, marginBottom: 12 }} />

          <Text weight="600" size={20} style={{ marginBottom: 8 }}>Sem tarefas</Text>

          <Text opacity={0.5}>Não há tarefas a serem visualizadas</Text>
        </CenteredContainer>
      )}

      {isLoading && (
        <CenteredContainer>
          <ActivityIndicator size='large' color="#666" />
        </CenteredContainer>
      )}


      <AddTaskButton onPress={() => setIsNewTaskModalVisible(true)} />

      <DeleteConfirmModal
        visible={isDeleteConfirmModalVisible}
        onClose={() => setIsDeleteConfirmModalVIsible(false)}
        onConfirm={handleConfirmDeleteTask}
      />

      <NewTaskModal
        visible={isNewTaskModalVisible}
        onClose={() => setIsNewTaskModalVisible(false)}
        onSave={handleCreateTask}
      />

      <EditTaskModal
        visible={isEditTaskModalVisible}
        onClose={() => setIsEditTaskModalVisible(false)}
        onSave={handleUpdateTask}
        task={taskBeingEdit}
      />

    </Container>
  );
}