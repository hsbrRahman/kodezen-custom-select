import "./App.css";
import CustomSelect from "./Components/CustomSelect";

const options = [
  { label: "Option 1", value: "option1" },
  { label: "Option 2", value: "option2" },
  { label: "Option 3", value: "option3" },
  {
    label: "Group 1",
    options: [
      { label: "Group 1 - Option 1", value: "group1-option1" },
      { label: "Group 1 - Option 2", value: "group1-option2" },
    ],
  },
  {
    label: "Group 2",
    options: [
      { label: "Group 2 - Option 1", value: "group2-option1" },
      { label: "Group 2 - Option 2", value: "group2-option2" },
    ],
  },
];

const handleChange = (selected) => {
  console.log("Selected value:", selected);
};

const handleMenuOpen = () => {
  console.log("Menu opened");
};

const handleSearch = (searchText) => {
  console.log("Search text:", searchText);
};

function App() {
  return (
    <>
      <CustomSelect
        Placeholder="Select an option"
        isDisabled={false}
        isClearable={true}
        isSearchable={true}
        isGrouped={true}
        isMulti={true}
        Options={options}
        Value={["option1", "group1-option2"]}
        onChangeHandler={handleChange}
        onMenuOpen={handleMenuOpen}
        onSearchHandler={handleSearch}
      />
    </>
  );
}

export default App;
