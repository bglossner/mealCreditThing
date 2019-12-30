import React from "react";
import { Card, Fade, Fab, Paper, Box } from "@material-ui/core";
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';
/* import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown'; */

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
                    <Box className={`${classes.horizBox} ${classes.box}`}>
                        <Fab
                            color="primary"
                            className={classes.rightMargin}
                            aria-label="edit-post"
                            onClick={() => this.props.editPost(this.props.listKey)}
                        >
                            <EditOutlinedIcon />
                        </Fab>
                        <Fab
                            className={classes.red}
                            aria-label="delete-post"
                            onClick={() => this.props.deletePost(this.props.listKey)}
                        >
                            <DeleteOutlinedIcon />
                        </Fab>
                    </Box>
                </Paper>
            </Fade>)
        );
    }

    /*
    <Box className={`${classes.fullBox} ${classes.horizBox}`}>
        <Fab
            className={classes.rightMargin}
            aria-label="move-down"
            onClick={() => this.props.moveDownTo(this.props.listKey + 5)}
        >
            <KeyboardArrowDownIcon />
        </Fab>
    </Box>
    */
    
    render() {
        const { classes } = this.props;
        // console.log("dw", this.props.listKey)
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