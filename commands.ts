import {
  addTask,
  collectTask,
  completeTask,
  deleteTask,
  editTag,
  editTaskName,
} from "./task.ts";
import { displayTaskList } from "./display.ts";

async function add(dataFilePath: string, newTask: string): Promise<void> {
  const addedTask = await addTask(dataFilePath, newTask);
  console.log("Add new task: ", addedTask.text);

  const taskList = await collectTask(dataFilePath);
  displayTaskList(taskList);
}

async function list(dataFilePath: string): Promise<void> {
  const taskList = await collectTask(dataFilePath);
  displayTaskList(taskList);
}

async function done(dataFilePath: string, doneTaskId: number): Promise<void> {
  if (isNaN(doneTaskId)) {
    console.log("ERROR: The doneTaskId must be a number.");
    Deno.exit(1);
  }

  const doneTask = await completeTask(dataFilePath, doneTaskId);
  console.log("Done Task: ", doneTask.text);

  const taskList = await collectTask(dataFilePath);
  displayTaskList(taskList);
}

async function edit(
  dataFilePath: string,
  editTaskId: number,
  newTaskName: string,
): Promise<void> {
  if (isNaN(editTaskId)) {
    console.log("ERROR: The editTaskId must be a number.");
    Deno.exit(1);
  }

  if (!newTaskName) {
    console.log("ERROR: The newTaskName must be a string.");
    Deno.exit(1);
  }

  const editTask = await editTaskName(dataFilePath, editTaskId, newTaskName);
  console.log("Edit Task: ", editTask.text);

  const taskList = await collectTask(dataFilePath);
  displayTaskList(taskList);
}

async function edittag(
  dataFilePath: string,
  editTaskId: number,
  newTagName: string,
): Promise<void> {
  if (isNaN(editTaskId)) {
    console.log("ERROR: The editTaskId must be a number.");
    Deno.exit(1);
  }

  if (!newTagName) {
    console.log("ERROR: The newTagName must be a string.");
    Deno.exit(1);
  }

  const editTask = await editTag(dataFilePath, editTaskId, newTagName);
  console.log("Edit Task: ", editTask.text);
  console.log("Edit Tag: ", editTask.tags);

  const taskList = await collectTask(dataFilePath);
  displayTaskList(taskList);
}

async function del(
  dataFilePath: string,
  deleteTaskId: number,
): Promise<void> {
  if (isNaN(deleteTaskId)) {
    console.log("ERROR: The deleteTaskId must be a number.");
    Deno.exit(1);
  }

  const deletedTask = await deleteTask(dataFilePath, deleteTaskId);
  console.log("Deleted Task: ", deletedTask.text);

  const taskList = await collectTask(dataFilePath);
  displayTaskList(taskList);
}

export { add, del, done, edit, edittag, list };
