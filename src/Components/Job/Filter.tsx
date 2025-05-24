import { useState } from "react";
import Close from "../../assets/close.svg";
import ProgressBar from "../ProgressBar";
import CountryFilter from "./CountryFilter";
import More from "../../assets/moreIcon.svg";
import Less from "../../assets/lessIcon.svg";

interface Option {
  value: string;
  label: string;
}
interface CountryFilter {
  value: string;
}
interface Filter {
  country?: CountryFilter;
  salaryMin?: number;
  salaryMax?: number;
  selected?: string[];
  jobType?: "permanent" | "contract";
  jobClassification?: "full_time" | "part_time";
}

interface FilterProps {
  filter: Filter
  isVisible: boolean;
  setIsVisible: (value: boolean) => void;
  setIsFetchTriggered: (value: boolean) => void;
  setFilter: (filter: FilterState) => void;
  setPageNumber: (value: number) => void;
}

interface FilterState {
  selected: string[];
  country: Option;
  salaryMin: number;
  salaryMax: number;
  jobClassification: "full_time" | "part_time";
  jobType: "permanent" | "contract";
}

const Filter: React.FC<FilterProps> = ({
  isVisible = false,
  setIsVisible,
  setIsFetchTriggered,
  setFilter,
  setPageNumber,
}) => {
  const [salaryMin, setSalaryMin] = useState<number>(0);
  const [salaryMax, setSalaryMax] = useState<number>(0);
  const [toggleSkills, setToggleSkills] = useState<boolean>(false);
  const [isMinSalryOpen, setIsMinSalaryOpen] = useState<boolean>(false);
  const [isMaxSalryOpen, setIsMaxSalaryOpen] = useState<boolean>(false);
  const [jobType, setJobType] = useState<"permanent" | "contract">("permanent");
  const [selected, setSelected] = useState<string[]>([]);
  const [jobClassification, setJobClassification] = useState<
    "full_time" | "part_time"
  >("full_time");
  const [country, setCountry] = useState<Option>({
    value: "gb",
    label: "Great Breatean",
  });
  const [jobTypeToggle, setJobTypeToggle] = useState<boolean>(false);
  const [jobClassificationToggle, setJobClassificationToggle] =
    useState<boolean>(false);
  const [isCountryOpen, setIsCountryOpen] = useState<boolean>(false);
  const [isClearable, setIsClearable] = useState<string[]>([]);

  const clearFilter = () => {
    setCountry({ value: "gb", label: "Great Breatean" });
    setSalaryMin(0);
    setSalaryMax(0);
    setSelected([]);
    setJobClassification("full_time");
    setJobType("permanent");
    setJobClassificationToggle(false);
    setIsCountryOpen(false);
    setJobTypeToggle(false);
    setIsMaxSalaryOpen(false);
    setIsMinSalaryOpen(false);
    setIsClearable([]);
  };

  const closeFilter = () => {
    setIsVisible(false);
    clearFilter();
  };

  const countryList = [
    { value: "gb", label: "Great Britain" },
    { value: "at", label: "Austria" },
    { value: "au", label: "Australia" },
    { value: "be", label: "Belgium" },
    { value: "br", label: "Brazil" },
    { value: "ch", label: "Switzerland" },
    { value: "ca", label: "Canada" },
    { value: "de", label: " Germany" },
    { value: "fr", label: "France" },
    { value: "es", label: "Spain" },
    { value: "in", label: " India" },
    { value: "it", label: "Italy" },
    { value: "mx", label: " Mexico" },
    { value: "nl", label: "Netherlands" },
    { value: "nz", label: "New Zealand" },
    { value: "pl", label: "Poland" },
    { value: "sg", label: "Singapore" },
    { value: "za", label: "South Africa" },
  ];

  // handle dropdown toggles
  const handlSkillToggle = () => {
    setToggleSkills(!toggleSkills);
  };
  const minSalaryToggle = () => {
    setIsMinSalaryOpen(!isMinSalryOpen);
  };
  const maxSalaryToggle = () => {
    setIsMaxSalaryOpen(!isMaxSalryOpen);
  };
  const handlJobTypeToggle = () => {
    setJobTypeToggle(!jobTypeToggle);
  };
  const handlJobClassificationToggle = () => {
    setJobClassificationToggle(!jobClassificationToggle);
  };
  const handleCountryToggle = () => {
    setIsCountryOpen(!isCountryOpen);
  };

  const skillsets = [
    { skill: "UI/UX", level: "Expert" },
    { skill: "Figma", level: "Expert" },
    { skill: "Sketch", level: "Expert" },
    { skill: "JavaScript", level: "Expert" },
    { skill: "FrontEnd", level: "Expert" },
    { skill: "Backend", level: "Intermediate" },
  ];

  const jobClassificationArr = [
    { value: "part_time", label: "Part Time" },
    { value: "full_time", label: "Full Time" },
  ];
  const jobTypesArr = [
    { value: "contract", label: "Contract" },
    { value: "permanent", label: "Permanent" },
  ];

  const handleSkill = ( e: React.ChangeEvent<HTMLInputElement> ) => {
    const value = e.target.value
    if (selected.includes(value)) {
      setSelected(selected.filter((skill) => skill !== value));
    } else {
      setSelected([...selected, value]);
    }
    if (isClearable.includes(value)) {
      setIsClearable(isClearable.filter((skill) => skill !== value));
    } else {
      setIsClearable([...isClearable, value]);
    }
  };

  const hadleJobType = ( e: React.ChangeEvent<HTMLInputElement> ) => {
    const value = e.target.value 
    if(value === "permanent" || value === "contract"){
    setJobType(value);
    if (isClearable.includes(value)) {
      setIsClearable(isClearable.filter((skill) => skill !== value));
    } else {
      setIsClearable([...isClearable, value]);
    }}
  };

  const hadleJobClassification = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value === "full_time" || value === "part_time") {
      setJobClassification(value);
      if (isClearable.includes(value)) {
        setIsClearable(isClearable.filter((skill) => skill !== value));
      } else {
        setIsClearable([...isClearable, value]);
      }
    }
  };

  const applyFilter = () => {
    setIsFetchTriggered(true);
    setIsVisible(false);
    setFilter({
      selected: selected,
      country: country,
      salaryMin: salaryMin,
      salaryMax: salaryMax,
      jobClassification: jobClassification,
      jobType: jobType,
    });
    setPageNumber(1);
  };

  return (
    <>
      <form>
        <section
          className={
            isVisible
              ? "filterContainer show animate__animated animate__zoomIn"
              : "filterContainer"
          }
        >
          <h5 className="bbottom">FILTERS</h5>
          <button
            className="closeFilter btn"
            type="button"
            onClick={closeFilter}
          >
            <img src={Close} alt="close icon" />
          </button>

          <div className="bbottom">
            <div onClick={handlSkillToggle} className="spaceBet">
              <h5 className="">Skills</h5>
              {toggleSkills ? (
                <img src={Less} alt="less icon " />
              ) : (
                <img src={More} alt="more icon" />
              )}
            </div>
            {toggleSkills &&
              skillsets.map((skill, index) => (
                <div key={index} className="skillBlock">
                  <input
                    type="checkbox"
                    name={skill.skill}
                    value={skill.skill}
                    onChange={handleSkill}
                    checked={selected.includes(skill.skill)}
                    id={skill.skill}
                  />
                  <label htmlFor={skill.skill}>{skill.skill}</label>
                </div>
              ))}
          </div>

          <div className="bbottom">
            <div onClick={handlJobTypeToggle} className="spaceBet">
              <h5 className="">Job Type</h5>
              {jobTypeToggle ? (
                <img src={Less} alt="less icon " />
              ) : (
                <img src={More} alt="more icon" />
              )}
            </div>
            {jobTypeToggle &&
              jobTypesArr.map((type, index) => (
                <div key={index} className="skillBlock">
                  <input
                    type="radio"
                    name={"jobType"}
                    value={type.value}
                    onChange={(e) => hadleJobType(e)}
                    checked={jobType === type.value}
                    id={type.value}
                  />
                  <label htmlFor={type.value}>{type.label}</label>
                </div>
              ))}
          </div>

          <div className="bbottom">
            <div onClick={handlJobClassificationToggle} className="spaceBet">
              <h5 className="">Job Classification</h5>
              {jobClassificationToggle ? (
                <img src={Less} alt="less icon " />
              ) : (
                <img src={More} alt="more icon" />
              )}
            </div>
            {jobClassificationToggle &&
              jobClassificationArr.map((type, index) => (
                <div key={index} className="skillBlock">
                  <input
                    type="radio"
                    name={"jobClassification"}
                    value={type.value}
                    onChange={(e) => hadleJobClassification(e)}
                    checked={jobClassification === type.value}
                    id={type.value}
                  />
                  <label htmlFor={type.value}>{type.label}</label>
                </div>
              ))}
          </div>
          <div className="bbottom ">
            <div className="spaceBet" onClick={minSalaryToggle}>
              <span>Minimum Salary </span>
              {isMinSalryOpen ? (
                <img src={Less} alt="less icon" />
              ) : (
                <img src={More} alt="more icon" />
              )}
            </div>
            {isMinSalryOpen && (
              <div className="sliderContainer">
                <input
                  className="pad1 priceInput radius5px"
                  type="number"
                  title="slider container"
                  value={salaryMin}
                  onChange={(e) =>
                    setSalaryMin(parseInt(e.target.value, 10) || 0)
                  }
                />
                <ProgressBar
                  setSkill={(value) => setSalaryMin(Number(value))}
                  skillProficiency={salaryMin}
                  test={true}
                  exRange={10000}
                  hideValue={true}
                  isClearable={isClearable}
                  setIsClearable={setIsClearable}
                />
              </div>
            )}
          </div>

          <div className="bbottom ">
            <div className="spaceBet" onClick={maxSalaryToggle}>
              <span>Maximom Salary </span>
              {isMaxSalryOpen ? (
                <img src={Less} alt="less icon" />
              ) : (
                <img src={More} alt="more icon" />
              )}
            </div>
            {isMaxSalryOpen && (
              <div className="sliderContainer">
                <input
                  className="pad1 priceInput"
                  title="slider container"
                  type="number"
                  value={salaryMax}
                  onChange={(e) =>
                    setSalaryMax(parseInt(e.target.value, 10) || 0)
                  }
                />
                <ProgressBar
                  setSkill={(value) => setSalaryMax(Number(value))}
                  skillProficiency={salaryMax}
                  test={true}
                  hideValue={true}
                  exRange={100000}
                  isClearable={isClearable}
                  setIsClearable={setIsClearable}
                />
              </div>
            )}
          </div>

          <div className="bbottom ">
            <div className="spaceBet" onClick={handleCountryToggle}>
              <span>Country </span>
              <img src={isCountryOpen ? Less : More} alt="less icon" />
            </div>
            {isCountryOpen && (
              <div className="sliderContainer">
                <CountryFilter
                  countryList={countryList}
                  setCountry={setCountry}
                  country={country}
                  isClearable={isClearable}
                  setIsClearable={setIsClearable}
                />
              </div>
            )}
          </div>

          <div className="skillFlex filter">
            <button type="button" onClick={applyFilter} className="filterBtn">
              Apply{" "}
            </button>
            {isClearable.length >= 1 ? (
              <button
                type="button"
                onClick={clearFilter}
                className="filterBtn clearBtn"
              >
                Clear{" "}
              </button>
            ) : (
              ""
            )}{" "}
          </div>
        </section>
      </form>
    </>
  );
};

export default Filter;
