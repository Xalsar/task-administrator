import { promises as fs } from "fs";

import getDataPath from "./getDataPath";

const readFile = async () => {
  const jsonDirectory = getDataPath();

  const fileContents = await fs.readFile(jsonDirectory + "/tasks.json", "utf8");

  return fileContents;
};

export default readFile;
