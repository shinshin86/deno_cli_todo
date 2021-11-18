import { Task } from "./interface.ts";
const RESET_COLOR = "\x1b[0m";
const FONT_COLOR_RED = "\x1b[31m";
const FONT_COLOR_GREEN = "\x1b[32m";
const FONT_COLOR_CYAN = "\x1b[36m";
const TABLE_CHARS = {
  topMid: "┬",
  topLeft: "┌",
  topRight: "┐",
  bottomMid: "┴",
  bottomLeft: "└",
  bottomRight: "┘",
  midMid: "┼",
  leftMid: "├",
  rightMid: "┤",
  horizontalLine: "─",
  verticalLine: "│",
};

const MARGIN = 10;

function getChars(width: number, str: string): string {
  return Array.from(Array(width), () => str).join("");
}

function getWidth(width: number, margin: number): number {
  return (margin * 2) + width;
}

function getTableContent(
  taskItem: string,
  taskKey: string,
  taskDisplaySize: number,
): string {
  const margin = getChars(MARGIN, " ");

  if (`${margin}${taskItem}`.length < taskDisplaySize) {
    const startMargin: number = taskItem.length - taskKey.length;
    const endMargin: number = MARGIN + startMargin;
    const startMarginChars: string = getChars(
      startMargin > 0 ? startMargin : MARGIN,
      " ",
    );
    const endMarginChars: string = getChars(
      endMargin > 0 ? endMargin : MARGIN,
      " ",
    );

    const tableStr = `${startMarginChars}${taskItem}${endMarginChars}`;
    return tableStr.length < taskDisplaySize
      ? tableStr.padEnd(taskDisplaySize, " ")
      : tableStr.substring(0, taskDisplaySize);
  } else {
    return ` ${taskItem}`.substring(0, taskDisplaySize - 4) + "... ";
  }
}

function createTableHeader(task: Task): string {
  let result: string = "";

  const keyList: Array<string> = Object.keys(task);
  const margin = getChars(MARGIN, " ");

  // row1
  keyList.forEach((key, index) => {
    if (index === 0) {
      result += TABLE_CHARS.topLeft;
      result += getChars(
        getWidth(key.length, MARGIN),
        TABLE_CHARS.horizontalLine,
      );
      result += TABLE_CHARS.topMid;
    } else if (keyList.length - 1 === index) {
      result += getChars(
        getWidth(key.length, MARGIN),
        TABLE_CHARS.horizontalLine,
      );
      result += TABLE_CHARS.topRight;
    } else {
      result += getChars(
        getWidth(key.length, MARGIN),
        TABLE_CHARS.horizontalLine,
      );
      result += TABLE_CHARS.topMid;
    }
  });

  result += "\n";

  // row2
  keyList.forEach((key, index) => {
    if (index === 0) {
      result += TABLE_CHARS.verticalLine;
      result += `${margin}${key}${margin}`;
      result += TABLE_CHARS.verticalLine;
    } else if (keyList.length - 1 === index) {
      result += `${margin}${key}${margin}`;
      result += TABLE_CHARS.verticalLine;
    } else {
      result += `${margin}${key}${margin}`;
      result += TABLE_CHARS.verticalLine;
    }
  });

  result += "\n";

  return result;
}

function addTable(task: Task): string {
  let result: string = "";
  const margin = getChars(MARGIN, " ");

  const keyList = Object.keys(task);

  // row1
  keyList.forEach((key, index) => {
    if (index === 0) {
      result += TABLE_CHARS.leftMid;
      result += getChars(
        getWidth(key.length, MARGIN),
        TABLE_CHARS.horizontalLine,
      );
      result += TABLE_CHARS.midMid;
    } else if (keyList.length - 1 === index) {
      result += getChars(
        getWidth(key.length, MARGIN),
        TABLE_CHARS.horizontalLine,
      );
      result += TABLE_CHARS.rightMid;
    } else {
      result += getChars(
        getWidth(key.length, MARGIN),
        TABLE_CHARS.horizontalLine,
      );
      result += TABLE_CHARS.midMid;
    }
  });

  result += "\n";

  // row2
  keyList.forEach((key, index) => {
    const taskDisplaySize: number =
      getChars(getWidth(key.length, MARGIN), TABLE_CHARS.horizontalLine).length;

    if (index === 0) {
      result += TABLE_CHARS.verticalLine;

      result += getTableContent(String(task[key]), key, taskDisplaySize);

      result += TABLE_CHARS.verticalLine;
    } else if (keyList.length - 1 === index) {
      result += getTableContent(String(task[key]), key, taskDisplaySize);

      result += TABLE_CHARS.verticalLine;
    } else {
      result += getTableContent(String(task[key]), key, taskDisplaySize);

      result += TABLE_CHARS.verticalLine;
    }
  });

  result += "\n";

  return result;
}

function createTableFooter(task: Task): string {
  let result: string = "";
  const margin = getChars(MARGIN, " ");

  const keyList = Object.keys(task);

  // row1
  keyList.forEach((key, index) => {
    if (index === 0) {
      result += TABLE_CHARS.leftMid;
      result += getChars(
        getWidth(key.length, MARGIN),
        TABLE_CHARS.horizontalLine,
      );
      result += TABLE_CHARS.midMid;
    } else if (keyList.length - 1 === index) {
      result += getChars(
        getWidth(key.length, MARGIN),
        TABLE_CHARS.horizontalLine,
      );
      result += TABLE_CHARS.rightMid;
    } else {
      result += getChars(
        getWidth(key.length, MARGIN),
        TABLE_CHARS.horizontalLine,
      );
      result += TABLE_CHARS.midMid;
    }
  });

  result += "\n";

  // row2
  keyList.forEach((key, index) => {
    const taskDisplaySize: number =
      getChars(getWidth(key.length, MARGIN), TABLE_CHARS.horizontalLine).length;

    if (index === 0) {
      result += TABLE_CHARS.verticalLine;

      result += getTableContent(String(task[key]), key, taskDisplaySize);

      result += TABLE_CHARS.verticalLine;
    } else if (keyList.length - 1 === index) {
      result += getTableContent(String(task[key]), key, taskDisplaySize);

      result += TABLE_CHARS.verticalLine;
    } else {
      result += getTableContent(String(task[key]), key, taskDisplaySize);

      result += TABLE_CHARS.verticalLine;
    }
  });

  result += "\n";

  // row3
  keyList.forEach((key, index) => {
    if (index === 0) {
      result += TABLE_CHARS.bottomLeft;
      result += getChars(
        getWidth(key.length, MARGIN),
        TABLE_CHARS.horizontalLine,
      );
      result += TABLE_CHARS.bottomMid;
    } else if (keyList.length - 1 === index) {
      result += getChars(
        getWidth(key.length, MARGIN),
        TABLE_CHARS.horizontalLine,
      );
      result += TABLE_CHARS.bottomRight;
    } else {
      result += getChars(
        getWidth(key.length, MARGIN),
        TABLE_CHARS.horizontalLine,
      );
      result += TABLE_CHARS.bottomMid;
    }
  });

  result += "\n";

  return result;
}

function displayTaskList(taskList: Array<Task>): void {
  let result: string = "";

  taskList.forEach((task, index) => {
    if (index === 0) {
      result += createTableHeader(task);
    }

    if (taskList.length - 1 === index) {
      result += createTableFooter(task);
      return;
    }

    result += addTable(task);
  });

  console.log(result);
}

export { displayTaskList };
