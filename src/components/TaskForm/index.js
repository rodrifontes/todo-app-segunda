import { useState } from "react";

import { Form, Input } from "./styles";

import Button from "../Button";

export default function TaskForm({ onSave, buttonLabel, task }) {
  const [id] = useState(task?.id);
  const [title, setTitle] = useState(task?.title ?? '');
  const [description, setDescription] = useState(task?.description ?? '');

  return (
    <Form>
      <Input
        placeholder="Título"
        value={title}
        onChangeText={setTitle}
      />
      <Input
        placeholder="Descrição"
        value={description}
        onChangeText={setDescription}
      />

      <Button
        onPress={() => onSave({ id, title, description })}
        disabled={title.lenght === 0 || description.length === 0}
      >
        {buttonLabel}
      </Button>
    </Form>
  );
}