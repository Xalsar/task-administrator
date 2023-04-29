import path from "path";

const getDataPath = () => {
  return path.join(process.cwd(), "data");
};

export default getDataPath;
