import type { NextApiRequest, NextApiResponse } from "next";

import { promises as fs } from "fs";

import uid from "@/utils/uid";
import getDataPath from "@/utils/api/getDataPath";
import readFile from "@/utils/api/readFile";
import checkIfDataIsATask from "@/utils/checkIfDataIsATask";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const enteringData = req.body;

    if (!checkIfDataIsATask(enteringData, { noId: true })) {
      res.status(400).json({ error: "Input data not a task" });

      return;
    }

    const fileContents = await readFile();

    const tasksList = JSON.parse(fileContents);

    const taskToAdd = { ...enteringData, id: uid() };
    const updatedTasksList = [...tasksList, taskToAdd];

    const jsonDirectory = getDataPath();

    await fs.writeFile(
      jsonDirectory + "/tasks.json",
      JSON.stringify(updatedTasksList)
    );

    res.status(200).json(taskToAdd);
  } else {
    res.status(405).json({ error: "Invalid HTTP method" });
  }
}
