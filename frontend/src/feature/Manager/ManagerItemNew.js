import { Box, Breadcrumbs, Button, Link, Paper, Stack, Typography, TextField, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import React, { useEffect, Fragment, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom';

import AttachFileIcon from '@mui/icons-material/AttachFile';
import SaveIcon from '@mui/icons-material/Save';
import { useDispatch } from 'react-redux';

import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";

import {
  postManagerDataAsync,
  putManagerDataAsync,
  getManagerDataById
} from '../../store/reducers/managerSlice';
import { assetUrl } from '../../ultils/axiosApi';
import { useTranslation } from 'react-i18next';

const ManagerItemNew = ({ state }) => {
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
  // convert managerId to number
  const managerId = parseInt(params.managerId);
  const [dob, setDob] = useState(new Date());

  const [managerItem, setManagerItem] = useState(
    {
      id: 0,
      firstName: "",
      lastName: "",
      gender: "",
      email: "",
      phone: "",
      password: "",
      image: "",
    }
  );

  useEffect(() => {
    if (state === "edit") {
      getManagerDataById(managerId).then((result) => {
        console.log("Result:", result);
        setManagerItem(result);
      });
    }
  }, [])

  console.log("ManagerItem:", managerItem);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setManagerItem({ ...managerItem, [name]: value });
  }

  const handleInputChangeImage = (event) => {
    const { name, value } = event.target;
    setManagerItem({ ...managerItem, image: URL.createObjectURL(event.target.files[0]) });
  }

  const handleSave = (event) => {
    event.preventDefault();
    const formManager = document.getElementById("formManager");
    const formData = new FormData(formManager);
    formData.append("dob", dob.toLocaleDateString('en-GB'));
    if (state === "new") {
      dispatch(postManagerDataAsync(formData)).then((result) => {
        console.log("Result:", result);
        if(result.type === "users/managers/postManager/rejected"){
          alert("Email or phone number already exists");
        }
        else if (result.type === "users/managers/postManager/fulfilled"){
          navigate("/managers");
        }
      });
    }
    else if (state === "edit") {
      dispatch(putManagerDataAsync({ formData, managerId })).then((result) => {
        console.log("Result:", result);
        navigate("/managers");
      });
    }
    // navigate("/managers");
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
              {state === "new" ? `${t("managers.create")}` : `${t("managers.edit")}`}
              <Breadcrumbs maxItems={3} aria-label="breadcrumb" sx={{ mt: 1 }}>
                <Link underline="hover" color="inherit" href="">
                  {t("managers.home")}
                </Link>
                <Link underline="hover" color="inherit" href="/managers">
                  {t("managers.pageName")}
                </Link>
                <Typography color="text.primary">{state === "new" ? `${t("managers.add")}` : `${managerItem.firstName} ${managerItem.lastName}`}</Typography>
              </Breadcrumbs>
            </Typography>

            {/* Edit problem item */}
          </Stack>

          {/*  form multipart */}
          <Stack id='formManager' direction="row" alignItems="flex-start" justifyContent="space-between" component="form" noValidate autoComplete="off" encType="multipart/form-data" sx={{
            gap: 3,
            flexDirection: { xs: 'column', md: 'row' },
          }}
            onSubmit={handleSave}
          >
            <Paper sx={{ mt: 3, p: 2, flexGrow: 1, maxWidth: 1200 }}>
              <Box sx={{ width: '100%', mt: 2 }}>
                <Typography variant="h6" component="h3" fontWeight='bold' gutterBottom>
                  {t("managers.form.infomation")}
                </Typography>
                <TextField id="outlined-basic" label={t("managers.table.firstName")} variant="outlined" sx={{ width: '100%', mb: 2, mt: 1 }} value={managerItem.firstName} onChange={handleInputChange} name="firstName" />
                <TextField id="outlined-basic" label={t("managers.table.lastName")} variant="outlined" sx={{ width: '100%', mb: 2, mt: 1 }} value={managerItem.lastName} onChange={handleInputChange} name="lastName" />
                <TextField id="outlined-basic" label={t("managers.table.email")} variant="outlined" sx={{ width: '100%', mb: 2, mt: 1 }} value={managerItem.email} onChange={handleInputChange} name="email" />
                <TextField id="outlined-basic" label={t("managers.table.phone")} variant="outlined" sx={{ width: '100%', mb: 2, mt: 1 }} value={managerItem.phone} onChange={handleInputChange} name="phone" />
                <TextField id="outlined-basic" label={t("login.password")} type={"password"} variant="outlined" sx={{ width: '100%', mb: 2, mt: 1 }} value={managerItem.password} onChange={handleInputChange} name="password" />

              </Box>


              {/* chosse image file and preview */}


            </Paper>

            <Box sx={{ mt: 2, minWidth: 300, width: "100%", maxWidth: { xs: '100%', md: 300 } }}>
              <Paper sx={{ width: '100%', my: 1, p: 2, pt: 4 }}>
                <Typography variant="h6" component="h3" fontWeight='bold' gutterBottom>
                  {t("managers.table.gender")}
                </Typography>
                <FormControl fullWidth
                  sx={{
                    mb: 1,
                  }}
                >
                  <InputLabel id="gender">{t("managers.table.gender")}</InputLabel>
                  <Select
                    labelId="gender"
                    id="gender"
                    value={managerItem.gender}
                    name="gender"
                    label={t("managers.table.gender")}
                    onChange={handleInputChange}
                  >
                    <MenuItem value={"male"}>{t("managers.table.male")}</MenuItem>
                    <MenuItem value={"female"}>{t("managers.table.female")}</MenuItem>

                  </Select>
                </FormControl>
                <Box
                  sx={{
                    width: '100%',
                    height: '40px',
                    position: 'relative',
                    alignItems: 'center',
                    marginBottom: '56px',
                    "& label": {
                      paddingLeft: '0px',
                      fontSize: 14,
                      width: '100%',
                    },
                    "& .dob": {
                      padding: '12px 16px',
                      border: '1px solid #ccc',
                      borderRadius: '4px',
                      width: '100%',
                      height: '56px',
                    },
                  }}>
                  <label htmlFor="dob">
                    <Typography variant="h6" component="h3" fontWeight='bold' gutterBottom >
                      {t("managers.table.dob")}
                    </Typography>
                  </label>
                  <DatePicker
                    className='dob'
                    format="dd/MM/yyyy"
                    peekNextMonth
                    showMonthDropdown
                    showYearDropdown
                    dropdownMode="select"
                    popperPlacement="bottom-end"
                    selected={dob} onChange={(date) => setDob(date)} />
                </Box>

                <Box sx={{ width: '100%', mb: 2, pt: 2 }}>
                  <Typography variant="h6" component="h3" fontWeight='bold' gutterBottom>
                    {t("managers.form.image")}
                  </Typography>
                  <label htmlFor="contained-button-file">
                    <Button variant="contained" component="span"
                      endIcon={<AttachFileIcon />}
                      onClick={(e) => handleClick()}
                    >
                      {t("managers.form.upload")}
                    </Button>
                  </label>
                  <input accept="image/*" id="contained-button-file" type="file" onChange={handleInputChangeImage} name="user" style={{ display: "none" }} />

                  <Box sx={{ width: '100%', mt: 2, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    {state === "new" && managerItem.image && <img src={managerItem.image} alt="manager" width="220" height="220" />}
                    {state === "edit" && <img src={click ? `${managerItem.image}` : `${assetUrl}/user/${managerItem.image}`} alt="manager" width={220} height={220} />}
                  </Box>
                </Box>
              </Paper>

              <Box sx={{ width: '100%', my: 1 }}>
                <Button variant="contained" color="primary" endIcon={<SaveIcon />} sx={{ width: '100%', mb: 2, mt: 1, py: 1.5 }} type="submit">
                  {t("managers.form.save")}
                </Button>
              </Box>
            </Box>
          </Stack>



        </Box>
      </Fragment >
    </Box >
  )
}

export default ManagerItemNew