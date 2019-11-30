import React from "react";
import { Fade, Modal, Backdrop, withStyles, Paper, Typography, Box, Button } from "@material-ui/core";
import CloseIcon from '@material-ui/icons/Close';

const styles = theme => ({
    center: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
    title: {
        fontStyle: "italic",
        fontWeight: "bold",
        width: "100%",
        textAlign: "center",
    },
    cancel: {
        backgroundColor: "transparent",
        color: "red",
    },
});

class Modal extends React.Component {
    
    render() {
        const { classes } = this.props;
        return (
            <Modal
                className={classes.center}
                open={this.props.open}
                onClose={this.props.onClose}
                closeAfterTransition
                disableBackdropClick
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={this.props.open}>
                    <Paper className={classes.paper}>
                        <Box
                            className={classes.center}
                        >
                            <Typography className={classes.title} variant="h6">
                                { this.props.title }
                            </Typography>
                            <Button
                                className={classes.cancel}
                                onClick={() => this.props.closeModal()}
                            >
                                <CloseIcon />
                            </Button>
                        </Box>
                        { this.props.children }
                    </Paper>
                </Fade>
            </Modal>
        );
    }
}

export default withStyles(styles)(ListingModal);