import { Stack, Typography } from '@mui/material'
import React from 'react'
import { useTranslation } from 'react-i18next';

const AlertContent = ({ data }) => {
    const { t } = useTranslation();
    return (
        <Stack spacing={0} direction="column">
            <Typography variant='caption' component='div'>
                <strong>{t("map.event")}: </strong> {data[2]}
            </Typography>
            {
                data[1]?.weight && <Typography variant='caption' component='div'>
                    <strong>{t("vehicles.form.weight")}:</strong> {data[1]?.weight} kg
                </Typography>
            }
            <Typography variant='caption' component='div'>
                <strong>{t("vehicles.form.position")}:</strong> {data[1].latitude.toFixed(4) + " " + data[1].longitude.toFixed(4)}
            </Typography>
            <Typography variant='caption' component='div'>
                <strong>{t("tableLog.time")}:</strong> {String(data[1].updatedAt).slice(0, 19).replace("T", " ")}
            </Typography>
        </Stack>
    )
}

export default AlertContent