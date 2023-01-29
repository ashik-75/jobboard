import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { serverTimestamp } from "firebase/firestore";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Oval } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { addNote } from "./demo.services";
import { NoteType } from "./note.types";

const schema = yup
  .object({
    title: yup.string().min(5).required(),
    content: yup.string().required(),
  })
  .required();

function Form() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<NoteType>({
    resolver: yupResolver(schema),
  });

  const { isLoading, isError, error, mutate, isSuccess } = useMutation({
    mutationFn: addNote,
    onSuccess: (info, newData) => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });

      const p = { id: info.id, ...newData };
      queryClient.setQueryData(["notes", info.id], p);
    },
  });

  const onSubmit = (data: NoteType) => {
    const payload = { ...data, createdAt: serverTimestamp() };
    mutate(payload);
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success("Note added");
      navigate("/demo");
      reset();
    }

    if (isError) {
      toast.error("Something went erong");
    }
  }, [isSuccess, isError]);

  return (
    <div>
      <div className="max-w-xl ">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <input
              type="text"
              {...register("title")}
              placeholder="title ..."
              className="border w-full border-slate-400  outline-none px-4 py-2 rounded bg-transparent"
            />
            <p className="text-pink-600">{errors.title?.message}</p>
          </div>
          <div>
            <textarea
              rows={4}
              {...register("content")}
              placeholder="take note ..."
              className="border w-full border-slate-400  outline-none px-4 py-2 rounded bg-transparent"
            />
            <p className="text-pink-600">{errors.content?.message}</p>
          </div>

          <div>
            <button
              type="submit"
              className="px-4 py-2 font-semibold rounded flex items-center space-x-2 border border-slate-400"
            >
              <span>{isLoading ? "Loading ..." : "Add Note"}</span>
              {isLoading && (
                <Oval
                  height={20}
                  width={20}
                  color="#fcfcfc"
                  wrapperStyle={{}}
                  wrapperClass=""
                  visible={true}
                  ariaLabel="oval-loading"
                  secondaryColor="#dddbdb"
                  strokeWidth={4}
                  strokeWidthSecondary={4}
                />
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Form;
