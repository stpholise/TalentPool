import { useState } from "react";
import JobPrefrence from "../Components/Job/JobPrefrence";
import DocUpload from "../Components/Job/DocUpload";
import CompleteApplicaiton from "../Components/Job/CompleteApplicaiton";
import AppSuccess from "../Components/Job/AppSuccess";

interface FileData {
  name: string;
  type: string;
  size: number;
  lastModified?: number;
}

interface JobPreferenceType {
  experience: string;
  location: string;
  salary_expectation: number;
}

interface UploadedDoc {
  resume?: FileData;
  coverLetter?: FileData;
}

interface UploadedDocType {
  resume?: File | null;
  coverLetter?: File | null;
}

interface UserDataType {
  name?: string;
  email?: string;
  phone?: string;
}

const JobApplication = () => {
  const [progress, setProgress] = useState<number>(0);
  const [jobPrefrence, setJobPrefrence] = useState<JobPreferenceType>({
    experience: "",
    location: "",
    salary_expectation: 0,
  });
  const [uploadedDoc, setUploadedDoc] = useState<UploadedDocType>({
    resume: null,
    coverLetter: null,
  });
  const [userData, setUserData] = useState<UserDataType >({
    name: "",
    email: "",
    phone: "",
  });

  const convertToFileData = (
    file: File | null | undefined
  ): FileData | undefined => {
    if (!file) return undefined;
    return {
      name: file.name,
      type: file.type,
      size: file.size,
      lastModified: file.lastModified,
    };
  };

  return (
    <div className="   ">
      <div className=" fullSize">
        {progress < 1 && (
          <div className="form-wrapper">
            <JobPrefrence
              progress={progress}
              setProgress={setProgress}
              setJobPrefrence={setJobPrefrence}
              jobPrefrence={jobPrefrence}
            />
          </div>
        )}
        {progress === 1 && (
          <div className="form-wrapper">
            <DocUpload
              setProgress={setProgress}
              progress={progress}
              setUploadedDoc={setUploadedDoc}
              uploadedDoc={uploadedDoc}
            />
          </div>
        )}
        {progress === 2 && (
          <div className="form-wrapper">
            <CompleteApplicaiton
              setProgress={setProgress}
              progress={progress}
              jobPrefrence={jobPrefrence}
              setUserData={setUserData}
              uploadedDoc={{
                resume: convertToFileData(uploadedDoc.resume),
                coverLetter: convertToFileData(uploadedDoc.coverLetter),
              }}
            />
          </div>
        )}
        {progress === 3 && <AppSuccess userInfo={userData} />}
      </div>
    </div>
  );
};

export default JobApplication;
