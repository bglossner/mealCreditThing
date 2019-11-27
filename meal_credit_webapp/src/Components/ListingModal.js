import React from "react";
import { Fade, Modal, Backdrop, withStyles, Paper, Typography } from "@material-ui/core";

const styles = theme => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
    title: {
        fontStyle: "italic"
    }
});

class ListingModal extends React.Component {
    
    render() {
        const { classes } = this.props;
        return (
            <Modal
                className={classes.modal}
                open={this.props.open}
                onClose={this.props.onClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={this.props.open}>
                    <Paper className={classes.paper}>
                        <Typography className={classes.title} variant="h6">
                            { this.props.title }
                        </Typography>
                        { this.props.children }
                    </Paper>
                </Fade>
            </Modal>
        );
    }
}

export default withStyles(styles)(ListingModal);