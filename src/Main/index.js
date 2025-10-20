import { useState } from 'react';

import { Container } from './styles';

import AddTaskButton from '../components/AddTaskButton';
import DeleteConfirmModal from '../components/DeleteConfirmModal';
import Header from '../components/Header';
import Tasks from '../components/Tasks';

import { tasks } from '../mocks/tasks';

export default function Main() {
  const [isDeleteConfirmModalVisible, setIsDeleteConfirmModalVIsible] = useState(false);
  const [taskIdBeingDelete, setTaskIdBeingDelete] = useState();

  function handleDeleteTask(id) {
    setTaskIdBeingDelete(id);
    setIsDeleteConfirmModalVIsible(true);
  }

  function handleConfirmDeleteTask() {
    alert(`Exclua a tarefa de ID: ${taskIdBeingDelete}`);
    setIsDeleteConfirmModalVIsible(false);
  }

  function handleEditTask(task) {
    alert(`Altere a tarefa de ID: ${task.id}`);
  }

  function handleChangeStatus(id) {
    alert(`Altere o status da tarefa de ID: ${id}`);
  }

  return (
    <Container>
      <Header />

      <Tasks
        tasks={tasks}
        onDelete={handleDeleteTask}
        onEditTask={handleEditTask}
        onChangeStatus={handleChangeStatus}
      />

      <AddTaskButton onPress={() => alert('Disparar cadastro')} />

      <DeleteConfirmModal
        visible={isDeleteConfirmModalVisible}
        onClose={() => setIsDeleteConfirmModalVIsible(false)}
        onConfirm={handleConfirmDeleteTask}
      />

    </Container>
  );
}