/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";

const filterOptions = (options, searchText) => {
  return options.reduce((filtered, option) => {
    if (option.options) {
      const filteredGroup = {
        ...option,
        options: filterOptions(option.options, searchText),
      };
      if (filteredGroup.options.length > 0 || searchText === "") {
        filtered.push(filteredGroup);
      }
    } else if (option.label.toLowerCase().includes(searchText.toLowerCase())) {
      filtered.push(option);
    }
    return filtered;
  }, []);
};

const CustomSelect = ({
  isClearable,
  isSearchable,
  isDisabled,
  Options,
  Value,
  Placeholder,
  isGrouped,
  isMulti,
  onChangeHandler,
  onMenuOpen,
  onSearchHandler,
}) => {
  const [searchText, setSearchText] = useState("");
  const [selectedValues, setSelectedValues] = useState(Value || []);
  const [filteredOptions, setFilteredOptions] = useState(Options);
  const [showOptions, setShowOptions] = useState(false);

  useEffect(() => {
    if (onSearchHandler) {
      onSearchHandler(searchText);
    } else {
      setFilteredOptions(filterOptions(Options, searchText));
    }
  }, [searchText, Options, onSearchHandler]);

  const handleSelect = (option) => {
    if (isMulti) {
      setSelectedValues((prevValues) =>
        prevValues.includes(option)
          ? prevValues.filter((value) => value !== option)
          : [...prevValues, option]
      );
    } else {
      setSelectedValues([option]);
      setShowOptions(false);
    }
    if (onChangeHandler) {
      onChangeHandler(option);
    }
  };

  const handleClear = (event) => {
    event.stopPropagation();
    setSelectedValues([]);
    if (onChangeHandler) {
      onChangeHandler(null);
    }
  };

  const handleSearchChange = (event) => {
    setSearchText(event.target.value);
    event.target.value.length > 0
      ? setFilteredOptions(filterOptions(filteredOptions, event.target.value))
      : setFilteredOptions(Options);
  };

  const handleMenuOpen = () => {
    setShowOptions(true);
    if (onMenuOpen) {
      onMenuOpen();
    }
  };

  return (
    <div className={`kzui-select ${isDisabled ? "kzui-select--disabled" : ""}`}>
      <div className="kzui-select__control" onClick={handleMenuOpen}>
        <input
          type="text"
          value={isSearchable ? searchText : ""}
          placeholder={Placeholder}
          onChange={handleSearchChange}
          disabled={isDisabled}
          readOnly={!isSearchable}
          className="kzui-select__input"
        />
        {isClearable && (selectedValues.length > 0 || isMulti) && (
          <button
            onClick={handleClear}
            disabled={isDisabled}
            className="kzui-select__clear-button"
          >
            Clear
          </button>
        )}
        <span className="kzui-select__arrow">&#9660;</span>
      </div>
      {showOptions && (
        <div className="kzui-select__menu">
          <ul>
            {filteredOptions.map((option, index) => (
              <li
                key={index}
                className={`kzui-select__option ${
                  selectedValues.includes(option.value)
                    ? "kzui-select__option--selected"
                    : ""
                }`}
                onClick={() => handleSelect(option.value)}
              >
                {isGrouped && option.options ? (
                  <div>
                    <strong className="kzui-select__group-label">
                      {option.label}
                    </strong>
                    <ul>
                      {option.options.map((subOption, subIndex) => (
                        <li
                          key={subIndex}
                          className={`kzui-select__option ${
                            selectedValues.includes(subOption.value)
                              ? "kzui-select__option--selected"
                              : ""
                          }`}
                          onClick={() => handleSelect(subOption.value)}
                        >
                          {subOption.label}
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : (
                  <span>{option.label}</span>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default CustomSelect;
