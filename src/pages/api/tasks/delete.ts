import type { NextApiRequest, NextApiResponse } from "next";
import Task from "../../../../types/Task";

import { promises as fs } from "fs";

import getDataPath from "@/utils/api/getDataPath";
import readFile from "@/utils/api/readFile";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "DELETE") {
    const enteringData = req.query;

    if (!enteringData || !enteringData.id) {
      res.status(400).json({
        error: "Input data not valid. { id: NUMBER} pattern should be used",
      });

      return;
    }

    const taskId = enteringData.id;

    const fileContents = await readFile();

    const tasksList = JSON.parse(fileContents);
    const updatedTasksList = tasksList.filter(
      (task: Task) => task.id !== taskId
    );

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
