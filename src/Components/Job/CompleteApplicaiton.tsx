import ContactInfo from './ContactInfo';
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { modalIsOpen, modalIsClose } from "../../store/AppSlice";

import PDF from "../../assets/PDF.svg";
import DOC from "../../assets/DOC.svg";
import DOCX from "../../assets/DOCX.svg";
import TXT from "../../assets/TXT.svg";
import Edit from "../../assets/bytesize_edit.svg";

interface FileData {
  type: string;
  name?: string;
}

interface UploadedDoc {
  resume?: FileData;
  coverLetter?: FileData;
}
interface JobPreference {
  salary_expectation?: number ;
  experience: string;
  location: string;
}

interface ContactInfo {
  name: string;
  email: string;
  phone: string;
  location: string;
}

interface User {
  name?: string;
  email?: string;
  phone?: string;
  location?: string;
}

interface RootState {
  users: {
    user: User;
  };
}

interface Props {
  progress?: number;
  jobPrefrence: JobPreference;
  uploadedDoc: UploadedDoc;
  setProgress: (value: number) => void;
  setUserData: (data: any) => void;
}

const CompleteApplicaiton: React.FC<Props> = ({
  jobPrefrence,
  uploadedDoc,
  setProgress,
  setUserData,
}) => { 
  const user = useSelector((state: RootState) => state.users.user);
  const { name, email, phone, location } = user;
  const initialContact = {
    name: name || "",
    email: email || "",
    phone: phone || "",
    location: location || "",
  };

  const [userInfo, setUserInfo] = useState<ContactInfo>(initialContact);
  const [contactModal, setContactModal] = useState<boolean>(false);
  const [resumeType, setResumeType] = useState<string | null>(null);
  const [coverLetterType, setCoverLetterType] = useState<string | null>(null);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(contactModal ? modalIsOpen() : modalIsClose());
  }, [contactModal, dispatch]);

  useEffect(() => {
    if (uploadedDoc.resume) {
      const fileType = uploadedDoc.resume.type;
      switch (fileType) {
        case "application/pdf":
          setResumeType(PDF);
          break;
        case "application/msword":
          setResumeType(DOC);
          break;
        case "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
          setResumeType(DOCX);
          break;
        case "text/plain":
          setResumeType(TXT);
          break;
        default:
          break;
      }
    }
    if (uploadedDoc.coverLetter) {
      const fileType = uploadedDoc.coverLetter.type;
      switch (fileType) {
        case "application/pdf":
          setCoverLetterType(PDF);
          break;
        case "application/msword":
          setCoverLetterType(DOC);
          break;
        case "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
          setCoverLetterType(DOCX);
          break;
        case "text/plain":
          setCoverLetterType(TXT);
          break;
        default:
          break;
      }
    }
  }, [uploadedDoc]);

  const handleSubmit = () => {
    setTimeout(() => {
      setProgress(3);
      setUserData(userInfo);
    }, 1000);
  };
  const toggleContactModal = () => {
    setContactModal(!contactModal);
  };

  return (
    <div className="successWrapper reviewWrapper">
      <div>
        <h2 className="employerQuest">Pleasse review your application </h2>
        <div className="valueBoxWrap">
          <div className="valueBoxTitle spaceBet">
            <h2 className="summaryTitle">Contact information </h2>
            <button
              aria-label="button"
              type="button"
              onClick={toggleContactModal}
            >
              {" "}
              <img src={Edit} alt="" />{" "}
            </button>
          </div>
          <div className="jobPrefrenceValues valueBox">
            <div className="valueWrap  ">
              <p>Name:</p>
              <p className="value"> {userInfo.name}</p>
            </div>
            <div className="valueWrap">
              <p>Email:</p>
              <p className="value"> {userInfo.email}</p>
            </div>
            <div className="valueWrap  ">
              <p>Location:</p>
              <p className="value"> {userInfo.location}</p>
            </div>
            <div className="valueWrap  ">
              <p>Phone Number:</p>
              <p className="value"> {userInfo.phone}</p>
            </div>
          </div>
        </div>
        <div className="valueBoxWrap">
          <div className="valueBoxTitle spaceBet">
            <h2 className="summaryTitle">Employer questions</h2>
            <button aria-label="progress range" onClick={() => setProgress(0)}>
              {" "}
              <img src={Edit} alt="" />{" "}
            </button>
          </div>
          <div className="jobPrefrenceValues valueBox">
            <div className="valueWrap  ">
              <p>Experience:</p>
              <p className="value"> {jobPrefrence.experience}</p>
            </div>
            <div className="valueWrap  ">
              <p>Location:</p>
              <p className="value"> {jobPrefrence.location}</p>
            </div>
            <div className="valueWrap">
              <p>Salary Expectation:</p>
              <p className="value"> {jobPrefrence.salary_expectation}</p>
            </div>
          </div>
        </div>
        <div className="valueBoxWrap">
          {uploadedDoc.resume && (
            <>
              <div className="spaceBet">
                <h2 className="summaryTitle"> Resume</h2>
                <button aria-label="range" onClick={() => setProgress(1)}>
                  {" "}
                  <img src={Edit} alt="" />{" "}
                </button>
              </div>
              <div className="docUploadValues valueBox">
                <div className="valueWrap fileWrap   bbottom">
                  <img
                    src={resumeType ?  resumeType : PDF}
                    className="w-30px"
                    alt=""
                   
                  />
                  <p className="value fileName"> {uploadedDoc?.resume.name}</p>
                </div>
              </div>
            </>
          )}
        </div>
        <div className="valueBoxWrap">
          {uploadedDoc.coverLetter && (
            <>
              <div className="spaceBet">
                <h2 className="summaryTitle"> Cover Letter</h2>
                <button
                  aria-label="progress range"
                  onClick={() => setProgress(1)}
                >
                  {" "}
                  <img src={Edit} alt="" />{" "}
                </button>
              </div>
              <div className="docUploadValues valueBox">
                <div className="valueWrap fileWrap  ">
                  <img src={coverLetterType ? coverLetterType : PDF} className="w-30px" alt="" />
                  <p className="value fileName">
                    {uploadedDoc?.coverLetter.name}
                  </p>
                </div>
              </div>
            </>
          )}
        </div>
        {contactModal && (
          <>
            <div className="modalOverlay overlay"></div>
            <ContactInfo
              userInfo={userInfo}
              setUserInfo={setUserInfo}
              initialContact={initialContact}
              setContactModal={setContactModal}
            />
          </>
        )}

        <button
          type="button"
          onClick={handleSubmit}
          className="applyLink blueBg jobApplicationBtn"
        >
          Submit your application
        </button>
      </div>
    </div>
  );
};

export default CompleteApplicaiton;
