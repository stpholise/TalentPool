import { Formik, Form, Field, ErrorMessage, FormikHelpers } from "formik";
import * as Yup from "yup";

import { useSelector } from "react-redux";
import { RootState } from "../../store";

interface JobPreferenceProps {
  progress?: number;
  setProgress: (value: number) => void;
  jobPrefrence: {
    experience?: string;
    location?: string;
    salary_expectation?: number;
  };
  setJobPrefrence: (values: {
    experience: string;
    location: string;
    salary_expectation: number;
  }) => void;
}

interface JobPreferenceValues {
  experience: string;
  location: string;
  salary_expectation: number;
}

const JobPrefrence = ({
  setProgress,
  jobPrefrence,
  setJobPrefrence,
}: JobPreferenceProps) => {
  const job = useSelector((state: RootState) => state.jobSlice.job);
  const user = useSelector((state: RootState) => state.users.user);
  const { location } = user;

  const initialValues: JobPreferenceValues = {
    experience: jobPrefrence?.experience || "",
    location: jobPrefrence?.location || "",
    salary_expectation: jobPrefrence?.salary_expectation || 0,
  };

  const jobApplicationSchema = Yup.object({
    experience: Yup.string().required("Years of Experience is Required"),
    location: Yup.string().required("Location is required"),
    salary_expectation: Yup.number()
      .moreThan(500, "Salary expectation must be greater than 500")
      .required("Salary expectation is required"),
  });

  const handleJobApplication = (
      values: JobPreferenceValues,
    { resetForm }: FormikHelpers<JobPreferenceValues>
  ) => {
    resetForm();
    setProgress(1);
    setJobPrefrence( values);
  };

  const { title } = job;
  return (
    <div className="successWrapper">
      <Formik
        initialValues={initialValues}
        validationSchema={jobApplicationSchema}
        onSubmit={handleJobApplication}
      >
        {() => (
          <Form>
            <h2 className="employerQuest">
              Answer these questions from the employer{" "}
            </h2>
            <div className="formControl">
              <label className="headlable" htmlFor="experience">
                How may years of experience have as a {title}{" "}
              </label>
              <div className="expirienceWrap">
                <Field
                  type="radio"
                  id={"experience1"}
                  name="experience"
                  value="0-1 years"
                />
                <label htmlFor="experience1">0-1 years</label>
              </div>
              <div className="expirienceWrap">
                <Field
                  type="radio"
                  id="experience2"
                  name="experience"
                  value="1-3 years"
                />
                <label htmlFor="experience2">1-3 years</label>
              </div>
              <div className="expirienceWrap">
                <Field
                  type="radio"
                  id="experience3"
                  name="experience"
                  value="3-5 years"
                />
                <label htmlFor="experience3">3-5 years</label>
              </div>
              <ErrorMessage
                name="experience"
                component={"div"}
                className="error"
              />
            </div>
            <div className="formControl margTop">
              <label className="headlable" htmlFor="location">
                {" "}
                What is your current Location
              </label>
              <Field
                type="text"
                name="location"
                placeholder="e.g Lagos"
                className="radius5px field"
              />
              <ErrorMessage
                name="location"
                component={"div"}
                className="error"
              />
            </div>
            <div className="formControl">
              <label className="headlable" htmlFor="salary_expectation">
                What is your salary expectation
              </label>

              <Field
                type="number"
                step="500"
                name="salary_expectation"
                placeholder="e.g 100000"
                className="radius5px field"
              />
              <ErrorMessage
                name="salary_expectation"
                component={"div"}
                className="error"
              />
            </div>

            <button type="submit" className="applyLink   jobApplicationBtn">
              Continue
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default JobPrefrence;
