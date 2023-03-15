import { Box } from '@mui/material'
import React, { Fragment } from 'react'
import { Outlet } from 'react-router-dom'
import ConnectSocket from '../../socket/ConnectSocket'
import Appbar from '../Header/Appbar'
import Header from '../Header/Header'

const PageWrapper = () => {
    return (
        <Box sx={{ flexGrow: 1, height: 'max-content', borderLeft: "1px solid rgba(145, 158, 171, 0.24)", minHeight: "100vh" }}>
            <Header />
            <Box sx={{
                height: 'max-content',
                minWidth: { xs: 300, sm: 600, md: 900 },
                px: { xs: 0, md: 0 },
                // maxWidth: 1200,
                margin: 'auto',
                // minHeight: '100vh',
                flexGrow: 1,
            }} >
                <Outlet />
            </Box>

        </Box>
    )
}

export default PageWrapper