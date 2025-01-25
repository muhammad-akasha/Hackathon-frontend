import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid2";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
  ...theme.applyStyles("dark", {
    backgroundColor: "#1A2027",
  }),
}));

export default function BasicGrid() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      {/*Spacing for both side*/}
      <Grid container rowSpacing={2} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid size={{ xs: 10, sm: 10, md: 6, lg: 3 }}>
          <Item>size=8</Item>
        </Grid>
        <Grid size={{ xs: 10, sm: 10, md: 6, lg: 3 }}>
          <Item>size=4</Item>
        </Grid>
        <Grid size={{ xs: 10, sm: 10, md: 6, lg: 3 }}>
          <Item>size=4</Item>
        </Grid>
        <Grid size={{ xs: 10, sm: 10, md: 6, lg: 3 }}>
          <Item>size=8</Item>
        </Grid>
      </Grid>
    </Box>
  );
}
