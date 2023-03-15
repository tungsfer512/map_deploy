import { Stack, Typography } from '@mui/material'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { Popup } from 'react-leaflet'

const PopupVehicleMarker = ({ vehicle, handleClickOpen }) => {
    const { t } = useTranslation()
    return (
        <Popup>
            <Stack spacing={0} direction="column" alignitems="flex-start">
                {/* format %.6f */}
                <p><strong>{t("vehicles.form.position")}:</strong> {vehicle.latitude.toFixed(6)}, {vehicle.longitude.toFixed(6)}</p>
                <p><strong>{t("vehicles.form.angle")}:</strong> {vehicle.angle}</p>
                <p><strong>{t("vehicles.form.speed")}:</strong> {vehicle.speed}</p>
                <p><strong>{t("vehicles.form.plate")}:</strong> {vehicle.plate}</p>
                <p><strong>{t("vehicles.form.status")}:</strong> {vehicle.status}</p>

                <Typography variant="body2" color="#2b82d4" component="p"
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'flex-end',
                        cursor: 'pointer',
                        fontSize: '13px',
                    }}
                    onClick={(e, item) => handleClickOpen(e, { ...vehicle, type: 'vehicle' })}>
                    {t("vehicles.detailed")}
                </Typography>
            </Stack>
        </Popup>
    )
}

export default PopupVehicleMarker