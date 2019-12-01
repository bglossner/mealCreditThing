import React from "react";
import { Card, Fade, Fab, Paper } from "@material-ui/core";
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';

class Post extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hover: false
        };
    }

    renderFields() {
        console.warn("renderFields should be implemented by subclass!")
    }

    setHover(val) {
        this.setState({
            hover: val
        });
    }

    renderOverlayEdit(classes) {
        return (
            this.props.allowEdits && 
            (<Fade in={this.state.hover} timeout={0}>
                <Paper className={`${classes.top} ${classes.paper}`} elevation={2}>
                    <Fab
                        color="primary"
                        aria-label="edit"
                        onClick={() => this.props.editPost(this.props.listKey)}
                    >
                        <EditOutlinedIcon />
                    </Fab>
                </Paper>
            </Fade>)
        );
    }


    render() {
        const { classes } = this.props;
        return (
            <Card 
                className={classes.card}
                raised={this.state.hover}
                onMouseOver={() => this.setHover(true)}
                onMouseOut={() => this.setHover(false)}
            >
                { this.renderOverlayEdit(classes) }
                <Paper className={`${classes.paper}`} elevation={1}>
                    { this.renderFields() }
                </Paper>
            </Card>
        );
    }
}

export default (Post);