import { useQuery } from "@tanstack/react-query";
import { RotatingLines } from "react-loader-spinner";
import { useParams } from "react-router-dom";
import { getNote } from "./demo.services";

function Details() {
  const { noteId } = useParams();
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["notes", noteId],
    queryFn: getNote,
    enabled: Boolean(noteId),
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
    <div>
      <div className="max-w-xl bg-slate-900 rounded p-10">
        <h1 className="font-bold text-xl">{data?.title}</h1>
        <p>{data.content}</p>
      </div>
    </div>
  );
}

export default Details;
