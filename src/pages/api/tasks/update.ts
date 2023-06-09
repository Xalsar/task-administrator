import type { NextApiRequest, NextApiResponse } from "next";
import Task from "../../../../types/Task";

import { promises as fs } from "fs";

import getDataPath from "@/utils/api/getDataPath";
import readFile from "@/utils/api/readFile";
import checkIfDataIsATask from "@/utils/checkIfDataIsATask";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "PUT") {
    const enteringData = req.body;

    if (!checkIfDataIsATask(enteringData)) {
      res.status(400).json({ error: "Input data not a task" });

      return;
    }

    const fileContents = await readFile();
    const tasksList = JSON.parse(fileContents);

    const updatedTasksList = tasksList.map((task: Task) => {
      if (task.id === enteringData.id) {
        return enteringData;
      }

      return task;
    });

    const jsonDirectory = getDataPath();

    await fs.writeFile(
      jsonDirectory + "/tasks.json",
      JSON.stringify(updatedTasksList)
    );

    res.status(200).json(updatedTasksList);
  } else {
    res.status(405).json({ error: "Invalid HTTP method" });
  }
}
