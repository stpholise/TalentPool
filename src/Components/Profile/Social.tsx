import "animate.css";
import { useState } from "react";
import Close from "../../assets/close.svg";
import Add from "../../assets/carbon_add.svg";
import Trash from "../../assets/whiteTrash.svg";
import Edit from "../../assets/bytesize_edit.svg";
import { RootState } from "../../store";
import { useDispatch, useSelector } from "react-redux";
import {  addNewSocial,  delMultipleSocial,  removeASocial} from "../../store/UserSlice";
import { modalIsOpen, modalIsClose } from "../../store/AppSlice";
import { v4 as uuidv4 } from "uuid";
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from "formik";
import CreatableSelect from "react-select/creatable";
import { ActionMeta, OnChangeValue } from "react-select";

interface SocialAccount {
  id: string;
  socialTitle: string;
  socialLink: string;
}

interface SocialFormValues {
  socialTitle: string;
  socialLink: string;
}

interface SocialOption {
  value: string;
  label: string;
}

const socialPlatforms: SocialOption[] = [
  { value: "facebook", label: "Facebook" },
  { value: "twitter", label: "Twitter" },
  { value: "instagram", label: "Instagram" },
  { value: "linkedin", label: "LinkedIn" },
  { value: "dribble", label: "Dribble" },
  { value: "github", label: "Github" },
  { value: "behance", label: "Behance" },
  { value: "youtube", label: "Youtube" },
  { value: "pinterest", label: "Pinterest" },
  { value: "tiktok", label: "Tiktok" },
  { value: "snapchat", label: "Snapchat" },
];

