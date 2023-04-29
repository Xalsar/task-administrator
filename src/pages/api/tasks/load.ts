import type { NextApiRequest, NextApiResponse } from "next";

import { promises as fs } from "fs";

import getDataPath from "@/utils/api/getDataPath";
import checkIfDataIsATask from "@/utils/checkIfDataIsATask";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const enteringData = req.body;

    const isEnteringDataAnArray = Array.isArray(enteringData);

    const dataNotValidError = () =>
      res.status(400).json({ error: "Input data not a task" });

    // VALIDATE ENTERING DATA
    if (!isEnteringDataAnArray) {
      dataNotValidError();

      return;
    }

    for (const dataItem of enteringData) {
      if (!checkIfDataIsATask(dataItem)) {
        dataNotValidError();

        return;
      }
    }

    const jsonDirectory = getDataPath();

    await fs.writeFile(
      jsonDirectory + "/tasks.json",
      JSON.stringify(enteringData)
    );

    res.status(200).json(enteringData);
  } else {
    res.status(405).json({ error: "Invalid HTTP method" });
  }
}
