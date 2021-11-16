import { Task } from "./interface.ts";

async function addTask(dataFilePath: string, text: string): Promise<Task> {
  const taskList: Array<Task> = await collectTask(dataFilePath);
  const latestTaskId = taskList.length ? taskList.slice().reverse()[0].id : 1;

  const id = latestTaskId + 1;

  const newTask: Task = {
    id,
    text,
    tags: "",
    createdAt: new Date(),
    completedAt: null,
    isDone: false,
    isDelete: false,
  };

  taskList.push(newTask);

  const saveData: any = { taskList };
  await saveJsonFile(dataFilePath, saveData);

  return newTask;
}

async function loadJsonFile(filePath: string): Promise<any> {
  try {
    const json: string = await Deno.readTextFile(filePath);
    return JSON.parse(json);
  } catch (err) {
    console.error("Load error");
    console.error(err);
  }
}

async function saveJsonFile(filePath: string, obj: any): Promise<void> {
  try {
    await Deno.writeTextFile(filePath, JSON.stringify(obj));
  } catch (err) {
    console.error("Save Error");
    console.error(err);
  }
}

async function collectTask(dataFilePath: string): Promise<Array<Task>> {
  const data = await loadJsonFile(dataFilePath);
  return data.taskList;
}

async function completeTask(
  dataFilePath: string,
  taskId: number,
): Promise<Task> {
  const data = await loadJsonFile(dataFilePath);
  const taskList: Array<Task> = data.taskList;

  const targetTask = taskList.find(({ id }) => id === taskId);
  const doneTask: Task = Object.assign(
    {},
    targetTask,
    { isDone: true, completedAt: new Date() },
  );

  const updatedTaskList: Array<Task> = taskList.reduce(
    (prev: Array<Task>, current: Task) => {
      if (current.id === taskId) {
        prev.push(doneTask);
      } else {
        prev.push(current);
      }

      return prev;
    },
    [],
  );

  await saveJsonFile(dataFilePath, { taskList: updatedTaskList });

  return doneTask;
}

async function editTaskName(
  dataFilePath: string,
  editTaskId: number,
  newTaskName: string,
): Promise<Task> {
  const data = await loadJsonFile(dataFilePath);
  const taskList: Array<Task> = data.taskList;

  const editTask: Task | undefined = taskList.find(({ id }) =>
    id === editTaskId
  );

  if (!editTask) {
    throw new Error("Edit task not found");
  }

  const updatedTaskList = taskList.reduce(
    (prev: Array<Task>, current: Task) => {
      if (current.id === editTaskId) {
        prev.push({
          ...editTask,
          text: newTaskName,
        });
      } else {
        prev.push(current);
      }

      return prev;
    },
    [],
  );

  await saveJsonFile(dataFilePath, { taskList: updatedTaskList });

  return editTask;
}

async function editTag(
  dataFilePath: string,
  editTaskId: number,
  newTag: string,
): Promise<Task> {
  const data = await loadJsonFile(dataFilePath);
  const taskList: Array<Task> = data.taskList;

  const editTask: Task | undefined = taskList.find(({ id }) =>
    id === editTaskId
  );

  if (!editTask) {
    throw new Error("Edit task not found");
  }

  const updatedTaskList = taskList.reduce(
    (prev: Array<Task>, current: Task) => {
      if (current.id === editTaskId) {
        prev.push({
          ...editTask,
          tags: newTag,
        });
      } else {
        prev.push(current);
      }

      return prev;
    },
    [],
  );

  await saveJsonFile(dataFilePath, { taskList: updatedTaskList });

  return editTask;
}

async function deleteTask(
  dataFilePath: string,
  deleteTaskId: number,
): Promise<Task> {
  const data = await loadJsonFile(dataFilePath);
  const taskList: Array<Task> = data.taskList;

  const deleteTask: Task | undefined = taskList.find(({ id }) =>
    id === deleteTaskId
  );

  if (!deleteTask) {
    throw new Error("Delete task not found");
  }

  const updatedTaskList = taskList.reduce(
    (prev: Array<Task>, current: Task) => {
      if (current.id === deleteTaskId) {
        prev.push({
          ...deleteTask,
          isDelete: true,
        });
      } else {
        prev.push(current);
      }

      return prev;
    },
    [],
  );

  await saveJsonFile(dataFilePath, { taskList: updatedTaskList });

  return deleteTask;
}

export {
  addTask,
  collectTask,
  completeTask,
  deleteTask,
  editTag,
  editTaskName,
};
