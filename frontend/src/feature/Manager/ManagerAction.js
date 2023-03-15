import { Box, IconButton, Tooltip } from '@mui/material';
import PreviewIcon from '@mui/icons-material/Preview';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import React from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { deleteManagerDataAsync } from '../../store/reducers/managerSlice';
import { useTranslation } from 'react-i18next';

const ManagerAction = ({ params }) => {
    const { t } = useTranslation();
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const onPreview = (e) => {
        const currentRow = params.row;
        navigate(`/managers/${currentRow.id}`, { state: currentRow });
    };

    const onEdit = (e) => {
        const manager = params.row;
        navigate(`/managers/edit/${manager.id}`, { state: manager });
    };

    const onDelete = (e) => {
        const managerId = params.row.id;
        dispatch(deleteManagerDataAsync(managerId))
        window.location.reload();
    };
    return (
        <Box >
            <Tooltip title={t('drivers.preview')}>
                <IconButton onClick={onPreview}>
                    <PreviewIcon />
                </IconButton>
            </Tooltip>
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
        </Box>
    )
}

export default ManagerAction