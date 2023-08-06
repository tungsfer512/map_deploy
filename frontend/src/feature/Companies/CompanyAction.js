import { Box, IconButton, Tooltip } from '@mui/material';
import PreviewIcon from '@mui/icons-material/Preview';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import React from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { deleteCompanyDataAsync } from '../../store/reducers/companySlice';
import { useTranslation } from 'react-i18next';

const CompanyAction = ({ params }) => {
    const { t } = useTranslation();
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const onPreview = (e) => {
        const currentRow = params.row;
        navigate(`/companies/${currentRow.id}`, { state: currentRow });
    };

    const onEdit = (e) => {
        const company = params.row;
        navigate(`/companies/edit/${company.id}`, { state: company });
    };

    const onDelete = (e) => {
        const companyId = params.row.id;
        dispatch(deleteCompanyDataAsync(companyId))
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

export default CompanyAction