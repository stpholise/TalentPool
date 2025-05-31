import { useDropzone } from "react-dropzone";
import { useState, useRef } from "react";
import Minus from "../../assets/Minus.svg";
import Add from "../../assets/carbon_add.svg";

interface JobDocsProps {
  doc: File | null;
  setDoc: (file: File | null) => void;
}

const JobDocs = ({ setDoc, doc }: JobDocsProps) => {
  const [isDocum, setIsDocum] = useState(false);
  const [docum, setDocum] = useState(doc);
  const documInputRef = useRef<HTMLInputElement>(null);

  const onDropDocum = (acceptedFiles: File[]) => {
    if (acceptedFiles && acceptedFiles.length > 0) {
      const file = acceptedFiles[0];
      setIsDocum(true);
      setDocum(file);
      setDoc(file);
    }
  };

  const removeDocum = () => {
    setIsDocum(false);
    setDocum(null);
    setDoc(null);
  };

  const { getInputProps: getDocumInputProps, getRootProps: getDocumRootProps } =
    useDropzone({
      onDrop: onDropDocum,
      accept: {
        "application/pdf": [".pdf"],
        "application/msword": [".doc"],
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
          [".docx"],
        "text/plain": [".txt"],
      },
      // maxSize:4145728,
      maxFiles: 1,
    });

  return (
    <div className="dropZoneWrap  ">
      <div className={"redus5px"} {...getDocumRootProps()}>
        {isDocum && docum ? (
          <button
            aria-label="remove document"
            type="button"
            onClick={removeDocum}
            className="fillWidth"
          >
            <img src={Minus} alt="" />
          </button>
        ) : (
          <button
            type="button"
            onClick={() => documInputRef.current?.click()}
            aria-label="updoading a document"
            aria-hidden="true"
          >
            <img src={Add} alt="add icon" />
            <input
              {...getDocumInputProps()}
              ref={documInputRef}
              className="always-hidden"
            />
          </button>
        )}
      </div>
    </div>
  );
};


export default JobDocs;
