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
import { companiesSelector, getCompaniesDataAsync } from '../../store/reducers/companySlice';

import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import CompanyAction from './CompanyAction';
import { useTranslation } from 'react-i18next';

const Companies = () => {
  const { t } = useTranslation();
  const companies = useSelector(companiesSelector);
  console.log(companies);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCompaniesDataAsync());
  }, [dispatch]);

  const location = useLocation();

  // Click render ProblemItem
  const navigate = useNavigate();

  const handleRowClick = (param, event) => {
    console.log("Row:");
    console.log(param);
    console.log(event);
    console.log(location.pathname);
    navigate(`/companies/${param.row.id}`, { state: param.row });

  };

  const columns = [
    { field: 'id', align: "center", headerAlign: "center", headerClassName: 'super-app-theme--header', headerName: `${t("companies.table.id")}`, minWidth: 70, sortable: true, },
    {
      field: 'name', headerClassName: 'super-app-theme--header', headerName: `${t("companies.table.name")}`, minWidth: 160, flex: 1, sortable: true },
    { field: 'email', headerClassName: 'super-app-theme--header', headerName: `${t("companies.table.email")}`, minWidth: 160, flex: 1, sortable: false },
    { field: 'phone', headerClassName: 'super-app-theme--header', headerName: `${t("companies.table.phone")}`, minWidth: 120, flex: 1, sortable: false, },
    { field: 'address', headerClassName: 'super-app-theme--header', headerName: `${t("companies.table.address")}`, minWidth: 160, flex: 1, sortable: false, },
    {
      field: 'action', align: "center", headerAlign: "center", headerClassName: 'super-app-theme--header', headerName: `${t("companies.table.action")}`, flex: 1, minWidth: 150, sortable: false,
      renderCell: (params) => (
        <CompanyAction params={params} />
      )
    },
  ];

  return (
    <Fragment>
      <BoxContainer>
        <BoxTitle>
          <BoxStack>
            <Typography variant="h5" component="h1" fontWeight='bold' gutterBottom>
              {t("companies.pageName")}
              <Breadcrumbs maxItems={2} aria-label="breadcrumb" sx={{ mt: 1 }}>
                <Link underline="hover" color="inherit" href="">
                  {t("companies.home")}
                </Link>
                <Typography color="text.primary">
                  {t("companies.pageName")}
                </Typography>
              </Breadcrumbs>
            </Typography>

            {/* Add custom button to the toolbar */}
            {/* a link to /problems/Add */}
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={() => navigate('/companies/add')}
            >
              {t("companies.add")}
            </Button>
          </BoxStack>


          <DataTable rows={companies} columns={columns} />
        </BoxTitle>
      </BoxContainer>
    </Fragment >
  )
}

export default Companies