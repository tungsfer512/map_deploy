import { Stack, Typography } from '@mui/material'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { Popup } from 'react-leaflet'

const PopupBinMarker = ({ bin, handleClickOpen }) => {
    const { t } = useTranslation()
    return (
        <Popup>
            <Stack spacing={0} direction="column" alignitems="flex-start">
                <p><strong>{t("bins.form.position")}:</strong> {bin.latitude.toFixed(6)}, {bin.longitude.toFixed(6)}</p>
                <p><strong>{t("bins.table.weight")}:</strong> {bin.weight}</p>
                <p><strong>{t("bins.table.maxWeight")}:</strong> {bin.maxWeight}</p>
                <p><strong>{t("bins.table.status")}:</strong> {bin.status}</p>
                <Typography variant="body2" color="#2b82d4" component="p"
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'flex-end',
                        cursor: 'pointer',
                        fontSize: '13px',
                    }}
                    onClick={(e, item) => handleClickOpen(e, { ...bin, type: 'bin' })}>
                    {t("vehicles.detailed")}
                </Typography>

            </Stack>
        </Popup>
    )
}

export default PopupBinMarker