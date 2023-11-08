import { Box, Breadcrumbs, Button, Link, Paper, Stack, Typography, TextField, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import React, { useEffect, Fragment, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom';

import AttachFileIcon from '@mui/icons-material/AttachFile';
import SaveIcon from '@mui/icons-material/Save';
import { useDispatch } from 'react-redux';

import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";

import {
  postCompanyDataAsync,
  putCompanyDataAsync,
  getCompanyDataById
} from '../../store/reducers/companySlice';
import { assetUrl } from '../../ultils/axiosApi';
import { useTranslation } from 'react-i18next';

const CompanyItemNew = ({ state }) => {
  const { t } = useTranslation();
  // state = "new" or "edit"
  const navigate = useNavigate();
  const location = useLocation();
  const params = useParams();
  const dispatch = useDispatch();

  let [click, setClick] = useState(false);

  const handleClick = (e) => {
    setClick(true);
  }
  // convert companyId to number
  const companyId = parseInt(params.companyId);
  // const [dob, setDob] = useState(new Date());

  const [companyItem, setCompanyItem] = useState(
    {
      id: 0,
      name: "",
      address: "",
      email: "",
      phone: "",
      image: "",
    }
  );

  useEffect(() => {
    if (state === "edit") {
      getCompanyDataById(companyId).then((result) => {
        console.log("Result:", result);
        setCompanyItem(result);
      });
    }
  }, [])

  console.log("CompanyItem:", companyItem);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setCompanyItem({ ...companyItem, [name]: value });
  }

  const handleInputChangeImage = (event) => {
    const { name, value } = event.target;
    setCompanyItem({ ...companyItem, image: URL.createObjectURL(event.target.files[0]) });
  }

  const handleSave = (event) => {
    event.preventDefault();
    const formCompany = document.getElementById("formCompany");
    const formData = new FormData(formCompany);
    // formData.append("dob", dob.toLocaleDateString('en-GB'));
    if (state === "new") {
      dispatch(postCompanyDataAsync(formData)).then((result) => {
        console.log("Result:", result);
        if (result.type === "companies/postCompany/rejected") {
          alert("Email or phone number already exists");
        }
        else if (result.type === "companies/postCompany/fulfilled") {
          navigate("/companies");
        }
      });
    }
    else if (state === "edit") {
      dispatch(putCompanyDataAsync({ formData, companyId })).then((result) => {
        console.log("Result:", result);
        navigate("/companies");
      });
    }
    // navigate("/companies");
  }

  return (
    <Box>
      <Fragment>
        <Box sx={{
          height: 'auto',
          py: 4,
          pt: 6,
          px: 2,
          maxWidth: 1200,
          margin: '0 auto',
        }}>
          <Stack direction="row" alignItems="flex-start" justifyContent="space-between">
            <Typography variant="h5" component="h1" fontWeight='bold' gutterBottom>
              {state === "new" ? `${t("companies.create")}` : `${t("companies.edit")}`}
              <Breadcrumbs maxItems={3} aria-label="breadcrumb" sx={{ mt: 1 }}>
                <Link underline="hover" color="inherit" href="">
                  {t("companies.home")}
                </Link>
                <Link underline="hover" color="inherit" href="/companies">
                  {t("companies.pageName")}
                </Link>
                <Typography color="text.primary">{state === "new" ? `${t("companies.add")}` : `${companyItem.name}`}</Typography>
              </Breadcrumbs>
            </Typography>

            {/* Edit problem item */}
          </Stack>

          {/*  form multipart */}
          <Stack id='formCompany' direction="row" alignItems="flex-start" justifyContent="space-between" component="form" noValidate autoComplete="off" encType="multipart/form-data" sx={{
            gap: 3,
            flexDirection: { xs: 'column', md: 'row' },
          }}
            onSubmit={handleSave}
          >
            <Paper sx={{ mt: 3, p: 2, flexGrow: 1, maxWidth: 1200 }}>
              <Box sx={{ width: '100%', mt: 2 }}>
                <Typography variant="h6" component="h3" fontWeight='bold' gutterBottom>
                  {t("companies.form.infomation")}
                </Typography>
                <TextField id="outlined-basic" label={t("companies.table.name")} variant="outlined" sx={{ width: '100%', mb: 2, mt: 1 }} value={companyItem.name} onChange={handleInputChange} name="name" />
                <TextField id="outlined-basic" label={t("companies.table.address")} variant="outlined" sx={{ width: '100%', mb: 2, mt: 1 }} value={companyItem.address} onChange={handleInputChange} name="address" />
                <TextField id="outlined-basic" label={t("companies.table.email")} variant="outlined" sx={{ width: '100%', mb: 2, mt: 1 }} value={companyItem.email} onChange={handleInputChange} name="email" />
                <TextField id="outlined-basic" label={t("companies.table.phone")} variant="outlined" sx={{ width: '100%', mb: 2, mt: 1 }} value={companyItem.phone} onChange={handleInputChange} name="phone" />
              </Box>
              {/* chosse image file and preview */}
            </Paper>

            <Box sx={{ mt: 2, minWidth: 300, width: "100%", maxWidth: { xs: '100%', md: 300 } }}>
              <Paper sx={{ width: '100%', my: 1, p: 2, pt: 4 }}>

                <Box sx={{ width: '100%', mb: 2, pt: 2 }}>
                  <Typography variant="h6" component="h3" fontWeight='bold' gutterBottom>
                    {t("companies.form.image")}
                  </Typography>
                  <label htmlFor="contained-button-file">
                    <Button variant="contained" component="span"
                      endIcon={<AttachFileIcon />}
                      onClick={(e) => handleClick()}
                    >
                      {t("companies.form.upload")}
                    </Button>
                  </label>
                  <input accept="image/*" id="contained-button-file" type="file" onChange={handleInputChangeImage} name="company" style={{ display: "none" }} />

                  <Box sx={{ width: '100%', mt: 2, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    {state === "new" && companyItem.image && <img src={companyItem.image} alt="company" width="220" height="220" />}
                    {state === "edit" && <img src={click ? `${companyItem.image}` : `${assetUrl}/company/${companyItem.image}`} alt="company" width={220} height={220} />}
                  </Box>
                </Box>
              </Paper>

              <Box sx={{ width: '100%', my: 1 }}>
                <Button variant="contained" color="primary" endIcon={<SaveIcon />} sx={{ width: '100%', mb: 2, mt: 1, py: 1.5 }} type="submit">
                  {t("companies.form.save")}
                </Button>
              </Box>
            </Box>
          </Stack>



        </Box>
      </Fragment >
    </Box >
  )
}

export default CompanyItemNew