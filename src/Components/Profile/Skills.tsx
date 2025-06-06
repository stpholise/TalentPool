import Add from "../../assets/carbon_add.svg";
import Trash from "../../assets/whiteTrash.svg";
import { useSelector, useDispatch } from "react-redux";
import {
  addSkill,
  removeSkill,
  removeMultipleSkills,
  editedSkills,
} from "../../store/UserSlice";
import { modalIsOpen, modalIsClose } from "../../store/AppSlice";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import ProgressBar from "../ProgressBar";
import Close from "../../assets/close.svg";
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from "formik";
import * as Yup from "yup";
import "animate.css";
import "../../styling/animated.css";
import Edit from "../../assets/bytesize_edit.svg";
import { RootState } from "../../store";

interface Skill {
  id: string;
  skillTitle: string;
  skillProficiency: number;
  skillChecked: boolean;
}

interface SkillFormValues {
  skillTitle: string;
  skillProficiency: number;
}

const Skills = () => {
  const uniqueId = uuidv4();
  const dispatch = useDispatch();
  const [skillModal, setSkillModal] = useState<boolean>(false);
  const skillSlice =  useSelector((state: RootState) => state.users.skills) || [];
  const skills = [...skillSlice];
  const [selected, setSelected] = useState<string[]>([]);
  const [editId, setEditId] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState<Skill | null>(null);

  const toggleSkillModal = () => {
    setSkillModal(!skillModal);
    skillModal ? dispatch(modalIsClose()) : dispatch(modalIsOpen());
  };
  const closeSkillModal = (resetForm: () => void) => {
    setSkillModal(false);
    setEditId(null);
    setIsEditing(null);
    resetForm();
    dispatch(modalIsClose());
  };

  const skillValue = {
    skillTitle: isEditing?.skillTitle || "",
    skillProficiency: isEditing?.skillProficiency || 0,
  };

  const skillValidationSchema = Yup.object({
    skillTitle: Yup.string()
      .trim()
      .min(3, "Skill title must be at least 3 characters long")
      .max(50, "Skill title cannot exceed 50 characters")
      .required("Skill title is required"),
    skillProficiency: Yup.number()
      .min(1, "Proficiency must be at least 1%")
      .max(100, "Proficiency cannot exceed 100%")
      .required("Proficiency is required"),
  });

  const handleForm = (
    values: SkillFormValues,
    actions: FormikHelpers<SkillFormValues>
  ) => {
    if (editId) {
      dispatch(
        editedSkills({
          skillTitle: values.skillTitle,
          skillProficiency: values.skillProficiency,
          skillChecked: false,
          id: editId,
        })
      );
      setEditId(null);
      closeSkillModal(actions.resetForm);
    } else {
      dispatch(
        addSkill({
          skillTitle: values.skillTitle,
          skillProficiency: values.skillProficiency,
          skillChecked: false,
          id: uniqueId,
        })
      );
    }
    actions.resetForm();
    closeSkillModal(actions.resetForm);
  };
  const skillRemove = (id: string, formik?: FormikHelpers<SkillFormValues>) => {
    dispatch(removeSkill(id));
    if (formik) {
      closeSkillModal(formik.resetForm);
    }
  };

  const handleChecking = (skill: Skill) => {
    setSelected((prev) => {
      if (prev.includes(skill.id)) {
        return prev.filter((selectedId) => selectedId !== skill.id);
      } else {
        return [...prev, skill.id];
      }
    });
  };

  const handleMultiDelete = () => {
    dispatch(removeMultipleSkills(selected));
    setSelected([]);
  };

  const editSkill = (skill: Skill) => {
    toggleSkillModal();
    setEditId(skill.id);
    const selectedSkill = skills.find((item) => item.id === skill.id);
    setIsEditing(selectedSkill);
  };

  return (
    <div className="radius5px padd1 bgF mb1">
      <div className="topFles spaceBet ">
        <h4 className="subHead">Skillsets</h4>
        {selected.length > 1 && (
          <button
            onClick={handleMultiDelete}
            aria-label="Delete Selected Skills"
            className=" pad1 btn blueBg radius5px"
          >
            {" "}
            Delete {selected.length} skills
          </button>
        )}
        {selected.length <= 1 && (
          <button
            className="skillModalBtn btn"
            onClick={() => toggleSkillModal()}
            aria-label="Add Skill"
          >
            <img src={Add} alt=" add sign" />
          </button>
        )}
      </div>
      <ul className="skills">
        {skills &&
          skills.map((skill) => {
            return (
              <li key={skill.id} className="skillBox spaceBet">
                <div className="skillTitle">
                  <input
                    aria-label="skill"
                    type="checkbox"
                    checked={selected.includes(skill.id)}
                    onChange={() => {
                      handleChecking(skill);
                    }}
                  />
                  <p>{skill.skillTitle}</p>
                </div>

                {selected.length <= 1 && (
                  <button
                    className="skillDelete"
                    onClick={() => editSkill(skill)}
                  >
                    <img src={Edit} alt="Edit buttton" className="w-18p" />
                  </button>
                )}
                {selected.length === 100 && (
                  <button
                    className="skillDelete"
                    onClick={() => skillRemove(skill.id)}
                  >
                    <img src={Trash} alt="delete buttton" className="w-18p" />
                  </button>
                )}
              </li>
            );
          })}
      </ul>
      {skillModal && (
        <>
          <div className=" overlay"> </div>
          <div
            className={
              skillModal
                ? "animate__animated animate__fadeIn skillModal modal bgF radius5px padd1 lightShad"
                : `animate__animated animate__fadeOut skillModal modal bgF radius5px padd1 lightShad`
            }
          >
            <Formik
              initialValues={skillValue}
              onSubmit={handleForm}
              validationSchema={skillValidationSchema}
            >
              {(formik) => {
                return (
                  <Form>
                    <div className="topFles spaceBet ">
                      <h4 className="subHead">Skillsets</h4>
                      <button
                        className="skillModalBtn btn"
                        onClick={() => closeSkillModal(formik.resetForm)}
                      >
                        <img src={Close} alt="close icon" />
                      </button>
                    </div>
                    <Field
                      name="skillTitle"
                      type="text"
                      placeholder="e.g Javascript"
                      className="radius5px"
                    />
                    <ErrorMessage
                      name="skillTitle"
                      component={"div"}
                      className="error"
                    />
                    <ProgressBar
                      setSkill={(value) =>
                        formik.setFieldValue(
                          "skillProficiency",
                          value.toString()
                        )
                      }
                      skillProficiency={formik.values.skillProficiency}
                    />
                    <ErrorMessage
                      name="skillProficiency"
                      component={"div"}
                      className="error"
                    />
                    {isEditing ? (
                      <div className="skillFlex">
                        <button
                          type="submit"
                          className="addSkillBtn btn blueBg radius5px"
                        >
                          Edit skill
                        </button>
                        <button
                          type="button"
                          className="addSkillBtn btn redbg radius5px dltBtn"
                          onClick={() => skillRemove(isEditing.id, formik)}
                        >
                          <img
                            src={Trash}
                            alt="delete buttton"
                            className="trash-icon-btn"
                          />{" "}
                          Delete
                        </button>
                      </div>
                    ) : (
                      <button
                        type="submit"
                        className="addSkillBtn btn blueBg radius5px"
                      >
                        Add skill
                      </button>
                    )}
                  </Form>
                );
              }}
            </Formik>
          </div>
        </>
      )}
    </div>
  );
};
export default Skills;
