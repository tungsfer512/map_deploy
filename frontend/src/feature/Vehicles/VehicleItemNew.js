import { Box, Breadcrumbs, Button, Link, Paper, Stack, Typography, TextField } from '@mui/material';
import React, { useEffect, Fragment, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom';

import AttachFileIcon from '@mui/icons-material/AttachFile';
import SaveIcon from '@mui/icons-material/Save';
import { useDispatch } from 'react-redux';

import {
    postVehicleDataAsync,
    putVehicleDataAsync,
    getVehicleDataById
} from '../../store/reducers/vehicleSlice';
import { assetUrl } from '../../ultils/axiosApi';
import { useTranslation } from 'react-i18next';

const VehicleItemNew = ({ state }) => {
    const { t } = useTranslation();
    // state = "new" or "edit"
    const navigate = useNavigate();
    const location = useLocation();
    const params = useParams();
    console.log("Params:", params);
    console.log("Location:", location);

    let [click, setClick] = useState(false);

    const handleClick = (e) => {
        setClick(true);
    }
    // convert vehicleId to number
    const vehicleId = parseInt(params.vehicleId);

    const [vehicleItem, setVehicleItem] = useState(
        {
            engineHours: "",
            engineId: "",
            engineType: "",
            model: "",
            height: "",
            length: "",
            width: "",
            odometer: "",
            plate: "",
            code: "",
            tonnage: "",
            image: "",
            status: '',
            camera: '',
        }
    );

    const dispatch = useDispatch();
    useEffect(() => {
        if (state === "edit") {
            getVehicleDataById(vehicleId).then((result) => {
                console.log("Result:", result);
                setVehicleItem(result);
            });
        }
    }, [])

    console.log("VehicleItem:", vehicleItem);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setVehicleItem({ ...vehicleItem, [name]: value });
    }

    const handleInputChangeImage = (event) => {
        const { name, value } = event.target;
        setVehicleItem({ ...vehicleItem, [name]: URL.createObjectURL(event.target.files[0]) });
    }

    const handleSave = (event) => {
        event.preventDefault();
        const formVehicle = document.getElementById("formVehicle");
        const formData = new FormData(formVehicle);
        if (state === "new") {
            dispatch(postVehicleDataAsync(formData));
        }
        else if (state === "edit") {
            dispatch(putVehicleDataAsync({ formData, vehicleId }));
        }
        navigate("/vehicles");
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
                            {state === "new" ? `${t("vehicles.create")}` : `${t("vehicles.edit")}`}
                            <Breadcrumbs maxItems={3} aria-label="breadcrumb" sx={{ mt: 1 }}>
                                <Link underline="hover" color="inherit" href="">
                                    {t("vehicles.home")}
                                </Link>
                                <Link underline="hover" color="inherit" href="/vehicles">
                                    {t("vehicles.pageName")}
                                </Link>
                                <Typography color="text.primary">{state === "new" ? `${t("vehicles.add")}` : `${vehicleItem.plate}`}</Typography>
                            </Breadcrumbs>
                        </Typography>

                        {/* Edit problem item */}
                    </Stack>

                    {/*  form multipart */}
                    <Stack id='formVehicle' direction="row" alignItems="flex-start" justifyContent="space-between" component="form" noValidate autoComplete="off" encType="multipart/form-data" sx={{
                        gap: 3,
                        flexDirection: { xs: 'column', md: 'row' },
                    }}
                        onSubmit={handleSave}
                    >
                        <Paper sx={{ mt: 3, p: 2, flexGrow: 1, maxWidth: 1200 }}>
                            <Box sx={{ width: '100%', mt: 2 }}>
                                <Typography variant="h6" component="h3" fontWeight='bold' gutterBottom>
                                    {t("vehicles.form.infomation")}
                                </Typography>
                                <TextField id="outlined-basic" label={t("vehicles.form.plate")} variant="outlined" sx={{ width: '100%', mb: 2, mt: 1 }} onChange={handleInputChange} name="plate" value={vehicleItem ? vehicleItem.plate : ""} />
                                <TextField id="outlined-basic" label={t("vehicles.form.engineId")} variant="outlined" sx={{ width: '100%', mb: 2, mt: 1 }} value={vehicleItem.engineId} onChange={handleInputChange} name="engineId" />
                                <TextField id="outlined-basic" label={t("vehicles.form.engineType")} variant="outlined" sx={{ width: '100%', mb: 2, mt: 1 }} value={vehicleItem.engineType} onChange={handleInputChange} name="engineType" />
                                <TextField id="outlined-basic" label={t("vehicles.form.engineHours")} variant="outlined" sx={{ width: '100%', mb: 2, mt: 1 }} value={vehicleItem.engineHours} onChange={handleInputChange} name="engineHours" />
                                <TextField id="outlined-basic" label={t("vehicles.form.model")} variant="outlined" sx={{ width: '100%', mb: 2, mt: 1 }} value={vehicleItem.model} onChange={handleInputChange} name="model" />
                                <TextField id="outlined-basic" label={t("vehicles.form.odometer")} variant="outlined" sx={{ width: '100%', mb: 2, mt: 1 }} value={vehicleItem.odometer} onChange={handleInputChange} name="odometer" />
                                <TextField id="outlined-basic" label={t("vehicles.form.height")} variant="outlined" sx={{ width: '100%', mb: 2, mt: 1 }} value={vehicleItem.height} onChange={handleInputChange} name="height" />
                                <TextField id="outlined-basic" label={t("vehicles.form.length")} variant="outlined" sx={{ width: '100%', mb: 2, mt: 1 }} value={vehicleItem?.length} onChange={handleInputChange} name="length" />
                                <TextField id="outlined-basic" label={t("vehicles.form.width")} variant="outlined" sx={{ width: '100%', mb: 2, mt: 1 }} value={vehicleItem.width} onChange={handleInputChange} name="width" />
                                <TextField id="outlined-basic" label={t("vehicles.form.tonnage")} variant="outlined" sx={{ width: '100%', mb: 2, mt: 1 }} value={vehicleItem.tonnage} onChange={handleInputChange} name="tonnage" />
                                <TextField id="outlined-basic" label="Code" variant="outlined" sx={{ width: '100%', mb: 2, mt: 1 }} onChange={handleInputChange} name="code" value={vehicleItem ? vehicleItem.code : ""} />
                                <TextField id="outlined-basic" label="Camera" variant="outlined" sx={{ width: '100%', mb: 2, mt: 1 }} value={vehicleItem.camera} onChange={handleInputChange} name="camera" />

                            </Box>


                            {/* chosse image file and preview */}


                        </Paper>

                        <Box sx={{ mt: 2, minWidth: 300, width: "100%", maxWidth: { xs: '100%', md: 300 } }}>
                            <Paper sx={{ width: '100%', my: 1, p: 2, pt: 4 }}>
                                {/* <Typography variant="h6" component="h3" fontWeight='bold' gutterBottom>
                                    {t("vehicles.form.status")}
                                </Typography>
                                <TextField id="outlined-basic" label={t("vehicles.form.status")} variant="outlined" sx={{ width: '100%', mb: 2, mt: 1 }} value={vehicleItem.status} onChange={handleInputChange} name="status" />
                                <Typography variant="h6" component="h3" fontWeight='bold' gutterBottom>
                                {t("vehicles.form.position")}
                                </Typography>
                                <TextField id="outlined-basic" label={t("vehicles.form.latitude")} variant="outlined" sx={{ width: '100%', mb: 2, mt: 1 }} value={vehicleItem.latitude} onChange={handleInputChange} name="latitude" />
                                <TextField id="outlined-basic" label={t("vehicles.form.longitude")} variant="outlined" sx={{ width: '100%', mb: 2 }} value={vehicleItem.longitude} onChange={handleInputChange} name="longitude" />
                                <TextField id="outlined-basic" label={t("vehicles.form.angle")} variant="outlined" sx={{ width: '100%', mb: 2, mt: 1 }} value={vehicleItem.angle} onChange={handleInputChange} name="angle" /> */}

                                <Box sx={{ width: '100%', mb: 2 }}>
                                    <Typography variant="h6" component="h3" fontWeight='bold' gutterBottom>
                                        {t("vehicles.form.image")}
                                    </Typography>
                                    <label htmlFor="contained-button-file">
                                        <Button variant="contained" component="span"
                                            endIcon={<AttachFileIcon />}
                                            onClick={(e) => handleClick()}
                                        >
                                            {t("vehicles.form.upload")}
                                        </Button>
                                    </label>
                                    <input accept="image/*" id="contained-button-file" type="file" onChange={handleInputChangeImage} name="vehicle" style={{ display: "none" }} />

                                    <Box sx={{ width: '100%', mt: 2, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                        {state === "new" && vehicleItem.image && <img src={vehicleItem.image} alt="vehicle" width="220" height="220" />}
                                        {state === "edit" && <img src={click ? `${vehicleItem.image}` : `${assetUrl}/vehicle/${vehicleItem.image}`} alt="vehicle" width={220} height={220} />}
                                    </Box>
                                </Box>
                            </Paper>

                            <Box sx={{ width: '100%', my: 1 }}>
                                <Button variant="contained" color="primary" endIcon={<SaveIcon />} sx={{ width: '100%', mb: 2, mt: 1, py: 1.5 }} type="submit">
                                    {t("vehicles.form.save")}
                                </Button>
                            </Box>
                        </Box>
                    </Stack>



                </Box>
            </Fragment >
        </Box >
    )
}

export default VehicleItemNew