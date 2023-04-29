import Task from "../../types/Task";

import TasksList from "@/containers/TasksList/TasksList";

type Props = { tasksList: Task[] };

export default function Home({ tasksList }: Props) {
  return <TasksList startingTasks={tasksList} />;
}

export async function getServerSideProps() {
  const response = await fetch("http://localhost:3000/api/tasks/list", {
    method: "GET",
  });
  const jsonData = await response.json();

  return {
    props: { tasksList: jsonData },
  };
}
