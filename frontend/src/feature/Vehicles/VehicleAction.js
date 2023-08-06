import { Box, IconButton, Tooltip } from '@mui/material';
import PreviewIcon from '@mui/icons-material/Preview';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import React from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { deleteVehicleDataAsync } from '../../store/reducers/vehicleSlice';
import { useTranslation } from 'react-i18next';
import { isAdmin } from "../Auth/Role"

const VehicleAction = ({ params }) => {
    const {t} = useTranslation();
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const onPreview = (e) => {
        const currentRow = params.row;
        navigate(`/vehicles/${currentRow.id}`, { state: currentRow });
    };

    const onEdit = (e) => {
        const vehicle = params.row;
        navigate(`/vehicles/edit/${vehicle.id}`, { state: vehicle });
    };

    const onDelete = (e) => {
        const vehicleId = params.row.id;
        dispatch(deleteVehicleDataAsync(vehicleId))
        window.location.reload();
    };
    return (
        <Box >
            <Tooltip title={t("vehicles.preview")}>
                <IconButton onClick={onPreview}>
                    <PreviewIcon />
                </IconButton>
            </Tooltip>
            {
                isAdmin() &&
                <>
                    <Tooltip title={t("vehicles.edit")}>
                        <IconButton onClick={onEdit}>
                            <EditIcon />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title={t("vehicles.delete")}>
                        <IconButton onClick={onDelete}>
                            <DeleteIcon />
                        </IconButton>
                    </Tooltip>
                </>
            }
        </Box>
    )
}

export default VehicleAction