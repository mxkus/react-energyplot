import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";

export default function Country(props) {
  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl>
        <InputLabel variant="standard" htmlFor="uncontrolled-native">
          Country
        </InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={props.country}
          label="Country"
          onChange={props.handleCountryChange}
        >
          <MenuItem value={"DE"}>Germany</MenuItem>
          <MenuItem value={"AT"}>Austria</MenuItem>
          <MenuItem value={"FR"}>France</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}
