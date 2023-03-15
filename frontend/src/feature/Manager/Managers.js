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
import { managersSelector, getManagersDataAsync } from '../../store/reducers/managerSlice';

import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import ManagerAction from './ManagerAction';
import { useTranslation } from 'react-i18next';

const Managers = () => {
  const { t } = useTranslation();
  const managers = useSelector(managersSelector);
  console.log(managers);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getManagersDataAsync());
  }, [dispatch]);

  const location = useLocation();

  // Click render ProblemItem
  const navigate = useNavigate();

  const handleRowClick = (param, event) => {
    console.log("Row:");
    console.log(param);
    console.log(event);
    console.log(location.pathname);
    navigate(`/managers/${param.row.id}`, { state: param.row });

  };

  const columns = [
    { field: 'id', align: "center", headerAlign: "center", headerClassName: 'super-app-theme--header', headerName: `${t("managers.table.id")}`, minWidth: 70, sortable: false, },
    {
      field: 'fullname', headerClassName: 'super-app-theme--header', headerName: `${t("managers.table.fullname")}`, minWidth: 160, flex: 1, sortable: true,
      renderCell: (params) => (
        `${params.row.firstName} ${params.row.lastName}`
      )
    },
    { field: 'email', headerClassName: 'super-app-theme--header', headerName: `${t("managers.table.email")}`, minWidth: 160, flex: 1, sortable: false },
    { field: 'firstName', headerClassName: 'super-app-theme--header', headerName: `${t("managers.table.firstName")}`, minWidth: 120, flex: 1, sortable: true, },
    { field: 'lastName', headerClassName: 'super-app-theme--header', headerName: `${t("managers.table.lastName")}`, minWidth: 100, flex: 1, sortable: true, },
    { field: 'dob', headerClassName: 'super-app-theme--header', headerName: `${t("managers.table.dob")}`, minWidth: 120, flex: 1, sortable: true, },
    { field: 'phone', headerClassName: 'super-app-theme--header', headerName: `${t("managers.table.phone")}`, minWidth: 120, flex: 1, sortable: false, },
    {
      field: 'gender', align: "center", headerAlign: "center", headerClassName: 'super-app-theme--header', headerName: `${t("managers.table.gender")}`, minWidth: 80, flex: 1, sortable: true,
      renderCell: (params) => (
        `${params.row.gender}` === "male" ? `${t("managers.table.male")}` : `${t("managers.table.female")}`
      )
    },
    {
      field: 'action', align: "center", headerAlign: "center", headerClassName: 'super-app-theme--header', headerName: `${t("managers.table.action")}`, flex: 1, minWidth: 150, sortable: false,
      renderCell: (params) => (
        <ManagerAction params={params} />
      )
    },
  ];

  return (
    <Fragment>
      <BoxContainer>
        <BoxTitle>
          <BoxStack>
            <Typography variant="h5" component="h1" fontWeight='bold' gutterBottom>
              {t("managers.pageName")}
              <Breadcrumbs maxItems={2} aria-label="breadcrumb" sx={{ mt: 1 }}>
                <Link underline="hover" color="inherit" href="">
                  {t("managers.home")}
                </Link>
                <Typography color="text.primary">
                  {t("managers.pageName")}
                </Typography>
              </Breadcrumbs>
            </Typography>

            {/* Add custom button to the toolbar */}
            {/* a link to /problems/Add */}
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={() => navigate('/managers/add')}
            >
              {t("managers.add")}
            </Button>
          </BoxStack>


          <DataTable rows={managers} columns={columns} />
        </BoxTitle>
      </BoxContainer>
    </Fragment >
  )
}

export default Managers