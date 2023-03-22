import SearchForm from "./SearchForm";
import MenuBar from "./MenuBar";
import Box from '@mui/material/Box';
import { Button, Stack } from "@mui/material";
import { useSnackbar } from "notistack";
import { useState } from "react";
import { useEffect } from "react";

function Header() {
  return (
    <Box>
      <Stack sx={{
        display: 'flex', justifyContent: "space-between", alignItems: "center", py: 1, px: { xs: 0, sm: 5 }
      }} spacing={1} direction="row">
        <SearchForm />
        {/* if dataSocket then button auto click */}
        <MenuBar />
      </Stack>
    </ Box>
  );
}

export default Header;