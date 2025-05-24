import Add from "../assets/carbon_add.svg";
import Minus from "../assets/Minus.svg";
import Skills from "../Components/Profile/Skills";
import Socials from "../Components/Profile/Social";
import Person from "../Components/Profile/Person";

import { useDropzone } from "react-dropzone";
import { FileRejection, DropEvent } from "react-dropzone";
import { useSelector } from "react-redux";
import { useState, useRef, useCallback } from "react";
import { RootState } from "../store";

interface FileUploadProps {
  onFileUploaded: (file: File[]) => void;
}

const Profile = () => {
  const [cvFile, setCvFile] = useState<File[]>([]);
  const [isCvFile, setIsCvFile] = useState<boolean>(false);
  const [isPortfolioFile, setIsPortfolioFile] = useState<boolean>(false);
  const [portfolioFiles, setPortfolioFiles] = useState<File[]>([]);
  const [portfolioUrl, setPortfolioUrl] = useState<string>();
  const [cvUrl, setCvUrl] = useState<string>();
  const isModalOpen = useSelector((state: RootState) => state.app.modalIsOpen);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const portfolioInputRef = useRef<HTMLInputElement>(null);

  const onDrop = useCallback(
    (
      acceptedFiles: File[],
      _fileRejections: FileRejection[],
      _event: DropEvent
    ) => {
      if (acceptedFiles.length > 0) {
        setIsCvFile(true);
        setCvFile(acceptedFiles);
        setCvUrl(URL.createObjectURL(acceptedFiles[0]));
      }
    },
    []
  );

  const onDropPortfolio = useCallback(
    (
      acceptedFiles: File[],
      _fileRejections: FileRejection[],
      _event: DropEvent
    ) => {
      if (acceptedFiles && acceptedFiles.length > 0) {
        setIsPortfolioFile(true);
        setPortfolioFiles(acceptedFiles);
        setPortfolioUrl(URL.createObjectURL(acceptedFiles[0]));
      }
    },
    []
  );

  const resetCvFile = () => {
    setIsCvFile(false);
    setCvFile([]);
    setCvUrl("");
  };

  const resetPortfolioFile = () => {
    setIsPortfolioFile(false);
    setPortfolioFiles([]);
    setPortfolioUrl("");
  };

  const fileTypes = {
    "application/pdf": [".pdf"],
    "application/msword": [".doc"],
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document": [
      ".docx",
    ],
    "text/plain": [".txt"],
  };

  const dropzoneOptions = {
    accept: fileTypes,
    maxSize: 3145728,
    maxFiles: 1,
  };

  const { getRootProps: getCvRootProps, getInputProps: getCvInputProps } =
    useDropzone({
      onDrop,
      ...dropzoneOptions,
    });

  const {
    getRootProps: getPortfolioRootProps,
    getInputProps: getPortfolioInputProps,
  } = useDropzone({
    onDrop: onDropPortfolio,
    ...dropzoneOptions,
  });

  return (
    <section
      className={`marginTL profilePage ${isModalOpen ? "modalIsOpen" : ""}`}
    >
      <Person  />
      <section className="flexColumn w80">
        <div className="fileSection spaceBet mb1">
          <aside className="cvSec radius5px padd1 bgF lightShad w50">
            <div className="cvTop topFles spaceBet " {...getCvRootProps()}>
              <h4>CV</h4>
              {isCvFile ? (
                <button className="rmvCv " onClick={resetCvFile}>
                  {" "}
                  <img src={Minus} alt="" />{" "}
                </button>
              ) : (
                <div
                  className="skillModalBtn btn"
                  onClick={() => fileInputRef.current?.click()}
                    aria-label="Upload a file" 
                    title='modal button'
                >
                  <img src={Add} alt="" />
                  <input
                    {...getCvInputProps()}
                    ref={fileInputRef}
                    className="always-hidden"
                    aria-hidden="true"
                  />
                </div>
              )}
            </div>

            <div className="cvBtnContnn">
              {isCvFile ? (
                <a
                  href={cvUrl}
                  download={cvFile[0].name}
                  className="cvBtn radius5px blueBg"
                >
                  View file{" "}
                </a>
              ) : (
                <p>Upload a file</p>
              )}
            </div>
          </aside>
          <aside className="portfolioSec radius5px padd1 bgF lightShad w50">
            <div
              className="portfolioTop topFles spaceBet"
              {...getPortfolioRootProps}
            >
              <h4>Portfolio</h4>
              {isPortfolioFile ? (
                <button className="rmvPortfolio" onClick={resetPortfolioFile}>
                  {" "}
                  <img src={Minus} alt="remove portfolio" />{" "}
                </button>
              ) : (
                <div
                  className="skillModalBtn btn"
                  onClick={() => portfolioInputRef.current?.click()}
                  aria-label="upload Portfolio file"
                >
                  <img src={Add} alt="add a portfolio file" />
                  <input
                    {...getPortfolioInputProps()}
                    ref={portfolioInputRef}
                    className="always-hidden"
                    aria-hidden="true"
                  />
                </div>
              )}
            </div>
            <div className="portfolioBtnCont ">
              {isPortfolioFile ? (
                <a
                  href={portfolioUrl}
                  download={portfolioFiles[0].name}
                  className="portfolioBtn blueBg radius5px"
                >
                  View file
                </a>
              ) : (
                <p>Upload a file</p>
              )}
            </div>
          </aside>
        </div>
        <section className="skillsets">
          <Skills />
          <Socials />
        </section>
      </section>
    </section>
  );
};

export default Profile;
