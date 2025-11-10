import { useSQLiteContext } from "expo-sqlite";

export function useTasksDatabase() {
  const database = useSQLiteContext();

  async function show() {
    const query = "SELECT * FROM tasks ORDER BY create_date desc";

    try {
      const reponse = await database.getAllAsync(query);

      return reponse;
    } catch (error) {
      throw error;
    }
  }

  async function create(task) {
    const query = "INSERT INTO tasks (title, description) VALUES ($title, $description);";

    try {
      const statement = await database.prepareAsync(query);

      await statement.executeAsync({
        $title: task.title,
        $description: task.description
      });
    } catch (error) {
      throw error;
    } finally {
      await statement.finalizeAsync();
    }
  }

  async function update(task) {
    const query = "UPDATE tasks SET title = $title, description = $description WHERE id = $id";

    try {
      const statement = await database.prepareAsync(query);

      await statement.executeAsync({
        $id: task.id,
        $title: task.title,
        $description: task.description
      });
    } catch (error) {
      throw error;
    } finally {
      await statement.finalizeAsync();
    }
  }

  async function remove(id) {
    const query = `DELETE FROM tasks WHERE id = ${id}`;
    try {
      await database.execAsync(query);
    } catch (error) {
      throw error;
    }
  }

  async function updateStatus(id) {
    const query = `UPDATE tasks SET done = not done WHERE id = ${id}`;
    try {
      await database.execAsync(query);
    } catch (error) {
      throw error;
    }
  }

  return { show, create, update, updateStatus, remove };
}