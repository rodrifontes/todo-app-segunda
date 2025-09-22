import { Text } from "../Text";

import { Task, TaskAction, TaskDescription, TaskFooter, TaskHeader, TaskIcon, TaskStatus } from './styles';

import { TouchableOpacity } from "react-native";
import remove from '../../assets/images/delete.png';
import edit from '../../assets/images/edit.png';
import pending from '../../assets/images/pending.png';

export default function Tasks({ tasks }) {
  return (
    tasks.map((task) => (
      <Task>
        <TaskHeader>
          <Text size={18} weight={600}>{task.title}</Text>
        </TaskHeader>
        <TaskDescription>
          <Text opacity={0.5}>{task.description}</Text>
        </TaskDescription>
        <TaskFooter>
          <TaskStatus onPress={() => alert('Alterar status da tarefa')}>
            <TaskIcon source={pending} />
            <Text color="#E620AE">Pendente</Text>
          </TaskStatus>

          <TaskAction>
            <TouchableOpacity
              onPress={() => alert('Editar Tarefa')}
            >
              <TaskIcon source={edit} />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => alert('Excluir Tarefa')}
            >
              <TaskIcon source={remove} />
            </TouchableOpacity>
          </TaskAction>
        </TaskFooter>
      </Task>
    ))
  );
}