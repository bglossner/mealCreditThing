import React from "react";
import { Link } from "react-router-dom";
import { withStyles } from "@material-ui/core";
import { PRIMARY_COLOR } from "../Constants";

const styles = theme => ({
    link: {
        marginRight: theme.spacing(5),
        color: PRIMARY_COLOR,
        textTransform: "uppercase",
        '&:hover': {
            textDecoration: "none",
            color: PRIMARY_COLOR,
            paddingBottom: "10px",
            borderBottom: `2px solid ${PRIMARY_COLOR}`,
        }
    },
    underline: {
        paddingBottom: "10px",
        borderBottom: `2px solid ${PRIMARY_COLOR}`,
    },
});

class Navlink extends React.Component {
    render() {
        const { classes } = this.props;
        const linkClass = `${classes.link} ${this.props.isActive ? classes.underline : '' }`;
        return (
            <Link
                onClick={ () => this.props.onClick() }
                className={linkClass}
                to={this.props.to}
            >
                { this.props.title }
            </Link>
        );
    }
}

export default withStyles(styles)(Navlink);