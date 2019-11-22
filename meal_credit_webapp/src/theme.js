import { red, purple } from "@material-ui/core/colors";
import { createMuiTheme } from "@material-ui/core/styles";

// A custom theme for this app
const theme = createMuiTheme({
    palette: {
        primary: {
            main: "#accd2d"
        },
        secondary: {
            main: purple[600]
        },
        error: {
            main: red[700]
        },
        background: {
            default: "rgba(172, 205, 45, 0.8)"
        }
    }
});

export default theme;
