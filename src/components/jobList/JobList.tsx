import { useInfiniteQuery } from "@tanstack/react-query";
import { useAuthState } from "react-firebase-hooks/auth";
import { Oval } from "react-loader-spinner";
import { auth } from "../../firebase";
import { getJobs } from "../../services/job.services";
import JobSkeleton from "../skeleton/JobSkeleton";
import Job from "./Job";

function JobList() {
  const [user, loading] = useAuthState(auth);
  const {
    data,
    isLoading,
    isError,
    error,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["jobs"],
    queryFn: getJobs,
    getNextPageParam: (lastPage, allPages) => {
      const lastItem = lastPage.docs[lastPage.docs.length - 1];
      const lastDocDate = lastItem?.data()?.createdAt;

      return lastDocDate;
    },
  });

  if (isLoading) {
    return <JobSkeleton />;
  }

  if (isError) {
    return <pre>{JSON.stringify(error)}</pre>;
  }

  const items = data.pages
    .flatMap((item) => item)
    .map((dt) => {
      return dt.docs.map((job) => {
        return { ...job.data(), id: job.id };
      });
    })
    .flatMap((x) => x);

  return (
    <div className="space-y-5">
      {items.map((job) => {
        return <Job authEmail={user?.email!} job={job} />;
      })}

      {hasNextPage && (
        <div className="flex items-center justify-center my-10">
          <button
            onClick={() => fetchNextPage()}
            className="px-4 py-2 font-semibold rounded flex items-center space-x-2 bg-purple-700"
          >
            <span>{isFetchingNextPage ? "Loading ..." : "Load More"}</span>
            {isFetchingNextPage && (
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
      )}
    </div>
  );
}

export default JobList;
