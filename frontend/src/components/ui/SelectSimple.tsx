import Select from "react-select";
import type { StylesConfig } from "react-select";

type OptionType = {
  value: string | number;
  label: string;
};

type Props = {
  options: OptionType[];
  onChange: () => void;
  name: string;
  placeholder: string;
};
export default function CategoriaSelect({
  options,
  onChange,
  name,
  placeholder,
}: Props) {
  const customStyles: StylesConfig<OptionType> = {
    control: (provided, state) => ({
      ...provided,
      backgroundColor: "#111827",
      borderColor: state.isFocused ? "#4C9AFF" : "#334155",
      color: "#e2e8f0",
      padding: "0.3rem",
      boxShadow: state.isFocused ? "0 0 0 1px #4C9AFF" : "none",
      "&:hover": {
        borderColor: "#4C9AFF",
      },
    }),
    menu: (provided) => ({
      ...provided,
      backgroundColor: "#1e293b",
      borderRadius: "0.6rem",
      border: "1px solid #334155",
      zIndex: 10,
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isFocused ? "#334155" : "#1e293b",
      color: "#e2e8f0",
      "&:active": {
        backgroundColor: "#475569",
      },
    }),
    singleValue: (provided) => ({
      ...provided,
      color: "#e2e8f0",
    }),
    placeholder: (provided) => ({
      ...provided,
      color: "#94a3b8",
    }),
    input: (provided) => ({
      ...provided,
      color: "#e2e8f0",
    }),
    dropdownIndicator: (provided) => ({
      ...provided,
      color: "#94a3b8",
      "&:hover": {
        color: "#4C9AFF",
      },
    }),
  };

  return (
    <Select
      options={options}
      styles={customStyles}
      placeholder={placeholder}
      onChange={onChange}
      isClearable
      name={name}
    />
  );
}
