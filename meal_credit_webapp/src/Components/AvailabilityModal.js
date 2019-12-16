import ListingModal from "./ListingModal";
import { withStyles } from "@material-ui/styles";

class AvailabilityModal extends ListingModal {
    constructor(props) {
        super(props);
        this.fieldTransform = {
            "askinPrice" : "price",
            "endTime" : "end date/time",
            "location" : "location",
            "startTIme" : "start date/time"
        }
    }
    
    getDefaultPrice() {
        return this.props.defaultValues.askingPrice;
    }
}

export default withStyles(styles)(AvailabilityModal);