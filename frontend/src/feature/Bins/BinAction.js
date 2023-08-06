import { Box, IconButton, Tooltip } from '@mui/material';
import PreviewIcon from '@mui/icons-material/Preview';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import React from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { deleteBinDataAsync } from '../../store/reducers/binSlice';
import { useTranslation } from 'react-i18next';
import { isAdmin } from "../Auth/Role"

const BinAction = ({ params }) => {
    const {t} = useTranslation();
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const onPreview = (e) => {
        const currentRow = params.row;
        navigate(`/bins/${currentRow.id}`, { state: currentRow });
    };

    const onEdit = (e) => {
        const bin = params.row;
        navigate(`/bins/edit/${bin.id}`, { state: bin });
    };

    const onDelete = (e) => {
        const binId = params.row.id;
        dispatch(deleteBinDataAsync(binId))
        window.location.reload();
    };
    return (
        <Box >
            <Tooltip title={t("bins.preview")}>
                <IconButton onClick={onPreview}>
                    <PreviewIcon />
                </IconButton>
            </Tooltip>
            {
                isAdmin() &&
                <>
                    <Tooltip title={t("bins.edit")}>
                        <IconButton onClick={onEdit}>
                            <EditIcon />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title={t("bins.delete")}>
                        <IconButton onClick={onDelete}>
                            <DeleteIcon />
                        </IconButton>
                    </Tooltip>
                </>
            }
        </Box>
    )
}

export default BinAction