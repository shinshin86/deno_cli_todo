import { KeyName, Task, WidthData } from "./interface.ts";
import { TABLE_CHARS } from "./constants.ts";

function getChars(width: number, str: string): string {
  return Array.from(Array(width), () => str).join("");
}

// Reference: https://javascript.programmer-reference.com/javascript-han1zen2/
function getTextSize(text: string): number {
  if (!text) return 0;

  let count = 0;

  for (let i = 0; i < text.length; i++) {
    const code = text.charCodeAt(i);
    if (
      (code >= 0x00 && code < 0x81) ||
      code === 0xf8f0 ||
      (code >= 0xff61 && code < 0xffa0) ||
      (code >= 0xf8f1 && code < 0xf8f4)
    ) {
      count += 1;
    } else {
      count += 2;
    }
  }

  return count;
}

function getTableContent(
  taskItem: string,
  taskDisplaySize: number,
): string {
  return truncateText(taskItem, taskDisplaySize, " ");
}

function truncateText(
  text: string,
  maxLength: number,
  padText: string,
): string {
  let textSize = getTextSize(text);
  let truncateSize = 0;

  if (!textSize) return text.padEnd(maxLength, padText);

  let str: string = "";

  // Reference: https://javascript.programmer-reference.com/javascript-han1zen2/
  for (let i = 0; i < maxLength; i++) {
    str += text.substring(i, i + 1);
    const code = text.charCodeAt(i);
    if (
      (code >= 0x00 && code < 0x81) ||
      code === 0xf8f0 ||
      (code >= 0xff61 && code < 0xffa0) ||
      (code >= 0xf8f1 && code < 0xf8f4)
    ) {
      textSize -= 1;
      truncateSize += 0;
    } else {
      textSize -= 2;
      truncateSize += 1;
    }

    if (textSize === 0) {
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

      result += getTableContent(String(task[key]), widthData[key]);

      result += TABLE_CHARS.verticalLine;
    } else if (keyList.length - 1 === index) {
      result += getTableContent(String(task[key]), widthData[key]);

      result += TABLE_CHARS.verticalLine;
    } else {
      result += getTableContent(String(task[key]), widthData[key]);

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

      result += getTableContent(String(task[key]), widthData[key]);

      result += TABLE_CHARS.verticalLine;
    } else if (keyList.length - 1 === index) {
      result += getTableContent(String(task[key]), widthData[key]);

      result += TABLE_CHARS.verticalLine;
    } else {
      result += getTableContent(String(task[key]), widthData[key]);

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
