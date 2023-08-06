import { Box, Breadcrumbs, Button, Link, Paper, Stack, Typography, TextField } from '@mui/material';
import React, { useEffect, Fragment, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom';

import AttachFileIcon from '@mui/icons-material/AttachFile';
import SaveIcon from '@mui/icons-material/Save';
import { useDispatch } from 'react-redux';

import {
    postBinDataAsync,
    putBinDataAsync,
    getBinDataById
} from '../../store/reducers/binSlice';
import { assetUrl } from '../../ultils/axiosApi';
import { useTranslation } from 'react-i18next';

const BinItemNew = ({ state }) => {
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
    // convert binId to number
    const binId = parseInt(params.binId);

    const [binItem, setBinItem] = useState(
        {
            id: 0,
            companyId: "",
            latitude: "",
            longitude: "",
            // address: "",
            height: "",
            length: "",
            width: "",
            maxWeight: "",
            color: '',
            material: '',
            brand: '',
            description: '',
            status: '',
            image: "",
            code: "",
            camera1: "",
            camera2: "",
            camera3: "",
        }
    );

    const dispatch = useDispatch();
    useEffect(() => {
        if (state === "edit") {
            getBinDataById(binId).then((result) => {
                console.log("Result:", result);
                setBinItem(result);
            });
        }
    }, [])

    console.log("BinItem:", binItem);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setBinItem({ ...binItem, [name]: value });
    }

    const handleInputChangeImage = (event) => {
        const { name, value } = event.target;
        setBinItem({ ...binItem, [name]: URL.createObjectURL(event.target.files[0]) });
    }

    const handleSave = (event) => {
        event.preventDefault();
        const formBin = document.getElementById("formBin");
        const formData = new FormData(formBin);
        if (state === "new") {
            dispatch(postBinDataAsync(formData));
        }
        else if (state === "edit") {
            dispatch(putBinDataAsync({ formData, binId }));
        }
        navigate("/bins");
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
                            {state === "new" ? `${t("bins.create")}` : `${t("bins.edit")}`}
                            <Breadcrumbs maxItems={3} aria-label="breadcrumb" sx={{ mt: 1 }}>
                                <Link underline="hover" color="inherit" href="">
                                    {t("bins.home")}
                                </Link>
                                <Link underline="hover" color="inherit" href="/bins">
                                    {t("bins.pageName")}
                                </Link>
                                <Typography color="text.primary">{state === "new" ? `${t("bins.add")}` : `ID: ${binItem.id}`}</Typography>
                            </Breadcrumbs>
                        </Typography>

                        {/* Edit problem item */}
                    </Stack>

                    {/*  form multipart */}
                    <Stack id='formBin' direction="row" alignItems="flex-start" justifyContent="space-between" component="form" noValidate autoComplete="off" encType="multipart/form-data" sx={{
                        gap: 3,
                        flexDirection: { xs: 'column', md: 'row' },
                    }}
                        onSubmit={handleSave}
                    >
                        <Paper sx={{ mt: 3, p: 2, flexGrow: 1, maxWidth: 1200 }}>
                            <Box sx={{ width: '100%', mt: 2 }}>
                                <Typography variant="h6" component="h3" fontWeight='bold' gutterBottom>
                                    {t("bins.form.infomation")}
                                </Typography>
                                <TextField id="outlined-basic" label={t("bins.table.companyId")} variant="outlined" sx={{ width: '100%', mb: 2, mt: 1 }} value={binItem.companyId} onChange={handleInputChange} name="companyId" />
                                {/* <TextField id="outlined-basic" label={t("bins.table.address")} variant="outlined" sx={{ width: '100%', mb: 2, mt: 1 }} value={binItem.address} onChange={handleInputChange} name="address" /> */}
                                <TextField id="outlined-basic" label={t("bins.table.height")} variant="outlined" sx={{ width: '100%', mb: 2, mt: 1 }} value={binItem.height} onChange={handleInputChange} name="height" />
                                <TextField id="outlined-basic" label={t("bins.table.length")} variant="outlined" sx={{ width: '100%', mb: 2, mt: 1 }} value={binItem?.length} onChange={handleInputChange} name="length" />
                                <TextField id="outlined-basic" label={t("bins.table.width")} variant="outlined" sx={{ width: '100%', mb: 2, mt: 1 }} value={binItem.width} onChange={handleInputChange} name="width" />
                                <TextField id="outlined-basic" label={t("bins.table.maxWeight")} variant="outlined" sx={{ width: '100%', mb: 2, mt: 1 }} value={binItem.maxWeight} onChange={handleInputChange} name="maxWeight" />
                                <TextField id="outlined-basic" label={t("bins.table.color")} variant="outlined" sx={{ width: '100%', mb: 2, mt: 1 }} value={binItem.color} onChange={handleInputChange} name="color" />
                                <TextField id="outlined-basic" label={t("bins.table.material")} variant="outlined" sx={{ width: '100%', mb: 2, mt: 1 }} value={binItem.material} onChange={handleInputChange} name="material" />
                                <TextField id="outlined-basic" label={t("bins.table.brand")} variant="outlined" sx={{ width: '100%', mb: 2, mt: 1 }} value={binItem.brand} onChange={handleInputChange} name="brand" />
                                <TextField id="outlined-basic" label="Code" variant="outlined" sx={{ width: '100%', mb: 2, mt: 1 }} value={binItem.code} onChange={handleInputChange} name="code" />
                                <TextField id="outlined-basic" label="Camera 1" variant="outlined" sx={{ width: '100%', mb: 2, mt: 1 }} value={binItem.camera1} onChange={handleInputChange} name="camera1" />
                                <TextField id="outlined-basic" label="Camera 2" variant="outlined" sx={{ width: '100%', mb: 2, mt: 1 }} value={binItem.camera2} onChange={handleInputChange} name="camera2" />
                                <TextField id="outlined-basic" label="Camera 3" variant="outlined" sx={{ width: '100%', mb: 2, mt: 1 }} value={binItem.camera3} onChange={handleInputChange} name="camera3" />

                            </Box>


                            {/* chosse image file and preview */}


                        </Paper>

                        <Box sx={{ mt: 2, minWidth: 300, width: "100%", maxWidth: { xs: '100%', md: 300 } }}>
                            <Paper sx={{ width: '100%', my: 1, p: 2, pt: 4 }}>
                                {/* <Typography variant="h6" component="h3" fontWeight='bold' gutterBottom>
                                    {t("bins.table.status")}
                                </Typography>
                                 */}

                                <Typography variant="h6" component="h3" fontWeight='bold' gutterBottom>
                                    {t("bins.form.position")}
                                </Typography>
                                <TextField id="outlined-basic" label={t("bins.table.latitude")} variant="outlined" sx={{ width: '100%', mb: 2, mt: 1 }} value={binItem.latitude} onChange={handleInputChange} name="latitude" />
                                <TextField id="outlined-basic" label={t("bins.table.longitude")} variant="outlined" sx={{ width: '100%', mb: 2 }} value={binItem.longitude} onChange={handleInputChange} name="longitude" />

                                <Box sx={{ width: '100%', mb: 2 }}>
                                    <Typography variant="h6" component="h3" fontWeight='bold' gutterBottom>
                                        {t("bins.form.image")}
                                    </Typography>
                                    <label htmlFor="contained-button-file">
                                        <Button variant="contained" component="span"
                                            endIcon={<AttachFileIcon />}
                                            onClick={(e) => handleClick()}
                                        >
                                            {t("bins.form.upload")}
                                        </Button>
                                    </label>
                                    <input accept="image/*" id="contained-button-file" type="file" onChange={handleInputChangeImage} name="bin" style={{ display: "none" }} />

                                    <Box sx={{ width: '100%', mt: 2, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                        {state === "new" && binItem.image && <img src={binItem.image} alt="bin" width="220" height="220" />}
                                        {state === "edit" && <img src={click ? `${binItem.image}` : `${assetUrl}/bin/${binItem.image}`} alt="bin" width={220} height={220} />}
                                    </Box>
                                </Box>
                            </Paper>

                            <Box sx={{ width: '100%', my: 1 }}>
                                <Button variant="contained" color="primary" endIcon={<SaveIcon />} sx={{ width: '100%', mb: 2, mt: 1, py: 1.5 }} type="submit">
                                    {t("bins.form.save")}
                                </Button>
                            </Box>
                        </Box>
                    </Stack>
                </Box>
            </Fragment >
        </Box >
    )
}

export default BinItemNew