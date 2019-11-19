import { red } from "@material-ui/core/colors";
import { createMuiTheme } from "@material-ui/core/styles";

// A custom theme for this app
const theme = createMuiTheme({
    palette: {
        primary: {
            main: "#accd2d"
        },
        secondary: {
            main: "#fff"
        },
        error: {
            main: red.A400
        },
        background: {
            default: "#000"
        }
    }
});

export default theme;
