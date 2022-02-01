import { KeyName, Task, WidthData } from "./interface.ts";
import { TABLE_CHARS } from "./constants.ts";
import {
  characterLength,
} from "https://deno.land/x/deno_eastasianwidth@v0.1.0/mod.ts";

function getChars(width: number, str: string): string {
  return Array.from(Array(width), () => str).join("");
}

function getTextSize(text: string): number {
  if (!text) return 0;

  let count = 0;

  for (let i = 0; i < text.length; i++) {
    count += characterLength(text.charAt(i));
  }

  return count;
}

function getTableContent(
  key: string,
  taskItem: string,
  taskDisplaySize: number,
): string {
  if (["null", "false"].includes(taskItem)) {
    return truncateText(" ", taskDisplaySize, " ");
  }

  if (("isDone" === key) && taskItem) {
    return truncateText("👍", taskDisplaySize, " ");
  }

  if (("isDelete" === key) && taskItem) {
    return truncateText("📦", taskDisplaySize, " ");
  }

  return truncateText(taskItem, taskDisplaySize, " ");
}

function truncateText(
  text: string,
  maxLength: number,
  padText: string,
): string {
  let textSize = getTextSize(text);
  let truncateSize = 0;
  let checkMaxLength = maxLength;

  if (!textSize) return text.padEnd(maxLength, padText);

  let str: string = "";

  for (let i = 0; i < maxLength; i++) {
    str += text.charAt(i);

    if (characterLength(text.charAt(i)) === 2) {
      textSize -= 2;
      truncateSize += 1;
      checkMaxLength -= 2;
    } else {
      textSize -= 1;
      truncateSize += 0;
      checkMaxLength -= 1;
    }

    if (textSize === 0 || checkMaxLength === 0) {
      break;
    }
  }

  return str.padEnd(maxLength - truncateSize, padText);
}

