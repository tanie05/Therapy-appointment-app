import React, { useEffect } from "react";

import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const Dropdown = (props) => {
  const [val, setVal] = React.useState(props.defaultValue);
  const { entries } = props;
  const { setFunction } = props;

  useEffect(() => {
    setFunction(val);
  }, []);

  const handleChange = (event) => {
    setVal(event.target.value);
    setFunction(event.target.value);
  };

  return (
    <div>
      <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
        <InputLabel
          style={{ color: "#000000" }}
          id="demo-simple-select-standard-label"
        >
          {props.name}
        </InputLabel>
        <Select
          className="age-select-component"
          labelId="demo-simple-select-standard-label"
          id="demo-simple-select-standard"
          value={val}
          onChange={handleChange}
          label={props.name}
        >
          {entries.map((entry) => {
            return (
              <MenuItem key={entry.value} value={entry.value}>
                {entry.display}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
    </div>
  );
};

export default Dropdown;
