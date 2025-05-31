import "../styling/Jobs.css";
import Filter from "../Components/Job/Filter";
import JobCard from "../Components/Job/JobCard";
import Search from "../Components/Search";
import Spinner from "../Components/Spinner";
import useFetchJobs from "../hooks/useFetchJobs";
import { v4 as uuidv4 } from "uuid";

import { useState, useEffect, useContext } from "react";
import Pagination from "../Components/Job/Pagination";

interface Company {
  display_name: string;
}
interface Location {
  area: string[];
}

interface Category {
  label: string;
}

interface Job {
  title: string;
  id: string;
  category?: Category;
  location?: Location;
  company: string;
  redirect_url?: string;
  created: string;
  description?: string;
  salary_min?: number;
  salary_max?: number;
  contract_type?: string;
}

interface CountryFilter {
  value: string;
}
interface FilterItems {
  country?: CountryFilter;
  salaryMin?: number;
  salaryMax?: number;
  selected?: string[];
  jobType?: "permanent" | "contract";
  jobClassification?: "full_time" | "part_time";
}

interface UseFetchJobsResult {
  errorMessage: string | null;
  isLoading: boolean;
  jobs: Job;
  count: number;
}

const JobSearch = () => {
  const [filter, setFilter] = useState<FilterItems>({
    country: { value: "" },
    salaryMin: 0,
    salaryMax: 10000,
    jobType: "permanent",
    jobClassification: "full_time",
  });
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [searchValue, setSearchValue] = useState<string>("");
  const [isFetchTriggered, setIsFetchTriggered] = useState<boolean>(false);
  const { errorMessage, isLoading, jobs, count } = useFetchJobs({
    filter,
    setFilter,
    searchValue,
    pageNumber,
    isFetchTriggered,
    setIsFetchTriggered,
  });

  useEffect(() => {
    if (window.innerWidth > 768) {
      window.scrollTo({ top: 0, behavior:"smooth" });
    }
  }, [ pageNumber ] );
  


  const totalPages = Math.ceil(count / 10); // Total number of pages

  return (
    <>
      <main className="dashboard">
        <div className="jobs ">
          <Filter
            isVisible={isVisible}
            setIsVisible={setIsVisible}
            setFilter={setFilter}
            filter={filter}
            setIsFetchTriggered={setIsFetchTriggered}
            setPageNumber={setPageNumber}
          />
          <div className="cardContainer">
            <Search
              isVisible={isVisible}
              setIsVisible={setIsVisible}
              searchValue={searchValue}
              setSearchValue={setSearchValue}
              setIsFetchTriggered={setIsFetchTriggered}
            />
            {isLoading && <Spinner />}
            {errorMessage && <div className="error">{errorMessage}</div>}

            {!isLoading && count == 0 && (
              <p className="error m-auto" >
                No Job Found{" "}
              </p>
            )}

            {!isLoading &&
              jobs.map((job) => {
                const uniqueId = uuidv4();
                const jobWithDefaults = {
                  ...job,
                  created: new Date().toISOString(),
                  company:
                    typeof job.company === "string"
                      ? { display_name: job.company }
                      : job.company,
                };

                return (
                  <div key={uniqueId} className="jobDetails">
                    <JobCard job={jobWithDefaults} />
                  </div>
                );
              })}

            {count > 20 && !isLoading && (
              <Pagination
                totalpages={totalPages}
                pageNumber={pageNumber}
                setPageNumber={setPageNumber}
              />
            )}
          </div>
        </div>

        <section className="select"></section>
      </main>
    </>
  );
};

export default JobSearch;
