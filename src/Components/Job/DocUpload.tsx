import JobDocs from "./JobDocs";
import { useState } from "react";
import { Formik, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import ArrowBack from "../../assets/arrow_back.svg";

interface UploadedDoc {
  resume?: File | null;
  coverLetter?: File | null;
}

interface DocUploadProps {
  progress?: number;
  setProgress: (step: number | ((prev: number) => number)) => void;
  uploadedDoc: UploadedDoc;
  setUploadedDoc: React.Dispatch<React.SetStateAction<UploadedDoc>>;
}

const DocUpload: React.FC<DocUploadProps> = ({
  setProgress,
  uploadedDoc,
  setUploadedDoc,
}) => {
  const [resume, setResume] = useState<File | null>(
    uploadedDoc?.resume || null
  );
  const [coverLetter, setCoverLetter] = useState<File | null>(
    uploadedDoc?.coverLetter || null
  );

  const initialValues = {
    resume: uploadedDoc?.resume || null,
    coverLetter: uploadedDoc?.coverLetter || null,
  };
  const jobSchema = Yup.object({
    resume: Yup.mixed()
      .required("Resume is required")
      .test(
        "fileSize",
        "File is too large",
        (value) => value instanceof File && value.size <= 5000000
      )
      .test(
        "fileFormat",
        "unsupported file format",
        (value) =>
          !value ||
          (value instanceof File &&
            [
              "application/pdf",
              "application/msword",
              "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
            ].includes(value.type))
      ),
    coverLetter: Yup.mixed<File>()
      .test("fileSize", "File is too large", (value) => {
        return !value || (value instanceof File && value.size <= 5000000); // Return true if no file or size is within limit
      })
      .test("fileFormat", "Unsupported file format", (value) => {
        return (
          value instanceof File &&
          [
            "application/pdf",
            "application/msword",
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
          ].includes(value.type)
        );
      }),
  });
  const handleSubmit = (values: typeof initialValues) => {
    setProgress(2);

    const { resume, coverLetter } = values;
    if (setUploadedDoc) {
      setUploadedDoc((prev) => ({ ...prev, resume }));
      setUploadedDoc((prev) => ({ ...prev, coverLetter }));
    }
  };

  const handleFileChange = (
    doc: File | null,
    field: "resume" | "coverLetter",
    setFieldValue: (field: string, value: any) => void
  ) => {
    setFieldValue(field, doc);
    if (field === "resume") setResume(doc);
    else if (field === "coverLetter") setCoverLetter(doc);
  };

  return (
    <div className="successWrapper">
      <Formik
        initialValues={initialValues}
        validationSchema={jobSchema}
        onSubmit={handleSubmit}
      >
        {({ setFieldValue }) => (
          <div>
            <Form>
              <div className="">
                <button
                  type="button"
                  onClick={() => {
                    setProgress((progress) => progress - 1);
                  }}
                  className="applyLink backTextBtn "
                >
                  {" "}
                  <img src={ArrowBack} alt="back" /> Back
                </button>
                <h2 className="employerQuest">Upload your documents </h2>
              </div>

              <div className="formControl border ">
                <h3>Resume</h3>
                <JobDocs
                  doc={resume}
                  setDoc={(doc: File | null) =>
                    handleFileChange(doc, "resume", (field, value) => setFieldValue(field, value))
                  }
                />
                <div>
                  <ErrorMessage
                    name="resume"
                    component={"div"}
                    className="error"
                  />
                  {resume && <p className="smallTxt">{resume.name}</p>}
                </div>
              </div>
              <div className="formControl border">
                <h3>
                  Cover letter <span className="smallTxt">(optional)</span>
                </h3>
                <JobDocs
                  doc={coverLetter}
                  setDoc={(doc: File | null) =>
                    handleFileChange(doc, "coverLetter", (field, value) => setFieldValue(field, value))
                  }
                />
                <div>
                  {
                    <ErrorMessage
                      name="coverLetter"
                      component={"div"}
                      className="error"
                    />
                  }
                  {coverLetter && (
                    <p className="smallTxt">{coverLetter.name}</p>
                  )}
                </div>
              </div>

              <div className="btncont">
                <button type="submit" className="applyLink   jobApplicationBtn">
                  continue
                </button>
              </div>
            </Form>
          </div>
        )}
      </Formik>
    </div>
  );
};

export default DocUpload;
