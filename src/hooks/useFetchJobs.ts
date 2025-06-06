import { useState, useEffect } from "react";

interface Job {
  id: string;
  title: string;
  company: string;
  salary_min: number;
  salary_max: number;
}

interface Filter {
  country?: { value: string };
  salaryMin?: number;
  salaryMax?: number;
  selected?: string[];
  jobType?: "permanent" | "contract";
  jobClassification?: "full_time" | "part_time";
}

interface UseFetchJobsProps {
  filter?: Filter;
  searchValue?: string;
  pageNumber?: number;
  isFetchTriggered?: boolean;
  setFilter?: (value: Filter) => void;
  setIsFetchTriggered?: (value: boolean) => void;
  viewMore?: number;
}

interface UseFetchJobsReturn {
  jobs: Job[];
  isLoading: boolean;
  errorMessage: string;
  count: number;
}
// ============================================================================
// ============================================================================
// ============================================================================
const useFetchJobs = ({
  filter,
  searchValue = "a",
  pageNumber,
  isFetchTriggered,
  setIsFetchTriggered,
  viewMore = 10,
}: UseFetchJobsProps): UseFetchJobsReturn => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [count, setCount] = useState<number>(0);

  useEffect(() => {
    setIsLoading(true);
    setErrorMessage("");
    const getJobs = async () => {
      const settings = {
        method: "GET",
        headers: {
          Accept: "application/json",
        },
      };
      const {
        country = { value: "gb" },
        salaryMin = 0,
        salaryMax = 0,
        selected = [],
        jobType,
        jobClassification,
      } = filter || {};
      const countryCode = country.value ?? "gb";
      const search = encodeURIComponent(searchValue || "");
      const skills = encodeURIComponent(selected.join("") || "");
      const correntPage = pageNumber ?? "1";

      // Construct the query string for jobType
      const handleJobType = (jobType?: string): string => {
        if (!jobType) return "";
        switch (jobType) {
          case "permanent":
            return "&permanent=1";
          case "contract":
            return "&contract=1";
          default:
            return "";
        }
      };

      // Construct the query string for jobClassification
      const handleJobClass = (jobClassification?: string): string => {
        if (!jobClassification) return "";
        switch (jobClassification) {
          case "full_time":
            return "&full_time=1";
          case "part_time":
            return "&part_time=1";
          default:
            return "&full_time=1";
        }
      };

      const handleMaxSalary = (
        salaryMax: number,
        salaryMin: number
      ): string => {
        if (salaryMax == 0) return "";
        if (salaryMax <= salaryMin) return "";
        return `&salary_max=${salaryMax}`;
      };

      const maxSalary = handleMaxSalary(salaryMax, salaryMin);
      const occupationType = handleJobType(jobType);
      const jobClass = handleJobClass(jobClassification);

      const url = `https://api.adzuna.com/v1/api/jobs/${countryCode}/search/${correntPage}?app_id=22886062&app_key=eed206437ecfaae0d5146924f8038553&results_per_page=${10}&what_phrase=${search}&what_or=${skills}&max_days_old=100&salary_min=${salaryMin}${maxSalary}${jobClass}${occupationType}`;
      // const url =`https://api.adzuna.com/v1/api/jobs/${countryCode}/search/${correntPage}?app_id=e4846793&app_key=91ff38f7efc0d6632363058526423e91&results_per_page=${10}&what_phrase=${search}&what_or=${skills}&max_days_old=100&salary_min=${salaryMin}${maxSalary}${jobClass}${occupationType}`
      try {
        const response = await fetch(url, settings);
        if (!response.ok) {
          throw new Error(`Failed to fetch jobs : ${response.status}`);
        }
        typeof setIsFetchTriggered === "function"
          ? setIsFetchTriggered(false)
          : null;
        const data = await response.json();
        setIsLoading(false);
        setCount(data.count);
        if (window.innerWidth < 768) {
          setJobs((prev) => [...prev, ...data.results]);
        } else if (window.innerWidth > 768) {
          setJobs(data.results);
        }
      } catch (error) {
        const message =
          error instanceof Error ? error.message : "Unknown error occurred";

        setErrorMessage(message);
        setIsLoading(false);
        if (setIsFetchTriggered) {
          setIsFetchTriggered(false);
        }
      }
    };
    getJobs();
  }, [
    filter,
    pageNumber,
    searchValue,
    isFetchTriggered,
    setIsFetchTriggered,
    viewMore,
  ]);

  return {
    jobs,
    isLoading,
    errorMessage,
    count,
  };
};

export default useFetchJobs;