function createTableHeader(task: Task, widthData: WidthData): string {
  let result: string = "";

  const keyList: Array<keyof Task> = Object.keys(task);

  // row1
  keyList.forEach((key: KeyName, index: number) => {
    if (index === 0) {
      result += TABLE_CHARS.topLeft;
      result += getChars(
        widthData[key],
        TABLE_CHARS.horizontalLine,
      );
      result += TABLE_CHARS.topMid;
    } else if (keyList.length - 1 === index) {
      result += getChars(
        widthData[key],
        TABLE_CHARS.horizontalLine,
      );
      result += TABLE_CHARS.topRight;
    } else {
      result += getChars(
        widthData[key],
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
      result += `${key as string}`.padEnd(widthData[key], " ");
      result += TABLE_CHARS.verticalLine;
    } else if (keyList.length - 1 === index) {
      result += `${key as string}`.padEnd(widthData[key], " ");
      result += TABLE_CHARS.verticalLine;
    } else {
      result += `${key as string}`.padEnd(widthData[key], " ");
      result += TABLE_CHARS.verticalLine;
    }
  });

  result += "\n";

  return result;
}

function addTable(task: Task, widthData: WidthData): string {
  let result: string = "";
  const keyList = Object.keys(task);

  // row1
  keyList.forEach((key, index) => {
    if (index === 0) {
      result += TABLE_CHARS.leftMid;
      result += getChars(
        widthData[key],
        TABLE_CHARS.horizontalLine,
      );
      result += TABLE_CHARS.midMid;
    } else if (keyList.length - 1 === index) {
      result += getChars(
        widthData[key],
        TABLE_CHARS.horizontalLine,
      );
      result += TABLE_CHARS.rightMid;
    } else {
      result += getChars(
        widthData[key],
        TABLE_CHARS.horizontalLine,
      );
      result += TABLE_CHARS.midMid;
    }
  });

  result += "\n";

  // row2
  keyList.forEach((key, index) => {
    if (index === 0) {
      result += TABLE_CHARS.verticalLine;

      result += getTableContent(key, String(task[key]), widthData[key]);

      result += TABLE_CHARS.verticalLine;
    } else if (keyList.length - 1 === index) {
      result += getTableContent(key, String(task[key]), widthData[key]);

      result += TABLE_CHARS.verticalLine;
    } else {
      result += getTableContent(key, String(task[key]), widthData[key]);

      result += TABLE_CHARS.verticalLine;
    }
  });

  result += "\n";

  return result;
}

function createTableFooter(task: Task, widthData: WidthData): string {
  let result: string = "";
  const keyList: Array<keyof Task> = Object.keys(task);

  // row1
  keyList.forEach((key, index) => {
    if (index === 0) {
      result += TABLE_CHARS.leftMid;
      result += getChars(
        widthData[key],
        TABLE_CHARS.horizontalLine,
      );
      result += TABLE_CHARS.midMid;
    } else if (keyList.length - 1 === index) {
      result += getChars(
        widthData[key],
        TABLE_CHARS.horizontalLine,
      );
      result += TABLE_CHARS.rightMid;
    } else {
      result += getChars(
        widthData[key],
        TABLE_CHARS.horizontalLine,
      );
      result += TABLE_CHARS.midMid;
    }
  });

  result += "\n";

  // row2
  keyList.forEach((key, index) => {
    if (index === 0) {
      result += TABLE_CHARS.verticalLine;

      result += getTableContent(String(key), String(task[key]), widthData[key]);

      result += TABLE_CHARS.verticalLine;
    } else if (keyList.length - 1 === index) {
      result += getTableContent(String(key), String(task[key]), widthData[key]);

      result += TABLE_CHARS.verticalLine;
    } else {
      result += getTableContent(String(key), String(task[key]), widthData[key]);

      result += TABLE_CHARS.verticalLine;
    }
  });

  result += "\n";

  // row3
  keyList.forEach((key, index) => {
    if (index === 0) {
      result += TABLE_CHARS.bottomLeft;
      result += getChars(
        widthData[key],
        TABLE_CHARS.horizontalLine,
      );
      result += TABLE_CHARS.bottomMid;
    } else if (keyList.length - 1 === index) {
      result += getChars(
        widthData[key],
        TABLE_CHARS.horizontalLine,
      );
      result += TABLE_CHARS.bottomRight;
    } else {
      result += getChars(
        widthData[key],
        TABLE_CHARS.horizontalLine,
      );
      result += TABLE_CHARS.bottomMid;
    }
  });

  result += "\n";

  return result;
}

function getMaxWidth(
  key: keyof Task,
  taskList: Array<Task>,
  defaultMinWidth?: number,
  defaultMaxWidth?: number | undefined,
): number {
  if (!taskList || taskList.length === 0) return 0;

  const valueList: Array<string> = taskList.map((t) =>
    String(t[key] === "null" ? "" : String(t[key]))
  );

  let maxWidth = 0;
  for (const value of valueList) {
    const width: number = getTextSize(value);

    if (maxWidth < width) {
      maxWidth = width;
    }
  }

  if (defaultMinWidth && defaultMinWidth > maxWidth) {
    maxWidth = defaultMinWidth;
  }

  if (defaultMaxWidth && defaultMaxWidth < maxWidth) {
    maxWidth = defaultMaxWidth;
  }

  return maxWidth;
}

function displayTaskList(taskList: Array<Task>): void {
  let result: string = "";
  const keyList: Array<keyof Task> = Object.keys(taskList[0]);

  let widthData: WidthData = {};
  for (const key of keyList) {
    widthData[key] = getMaxWidth(key, taskList, 20, 40);
  }

  taskList.forEach((task, index) => {
    if (index === 0) {
      result += createTableHeader(task, widthData);
    }

    if (taskList.length - 1 === index) {
      result += createTableFooter(task, widthData);
      return;
    }

    result += addTable(task, widthData);
  });

  console.log(result);
}

export { displayTaskList };
