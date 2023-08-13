// @mui
import { Typography, Box, Stack, Button, Breadcrumbs, Link } from '@mui/material';
import { Fragment, useEffect } from 'react';
import AddIcon from '@mui/icons-material/Add';

import {
  BoxContainer,
  BoxTitle,
  BoxStack,
} from '../../components/Box/BoxContainer';
import { DataTable } from '../../components/DataTable';
import { driversSelector, getDriversDataAsync } from '../../store/reducers/driverSlice';

import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import DriverAction from './DriverAction';
import { useTranslation } from 'react-i18next';
import { isAdmin } from "../Auth/Role"

const Drivers = () => {
  const { t } = useTranslation();
  const drivers = useSelector(driversSelector);
  console.log(drivers);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getDriversDataAsync());
  }, [dispatch]);

  const location = useLocation();

  // Click render ProblemItem
  const navigate = useNavigate();

  const handleRowClick = (param, event) => {
    console.log("Row:");
    console.log(param);
    console.log(event);
    console.log(location.pathname);
    navigate(`/drivers/${param.row.id}`, { state: param.row });

  };

  const columns = [
    { field: 'id', align: "center", headerAlign: "center", headerClassName: 'super-app-theme--header', headerName: `${t("drivers.table.id")}`, minWidth: 70, sortable: false, },
    {
      field: 'fullname', headerClassName: 'super-app-theme--header', headerName: `${t("drivers.table.fullname")}`, minWidth: 160, flex: 1, sortable: true,
      renderCell: (params) => (
        `${params.row.lastName} ${params.row.firstName}`
      )
    },
    { field: 'email', headerClassName: 'super-app-theme--header', headerName: `${t("drivers.table.email")}`, minWidth: 160, flex: 1, sortable: false },
    // { field: 'lastName', headerClassName: 'super-app-theme--header', headerName: `${t("drivers.table.lastName")}`, minWidth: 120, flex: 1, sortable: true, },
    // { field: 'firstName', headerClassName: 'super-app-theme--header', headerName: `${t("drivers.table.firstName")}`, minWidth: 100, flex: 1, sortable: true, },
    { field: 'dob', headerClassName: 'super-app-theme--header', headerName: `${t("drivers.table.dob")}`, minWidth: 120, flex: 1, sortable: true, },
    { field: 'phone', headerClassName: 'super-app-theme--header', headerName: `${t("drivers.table.phone")}`, minWidth: 120, flex: 1, sortable: false, },
    {
      field: 'gender', align: "center", headerAlign: "center", headerClassName: 'super-app-theme--header', headerName: `${t("drivers.table.gender")}`, minWidth: 80, flex: 1, sortable: true,
      renderCell: (params) => (
        `${params.row.gender}` === "male" ? `${t("drivers.table.male")}` : `${t("drivers.table.female")}`
      )
    },
    {
      field: 'action', align: "center", headerAlign: "center", headerClassName: 'super-app-theme--header', headerName: `${t("drivers.table.action")}`, flex: 1, minWidth: 150, sortable: false,
      renderCell: (params) => (
        <DriverAction params={params} />
      )
    },
  ];

  return (
    <Fragment>
      <BoxContainer>
        <BoxTitle>
          <BoxStack>
            <Typography variant="h5" component="h1" fontWeight='bold' gutterBottom>
              {t("drivers.pageName")}
              <Breadcrumbs maxItems={2} aria-label="breadcrumb" sx={{ mt: 1 }}>
                <Link underline="hover" color="inherit" href="">
                  {t("drivers.home")}
                </Link>
                <Typography color="text.primary">
                  {t("drivers.pageName")}
                </Typography>
              </Breadcrumbs>
            </Typography>

            {/* Add custom button to the toolbar */}
            {/* a link to /problems/Add */}
            {
              isAdmin() &&
              <Button
                variant="contained"
                startIcon={<AddIcon />}
                onClick={() => navigate('/drivers/add')}
              >
                {t("drivers.add")}
              </Button>
            }
          </BoxStack>


          <DataTable rows={drivers} columns={columns} />
        </BoxTitle>
      </BoxContainer>
    </Fragment >
  )
}

export default Drivers