import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { createTheme, ThemeProvider } from "@mui/material/styles";
import App from './App';

import './index.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
// import { fontFamily, fontWeight } from '@mui/system';


const theme = createTheme({
    palette: {
        primary: {
            main: '#fafafa', //white
        },
        secondary: {
            main: '#ff4655' //red (for buttons etc.)
        }
    },

    components: {
        MuiInputLabel: {
            styleOverrides: {
                root: {
                    color: '#5f615f',
                    textTransform: 'uppercase',
                    fontSize: "0.7rem",
                    // fontFamily: "Roboto",
                    fontWeight: "bold",
                    // backgroundColor: "white"
                }
            }
        },

        
    }


});

ReactDOM.render(
    <ThemeProvider theme={theme}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </ThemeProvider>,
    document.getElementById('root')
);
