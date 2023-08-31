import { Stack, Typography } from '@mui/material'
import React from 'react'
import { useTranslation } from 'react-i18next';

const AlertResetContent = ({ data }) => {
    const { t } = useTranslation();
    return (
        <Stack spacing={0} direction="column">
            <Typography variant='caption' component='div'>
                <strong>Rác đã được thu gom</strong>
            </Typography>
            <Typography variant='caption' component='div'>
                {data}
            </Typography>
        </Stack>
    )
}

export default AlertResetContent