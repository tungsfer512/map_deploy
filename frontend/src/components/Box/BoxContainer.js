import { Box, Stack } from '@mui/material';

export const BoxContainer = (props) => (
    <Box
        sx={{
            height: 'auto',
            py: 4,
            pt: 6,
            px: 2,
            maxWidth: 1200,
            width: '100%',
            margin: '0 auto',
        }}
    >
        {props.children}
    </Box>
);

export const BoxTitle = (props) => (
    <Box
        sx={{
            // height: 300,
            width: '100%',
            '& .super-app-theme--header': {
                // backgroundColor: '#ececec',
            },
            '& .MuiDataGrid-columnHeaderTitle': {
                fontWeight: '600',
            }
        }}
    >
        {props.children}
    </Box>
);

export const BoxStack = (props) => (
    <Stack
        direction='row'
        sx={{
            py: { xs: 1, md: 3 },
            pt: { xs: 3, md: 2 },
            px: 0,
            justifyContent: {
                xs: "center",
                sm: "space-between",
                md: "space-between",
                lg: "space-between",
            },
            alignItems: {
                xs: "space-between",
                sm: "center",
                md: "center",
                lg: "center",
            },
            flexDirection: {
                xs: "column",
                sm: "row",
                md: "row",
                lg: "row",
            },
        }}
    >
        {props.children}
    </Stack>
);