import { Stack } from "@mui/material";
import { Fragment } from "react";
import PageWrapper from "../components/PageWrapper/PageWrapper";
import Sidebar from "../components/Sidebar/Sidebar";
import ConnectSocket from "../socket/ConnectSocket";

const Layout = () => {
  const auth = JSON.parse(localStorage.getItem('user'));
  return (
    <Stack direction='row' sx={{ minWidth: { xs: 300, md: 600 } }}>
      <ConnectSocket>
        {!!auth && (auth.role.includes('admin') || auth.role.includes('company')) && <Sidebar />}
        <PageWrapper />
      </ConnectSocket>
    </Stack>
  )
};

export default Layout;