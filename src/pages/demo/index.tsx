import { useQuery } from "@tanstack/react-query";
import { RotatingLines } from "react-loader-spinner";
import { getNotes } from "./demo.services";
import Form from "./Form";
import List from "./List";

function DemoPage() {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["notes"],
    queryFn: getNotes,
    select: (data) => data.docs.map((doc) => ({ id: doc.id, ...doc.data() })),
  });

  if (isLoading) {
    return (
      <RotatingLines
        strokeColor="grey"
        strokeWidth="5"
        animationDuration="0.75"
        width="96"
        visible={true}
      />
    );
  }

  return (
    <div className="space-y-5">
      <Form />
      <h1>Show the list</h1>
      <List notes={data} />
    </div>
  );
}

export default DemoPage;
