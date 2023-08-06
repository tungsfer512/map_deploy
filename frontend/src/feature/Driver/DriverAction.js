import { Box, IconButton, Tooltip } from '@mui/material';
import PreviewIcon from '@mui/icons-material/Preview';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import React from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { deleteDriverDataAsync } from '../../store/reducers/driverSlice';
import { useTranslation } from 'react-i18next';
import { isAdmin } from "../Auth/Role"

const DriverAction = ({ params }) => {
    const { t } = useTranslation();
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const onPreview = (e) => {
        const currentRow = params.row;
        navigate(`/drivers/${currentRow.id}`, { state: currentRow });
    };

    const onEdit = (e) => {
        const driver = params.row;
        navigate(`/drivers/edit/${driver.id}`, { state: driver });
    };

    const onDelete = (e) => {
        const driverId = params.row.id;
        dispatch(deleteDriverDataAsync(driverId))
        window.location.reload();
    };
    return (
        <Box >
            <Tooltip title={t('drivers.preview')}>
                <IconButton onClick={onPreview}>
                    <PreviewIcon />
                </IconButton>
            </Tooltip>
            {
                isAdmin() &&
                <>
                    <Tooltip title={t('drivers.edit')}>
                        <IconButton onClick={onEdit}>
                            <EditIcon />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title={t('drivers.delete')}>
                        <IconButton onClick={onDelete}>
                            <DeleteIcon />
                        </IconButton>
                    </Tooltip>
                </>
            }
        </Box>
    )
}

export default DriverAction