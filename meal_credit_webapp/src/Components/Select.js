import React from "react";
import { FormControl, InputLabel, Select } from "@material-ui/core";

class Selector extends React.Component {
    constructor(props) {

    }

    render() {
        return (
            <FormControl variant="outlined" className={classes.formControl}>
                <InputLabel ref={this.inputLabel} htmlFor="outlined-location-native-simple">
                    Location
                </InputLabel>
                <Select
                    native
                    value={super.getCurrentModalInfo("location") || ""}
                    onChange={this.handleSelectChange("location")}
                    labelWidth={this.state.labelWidth}
                    inputProps={{
                        name: 'location',
                        id: 'outlined-location-native-simple',
                    }}
                >
                    { super.getLocationOptions() }
                </Select>
            </FormControl>
        );
    }
}