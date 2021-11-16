import { parse } from "https://deno.land/std/flags/mod.ts";
import { usage } from "./utils.ts";
import { add, del, done, edit, edittag, list } from "./commands.ts";

const DATA_FILE_PATH = "./data.json";

const parsedArgs = parse(Deno.args);
const command = parsedArgs._[0];

if (!command || command === "help" || parsedArgs.h || parsedArgs.help) {
  usage();
  Deno.exit(0);
}

const specifyDataFilePath = parsedArgs.f || parsedArgs.file && parsedArgs.f ||
  parsedArgs.file;

const dataFilePath = specifyDataFilePath || DATA_FILE_PATH;

if (command === "add") {
  await add(dataFilePath, parsedArgs._[1].toString());
} else if (command === "list") {
  await list(dataFilePath);
} else if (command === "done") {
  await done(dataFilePath, Number(parsedArgs._[1]));
} else if (command === "edit") {
  const editTaskId = Number(parsedArgs._[1]);
  const newTaskName = parsedArgs._[2].toString();

  await edit(dataFilePath, editTaskId, newTaskName);
} else if (command === "edittag") {
  const editTaskId = Number(parsedArgs._[1]);
  const newTagName = parsedArgs._[2].toString();

  await edittag(dataFilePath, editTaskId, newTagName);
} else if (command === "delete") {
  await del(dataFilePath, Number(parsedArgs._[1]));
} else if (command === "help") {
  usage();
}

Deno.exit(0);
