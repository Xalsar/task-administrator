import type { NextApiRequest, NextApiResponse } from "next";

import readFile from "@/utils/api/readFile";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const fileContents = await readFile();

    res.status(200).json(JSON.parse(fileContents));
  } else {
    res.status(405).json({ error: "Invalid HTTP method" });
  }
}