const Social = () => {
  const dispatch = useDispatch();
  const [editId, setEditId] = useState<string | null>(null);
  const [socialModal, setSocialModal] = useState<boolean>(false);
  const social = useSelector((state: RootState) => state.users.social || []);
  const [editValues, setEditValues] = useState<SocialAccount | null>(null);
  const [currentOption, setCurrentOption] = useState<SocialOption | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [selected, setSelected] = useState<string[]>([]);

  const handleOptions = (
    option: OnChangeValue<SocialOption, false> | string,
    formik: FormikHelpers<SocialFormValues>
  ) => {
    if (!option) return;
    if (typeof option === "string") {
      setIsLoading(true);
      setTimeout(() => {
        const newOption = {
          value: option.toLowerCase().replace(/\W/g, ""),
          label: option,
        };
        setCurrentOption(newOption);
        formik.setFieldValue("socialTitle", newOption.label); // sets the value of the socialTitle field to the new option label
        setIsLoading(false);
      }, 1000);
    } else {
      setCurrentOption(option);
      formik.setFieldValue("socialTitle", option.label); // sets the value of the socialTitle field to the selected option value
    }
  };

  const initialSocialValues = {
    socialLink: editValues ? editValues.socialLink : "",
    socialTitle: editValues ? editValues.socialTitle : "",
  };

  const socialSchema = Yup.object({
    socialTitle: Yup.string().required("Required"),
    socialLink: Yup.string().url("Invalid URL format").required("Required"),
  });

  const handleSocialModal = () => {
    setSocialModal(!socialModal);
    socialModal ? dispatch(modalIsClose()) : dispatch(modalIsOpen()); //changes the modal state to true on the AppSlice
  };

  const closeSocialModal = (resetForm: () => void) => {
    setSocialModal(false);
    resetForm();
    dispatch(modalIsClose());
    setEditValues(null);
  };

  const addSocial = (
    values: SocialFormValues,
    actions: FormikHelpers<SocialFormValues>
  ) => {
    if (editId !== null) {
      const updatedSocial = social.map(
        (item: SocialAccount) =>
          item.id === editId ? { ...item, ...values } : item // update the social account with the new values if the id matches
      );
      dispatch(addNewSocial(updatedSocial)); // dispatch the updated social array to the user slice for redux state management
      setEditId(null);
      setEditValues(null);
    } else {
      dispatch(addNewSocial([...social, { ...values, id: uuidv4() }])); // dispatch the new social account to the user slice for redux state management
    }
    actions.resetForm();
    closeSocialModal(actions.resetForm);
  };

  const editSocial = (id: string) => {
    const selectedSocial = social.find(
      (social: SocialAccount) => social.id === id
    );
    if (selectedSocial) {
      setEditId(id);
      setEditValues(selectedSocial);
      handleSocialModal();
      setCurrentOption({
        value: selectedSocial.socialTitle.toLowerCase().replace(/\W/g, ""),
        label: selectedSocial.socialTitle,
      });
    }
  };

  const handleChecking = (social: SocialAccount) => {
    setSelected((prev) => {
      if (prev.includes(social.id)) {
        return prev.filter((selectedId) => selectedId !== social.id);
      } else {
        return [...prev, social.id];
      }
    });
  };
  const socialDelMultiple = () => {
    dispatch(delMultipleSocial(selected));
    setSelected([]);
  };

  const removeSocial = (
    id: string,
    actions: FormikHelpers<SocialFormValues>
  ) => {
    dispatch(removeASocial(id));
    actions.resetForm();
    closeSocialModal(actions.resetForm);
  };

  return (
    <div className="radius5px padd1 bgF mb1">
      <div className="topFles spaceBet ">
        <h4 className="subHead">Social accounts</h4>
        {selected.length > 1 && (
          <button
            onClick={socialDelMultiple}
            aria-label="Delete Selected Skills"
            className=" pad1 btn blueBg radius5px"
          >
            Delete {selected.length} social
          </button>
        )}
        {selected.length <= 1 && (
          <button
            aria-label="add"
            className="skillModalBtn btn"
            onClick={handleSocialModal}
          >
            <img src={Add} alt="" />
          </button>
        )}
      </div>
      <ul className="skills">
        {social.map((social: SocialAccount) => (
          <li key={social.id} className="skillBox spaceBet">
            <div className="skillTitle">
              <input
                type="checkbox"
                aria-label="change"
                checked={selected.includes(social.id)}
                onChange={() => {
                  handleChecking(social);
                }}
              />
              <a href={social.socialLink} rel="noopener" target="_blank">
                {social.socialTitle}
              </a>
            </div>
            <div className="edit">
              {selected.length <= 1 && (
                <button
                  className="skillDelete"
                  onClick={() => editSocial(social.id)}
                  aria-label="edit"
                >
                  <img src={Edit} alt="Edit buttton" className="w-18p" />
                </button>
              )}
            </div>
          </li>
        ))}
      </ul>

      {socialModal && (
        <>
          <div className="overlay"></div>
          <div
            className={
              socialModal
                ? "animate__animated animate__fadeIn skillModal modal bgF radius5px padd1 lightShad"
                : `skillModal modal bgF radius5px padd1 lightShad`
            }
          >
            <Formik
              initialValues={initialSocialValues}
              validationSchema={socialSchema}
              onSubmit={addSocial}
            >
              {(formik) => {
                return (
                  <Form>
                    <div className="topFles spaceBet ">
                      <h4 className="subHead">Social accounts</h4>
                      <button
                        type="button"
                        aria-label="close"
                        className="skillModalBtn btn"
                        onClick={() => closeSocialModal(formik.resetForm)}
                      >
                        <img src={Close} alt="" />
                      </button>
                    </div>
                    <h5>Select plaform</h5>

                    <CreatableSelect
                      options={socialPlatforms}
                      value={currentOption}
                      onChange={(option) => handleOptions(option, formik)}
                      onCreateOption={(inputValue) =>
                        handleOptions(inputValue, formik)
                      }
                      isClearable
                      onMenuClose={() => setCurrentOption(null)}
                      className="radius5px"
                      isDisabled={isLoading}
                      isLoading={isLoading}
                      placeholder={"Select or add a platform"}
                      styles={{
                        control: (baseStyles) => ({
                          ...baseStyles,
                          borderColor: "#ccc",
                          border: "1px solid #ccc",
                          outline: "none",
                          boxShadow: "none",
                          ":focus": {
                            borderColor: "#ccc", // Keep the red border even on focus
                            boxShadow: "none", // Remove box-shadow on focus
                          },
                          ":hover": {
                            borderColor: "#ccc", // Keep the gray border even on hover
                          },
                        }),
                        option: (baseStyles, state) => ({
                          ...baseStyles,
                          backgroundColor: state.isFocused
                            ? "#88bef4f6"
                            : state.isSelected
                            ? "#0A84FF"
                            : "#fff",
                          color: state.isFocused ? "#fff" : "#000",
                          cursor: "pointer",
                        }),
                      }}
                    />

                    <ErrorMessage
                      name="socialTitle"
                      component={"div"}
                      className="error"
                    />
                    <h5>Account link</h5>
                    <Field
                      type="text"
                      name="socialLink"
                      placeholder="Add link"
                      className="radius5px"
                    />
                    <ErrorMessage
                      name="socialLink"
                      component={"div"}
                      className="error"
                    />
                    {editValues ? (
                      <div className="skillFlex">
                        <button
                          type="submit"
                          className="addSkillBtn btn blueBg radius5px"
                        >
                          Edit link
                        </button>
                        <button
                          type="button"
                          className="addSkillBtn btn redbg radius5px dltBtn"
                          onClick={() => removeSocial(editValues.id, formik)}
                        >
                          <img
                            src={Trash}
                            alt="delete buttton"
                            className="w-18p text-white"
                          />{" "}
                          Delete
                        </button>
                      </div>
                    ) : (
                      <button
                        type="submit"
                        className="skillModalBtn blueBg radius5px btn addSkillBtn"
                      >
                        Add
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

export default Social;
