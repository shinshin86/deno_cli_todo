import { Task } from "./interface.ts";
const RESET_COLOR = "\x1b[0m";
const FONT_COLOR_RED = "\x1b[31m";
const FONT_COLOR_GREEN = "\x1b[32m";
const FONT_COLOR_CYAN = "\x1b[36m";

function displayTaskList(taskList: Array<Task>): void {
  for (const task of taskList) {
    if (task.isDelete) continue;

    const color = task.isDone ? FONT_COLOR_CYAN : FONT_COLOR_RED;
    // console.log({ task }); // debug
    console.log(
      color,
      `${task.id}: ${task.text} (Tag: ${task.tags || "-"})${
        task.isDone ? " - Done" : ""
      }`,
    );
  }

  console.log(RESET_COLOR);
}

export { displayTaskList };
