
import { useState } from "react";

interface Option {
  label: string;
  value: string;
}

interface SavedJobsMenuProps{
  setOption: ( value: string ) => void;
}

const SavedJobsMenu = ({ setOption }: SavedJobsMenuProps) => {
  const [activeOption, setActiveOption] = useState("saved");
  const menu: Option[] = [
    { value: "saved", label: "Saved Jobs" },
    { value: "applied", label: "Applied" },
    { value: "in_progress", label: "In Progress" },
    { value: "archived", label: "Archived" },
  ];
  const handleMenuToggle = (item: Option ) => {
    setOption(item.value);
    setActiveOption(item.value);
  };

  return (
    <div className="saved-jobs-menu">
      {menu.map((item, index) => {
        return (
          <div key={index} className="menu-item">
            <button
              onClick={() => handleMenuToggle(item)}
              className={activeOption === item.value ? "active" : ""}
            >
              {item.label}
            </button>
          </div>
        );
      })}
    </div>
  );
};


export default SavedJobsMenu;
