import Slider from "rc-slider";
import "rc-slider/assets/index.css";

import type { SliderProps } from "rc-slider";
import { CSSProperties } from "react";

type Skill = number | string;

interface ProgressBarProps {
  skillProficiency: number;
  setSkill?: (value: Skill) => void;
  test?: boolean;
  hideValue?: boolean;
  exRange?: number;
  minRange?: number;
  isClearable?: string[];
  setIsClearable?: (value: string[]) => void;
}

const sliderStyles: SliderProps["styles"] = {
  rail: { height: "5px", backgroundColor: "#C4C4C4" },
  track: { height: "5px", backgroundColor: "#084482" },
  handle: {
    borderColor: "#084482",
    backgroundColor: "#084482",
    boxShadow: "",
    width: "12px",
    height: "12px",
    marginTop: "-4px",
  },
};

const ProgressBar = ({
  setSkill,
  skillProficiency,
  test = false,
  hideValue = false,
  exRange = 100,
  minRange = 0,
  isClearable = [],
  setIsClearable,
}: ProgressBarProps) => {
  const handleSliderChange = (value: number | number[]) => {
    const numericValue = Array.isArray(value)
      ? value[0].toString()
      : value.toString();
    if ( setSkill ) { 
      setSkill(numericValue);
    }

    if (!isClearable) return;
    if (isClearable && setIsClearable) {
      if (isClearable.includes(numericValue)) {
        setIsClearable(
          isClearable.filter((skill) => skill !== value.toString())
        );
      } else {
        setIsClearable([...isClearable, numericValue]);
      }
    }
  };
  const containerStyles: React.CSSProperties = {
    width: "100%",
  };

  return (
    <div //style={containerStyles}
      className="w-full"
    >
      <Slider
        min={minRange}
        max={exRange}
        value={skillProficiency} // Controlled value
        onChange={handleSliderChange}
        styles={sliderStyles}
      />
      <p>
        {!hideValue && skillProficiency} {!test && "%"}
      </p>
    </div>
  );
};

export default ProgressBar;
