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

import { useTasksDatabase } from '../database/useTasksDatabase';

export default function Main() {
  const [tasks, setTasks] = useState([]);
  const [isDeleteConfirmModalVisible, setIsDeleteConfirmModalVIsible] = useState(false);
  const [isNewTaskModalVisible, setIsNewTaskModalVisible] = useState(false);
  const [isEditTaskModalVisible, setIsEditTaskModalVisible] = useState(false);
  const [taskIdBeingDelete, setTaskIdBeingDelete] = useState();
  const [taskBeingEdit, setTaskBeingEdit] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const database = useTasksDatabase();

  useEffect(() => {
    getTasks();
  }, []);

  async function getTasks() {
    setIsLoading(true);
    try {
      setTasks(await database.show());
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  function handleDeleteTask(id) {
    setTaskIdBeingDelete(id);
    setIsDeleteConfirmModalVIsible(true);
  }

  function handleConfirmDeleteTask() {
    database.remove(taskIdBeingDelete);
    getTasks();
    setIsDeleteConfirmModalVIsible(false);
  }

  function handleEditTask(task) {
    setTaskBeingEdit(task);
    setIsEditTaskModalVisible(true);
  }

  function handleChangeStatus(id) {
    database.updateStatus(id);
    getTasks();
  }

  function handleCreateTask(task) {
    database.create(task);
    getTasks();
    setIsNewTaskModalVisible(false);
  }

  function handleUpdateTask(task) {
    database.update(task);
    getTasks();
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