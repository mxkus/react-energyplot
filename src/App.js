import { AppBar, Box, CssBaseline, Grid, Toolbar } from "@mui/material";
import ElectricBoltIcon from "@mui/icons-material/ElectricBolt";
import { Container } from "@mui/system";
import "./App.css";
import EnergyHandler from "./EnergyHandler";

function App() {
  return (
    <>
      <CssBaseline />
      <AppBar position="relative">
        <Toolbar>
          <ElectricBoltIcon />
        </Toolbar>
      </AppBar>
      <main>
        <div>
          <Box sx={{ p: 1 }}>
            <Container maxWidth="lg" className="container">
              <Grid container justify="center" spacing={2}>
                <EnergyHandler />
              </Grid>
            </Container>
          </Box>
        </div>
      </main>
    </>
  );
}

export default App;
