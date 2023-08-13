import { Stack, Typography } from '@mui/material'
import React from 'react'
import { useTranslation } from 'react-i18next';

const AlertContent = ({ data }) => {
    const { t } = useTranslation();
    return (
        <Stack spacing={0} direction="column">
            <Typography variant='caption' component='div'>
                <strong>Có lỗi xảy ra khi gọi API</strong>
            </Typography>
            <Typography variant='caption' component='div'>
                {data}
            </Typography>
        </Stack>
    )
}

export default AlertContent