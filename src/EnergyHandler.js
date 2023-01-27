import * as React from "react";

import Datepicker from "./Datepicker";
import EnergyProduction from "./EnergyProduction";
import Country from "./Country";
import { Button, Grid, Typography } from "@mui/material";

class EnergyHandler extends React.Component {
  constructor() {
    super();
    this.state = {
      date: null,
      formattedDate: "20200101",
      energyData: {},
      country: "DE",
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

  render() {
    return (
      <>
        <Grid item xs={8}>
          <Datepicker
            onChange={this.handleChangeDate}
            value={this.state.date}
          />
        </Grid>
        <Grid item xs={8}>
          <Country
            handleCountryChange={this.handleCountryChange}
            country={this.state.country}
          />
        </Grid>
        <Grid item xs={8}>
          <Button
            onClick={() => {
              this.getEnergy();
            }}
            variant="contained"
          >
            Get Energy Production
          </Button>
        </Grid>
        <Grid item xs={8}>
          <Typography variant="h6">{this.printHeader()}</Typography>
          <EnergyProduction energyData={this.state.energyData} />
        </Grid>
      </>
    );
  }
}

export default EnergyHandler;
