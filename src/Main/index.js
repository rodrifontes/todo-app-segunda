import { Container } from './styles';

import AddTaskButton from '../components/AddTaskButton';
import DeleteConfirmModal from '../components/DeleteConfirmModal';
import Header from '../components/Header';
import Tasks from '../components/Tasks';

import { tasks } from '../mocks/tasks';

export default function Main() {
  function handleDeleteTask(id) {
    alert(`Exclua a tarefa de ID: ${id}`);
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

      <DeleteConfirmModal />

    </Container>
  );
}