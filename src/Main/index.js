import { useState } from 'react';

import { Container } from './styles';

import AddTaskButton from '../components/AddTaskButton';
import DeleteConfirmModal from '../components/DeleteConfirmModal';
import Header from '../components/Header';
import NewTaskModal from '../components/NewTaskModal';
import Tasks from '../components/Tasks';

import EditTaskModal from '../components/EditTaskModal';
import { tasks } from '../mocks/tasks';

export default function Main() {
  const [isDeleteConfirmModalVisible, setIsDeleteConfirmModalVIsible] = useState(false);
  const [isNewTaskModalVisible, setIsNewTaskModalVisible] = useState(false);
  const [isEditTaskModalVisible, setIsEditTaskModalVisible] = useState(false);
  const [taskIdBeingDelete, setTaskIdBeingDelete] = useState();
  const [taskBeingEdit, setTaskBeingEdit] = useState();

  function handleDeleteTask(id) {
    setTaskIdBeingDelete(id);
    setIsDeleteConfirmModalVIsible(true);
  }

  function handleConfirmDeleteTask() {
    alert(`Exclua a tarefa de ID: ${taskIdBeingDelete}`);
    setIsDeleteConfirmModalVIsible(false);
  }

  function handleEditTask(task) {
    setTaskBeingEdit(task);
    setIsEditTaskModalVisible(true);
  }

  function handleChangeStatus(id) {
    alert(`Altere o status da tarefa de ID: ${id}`);
  }

  function handleCreateTask(task) {
    alert(`Cadastrar a tarefa: {title: ${task.title}, description: ${task.description}}`);
    setIsNewTaskModalVisible(false);
  }

  function handleUpdateTask(task) {
    alert(`Alterar a tarefa: {id: ${task.id}, title: ${task.title}, description: ${task.description}}`);
    setIsEditTaskModalVisible(false);
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