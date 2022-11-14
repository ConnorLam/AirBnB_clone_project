import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { updateBookingThunk, getSpotBookingThunk } from "../../../store/booking";

const EditBooking = ({spot}) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const user = useSelector((state) => state.session.user)

    const [isLoaded, setIsLoaded] = useState(false);


    useEffect(() => {
      dispatch(getSpotBookingThunk(spot?.id))
      .then(() => setIsLoaded(true));
    }, [dispatch, spot?.id, setIsLoaded]);
    return (
        <div>
            hi
        </div>
    )

}

export default EditBooking