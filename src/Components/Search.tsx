import SearchIcon from "../assets/Search_duotone_line.svg";
import FilterIcon from "../assets/Filter.svg";
import { modalIsOpen } from "../store/AppSlice";
import { useDispatch } from "react-redux";
import { useState } from "react";

interface SearchProps {
  searchValue: string;
  setIsVisible: (value: boolean) => void;
  isVisible: boolean;
  setSearchValue: (value: string) => void;
  setIsFetchTriggered: (value: boolean) => void;
}

const Search: React.FC<SearchProps> = ({
  setIsVisible,
  isVisible,
  setSearchValue,
  setIsFetchTriggered,
}) => {
  const dispatch = useDispatch();

  const [searchText, setSearchText] = useState<string>("");

  const debounce=  ( func :  (...args: any[]) => void, delay = 300) => {
    let timer: number;
    return (...args: any[]) => {
      const context = this;  
      clearTimeout(timer);
      timer = window.setTimeout(() => func.apply(context, args), delay);
    };
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchValue(value);
    setIsFetchTriggered(true);
  };

  const toggleFilter = () => {
    setIsVisible(!isVisible);
    dispatch(modalIsOpen());
  };
  {
    isVisible
      ? document.body.classList.add("modalIsOpen")
      : document.body.classList.remove("modalIsOpen");
  }
 

  const handleSearchText = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };

  return (
    <div className="jobSearchBar redius5px">
      <img src={SearchIcon} alt="SearchIcon" className="searchIcon" />
      <input
        type="text"
        name="search"
        onKeyUp={debounce(handleSearch, 1500)}
        value={searchText}
        onChange={handleSearchText}
        className="searchbox"
        aria-label="search job"
      />
      <button type="button" onClick={toggleFilter}>
        <img src={FilterIcon} alt="FilterIcon" className="filterIcon" />
      </button>
      {isVisible && (
        <>
          <div className="overlay"></div>
        </>
      )}
    </div>
  );
};


export default Search;
