import { SnackbarProvider,  } from 'notistack';
import { React  } from 'react';

const ConnectSocket = ({ children }) => {
    
    return (
        // Provider data to children
        <SnackbarProvider maxSnack={3} >
            {children}
        </SnackbarProvider>
    )
}

export default ConnectSocket

