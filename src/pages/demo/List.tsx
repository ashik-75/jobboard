import { Link } from "react-router-dom";
import { NoteType } from "./note.types";

type ListType = {
  notes: NoteType[] | [];
};

function List({ notes }: any) {
  return (
    <div className="grid grid-cols-4 gap-5">
      {notes.map((note: any) => (
        <Link to={`${note.id}`} key={note.id}>
          <div className="p-5 bg-slate-900 rounded-lg">
            <h1 className="font-semibold text-lg capitalize">{note.title}.</h1>
            <p>{note.content}</p>
          </div>
        </Link>
      ))}
    </div>
  );
}

export default List;
