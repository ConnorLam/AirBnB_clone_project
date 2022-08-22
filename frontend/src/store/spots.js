const GET_SPOTS = 'spots/getSpots'



const loadSpots = spots => ({
    type: GET_SPOTS,
    spots
})








export const getAllSpots = () => async dispatch => {
    const res = await fetch(`/api/spots`)

    if (res.ok){
        const spots = await res.json()
        dispatch(loadSpots(spots))
    }
}











const initialState = {}

const spotsReducer = (state = initialState, action) => {
    switch (action.type){
        case GET_SPOTS:
            const allSpots = {}
            console.log(action.spots)
            action.spots.Spots.forEach(spot => {
                allSpots[spot.id] = spot
            })
        return {
            ...state,
            ...allSpots
        }
        default:
            return state
    }
}

export default spotsReducer