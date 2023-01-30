import * as React from "react";

import Datepicker from "./Datepicker";
import EnergyProduction from "./EnergyProduction";
import EnergyChart from "./EnergyChart";
import Country from "./Country";
import {
  Button,
  Grid,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";

import SsidChartIcon from "@mui/icons-material/SsidChart";
import TableRowsIcon from "@mui/icons-material/TableRows";

class EnergyHandler extends React.Component {
  constructor() {
    super();
    this.state = {
      date: null,
      formattedDate: "20200101",
      energyData: {},
      country: "DE",
      displayTable: true,
    };
  }

  printHeader() {
    return `Energy production for ${this.state.country} on date ${this.state.formattedDate} is`;
  }

  handleChangeDate = (date) => {
    this.setState((prevState) => {
      return {
        ...prevState,
        date: date,
        formattedDate: this.formatDate(new Date(date.$y, date.$m, date.$D)),
        energyData: {},
      };
    });
  };

  handleCountryChange = (country) => {
    this.setState((prevState) => {
      return {
        ...prevState,
        country: country.target.value,
        energyData: {},
      };
    });
  };

  formatDate(date) {
    let d = new Date(date),
      month = "" + (d.getMonth() + 1),
      day = "" + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    return [year, month, day].join("");
  }

  getEnergy() {
    this.setState((prevState) => {
      return {
        ...prevState,
        energyData: { "loading...": "loading..." },
      };
    });
    let url = `https://mxkus.uber.space/api/energy/?date=${this.state.formattedDate}&country=${this.state.country}`;
    fetch(url, {
      mode: "cors",
      headers: {
        "Access-Control-Allow-Origin": "http://localhost:3000",
      },
    }).then((res) => {
      res.json().then((j) =>
        this.setState((prevState) => {
          return {
            ...prevState,
            energyData: j,
          };
        })
      );
    });
  }

  handleToggle = (event, value) => {
    this.setState((prevState) => {
      return {
        ...prevState,
        displayTable: value,
      };
    });
  };

  tableOrChart() {
    let returnValue;
    if (this.state.displayTable) {
      returnValue = <EnergyProduction energyData={this.state.energyData} />;
    } else {
      returnValue = <EnergyChart energyData={this.state.energyData} />;
    }
    return returnValue;
  }

  render() {
    return (
      <>
        <Grid item xs={12} xl={8}>
          <Datepicker
            onChange={this.handleChangeDate}
            value={this.state.date}
          />
        </Grid>
        <Grid item xs={12} xl={8}>
          <Country
            handleCountryChange={this.handleCountryChange}
            country={this.state.country}
          />
        </Grid>
        <Grid item xs={12} xl={8}>
          <Button
            onClick={() => {
              this.getEnergy();
            }}
            variant="contained"
          >
            Get Energy Production
          </Button>
        </Grid>
        <Grid item xs={12} xl={8}>
          <ToggleButtonGroup
            value={this.state.displayTable}
            exclusive
            onChange={this.handleToggle}
            aria-label="text alignment"
          >
            <ToggleButton value={true} aria-label="left aligned">
              <SsidChartIcon />
            </ToggleButton>
            <ToggleButton value={false} aria-label="centered">
              <TableRowsIcon />
            </ToggleButton>
          </ToggleButtonGroup>
          <Typography variant="h6">{this.printHeader()}</Typography>
          {this.tableOrChart()}
        </Grid>
      </>
    );
  }
}

export default EnergyHandler;
