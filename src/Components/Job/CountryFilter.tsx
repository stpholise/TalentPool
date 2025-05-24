import Select, { SingleValue } from "react-select";

interface CountryOption {
  label: string;
  value: string;
}

interface CountryFilterPorps {
  countryList: CountryOption[];
  setCountry: (option: CountryOption) => void;
  country: CountryOption | null;
  isClearable: string[];
  setIsClearable: (value: string[]) => void;
}

const CountryFilter: React.FC<CountryFilterPorps> = ({
  countryList,
  setCountry,
  country,
  isClearable,
  setIsClearable,
}) => {
  const handleCountryChange = (option: SingleValue<CountryOption>) => {
    if (!option) return;
    if (typeof option === "object") {
      setCountry(option);
    }
    if (isClearable.includes(option.value)) {
      setIsClearable(isClearable.filter((skill) => skill !== option.value));
    } else {
      setIsClearable([...isClearable, option.value]);
    }
  };

  return (
    <div>
      <Select
        options={countryList}
        onChange={handleCountryChange}
        value={country}
        menuPlacement="top"
        styles={{
          control: (baseStyles) => ({
            ...baseStyles,
            borderColor: "#ccc",
            border: "1px solid #ccc",
            outline: "none",
            boxShadow: "none",
            ":focus": {
              borderColor: "#ccc", // Keep the gray border even on focus
              boxShadow: "none", // Remove box-shadow on focus
            },
            ":hover": {
              borderColor: "#ccc", // Keep the gray border even on hover
            },
          }),
          option: (baseStyles, state) => ({
            ...baseStyles,
            backgroundColor: state.isFocused
              ? "#E1F0FF"
              : state.isSelected
              ? "#0A84FF"
              : "#fff",
            color: state.isFocused
              ? "#0A84FF"
              : state.isSelected
              ? "#fff"
              : "#000",
            cursor: "pointer",
          }),
          valueContainer: (baseStyles) => ({
            ...baseStyles,
            border: "none",
          }),
          singleValue: (baseStyles) => ({
            ...baseStyles,
            color: "#333",
          }),
        }}
        theme={(theme) => ({
          ...theme,
          borderRadius: 0,
          colors: {
            ...theme.colors,
            primary25: "#eee",
            primary: "#0A84FF",
          },
        })}
      />
    </div>
  );
};

export default CountryFilter;
