import { csrfFetch } from "./csrf"

const GET_SPOTS = 'spots/getSpots'
const GET_SPOT_ID = 'spots/getSpotsId'


const loadSpots = spots => ({
    type: GET_SPOTS,
    spots
})

const loadSpotById = spot => ({
    type: GET_SPOT_ID,
    spot
})








export const getAllSpots = () => async dispatch => {
    const res = await fetch(`/api/spots`)

    if (res.ok){
        const spots = await res.json()
        dispatch(loadSpots(spots))
        return spots
    }
}

export const getSpotById = (id) => async dispatch => {
    const res = await fetch(`/api/spots/${id}`)
    if(res.ok){
        const spotById = await res.json()
        dispatch(loadSpotById(spotById))
        return spotById
    }
}









const initialState = {}

const spotsReducer = (state = initialState, action) => {
    switch (action.type){
        case GET_SPOTS:
            const allSpots = {}
            // console.log(action.spots)
            action.spots.Spots.forEach(spot => {
                allSpots[spot.id] = spot
            })
        return {
            ...state,
            ...allSpots
        };
        case GET_SPOT_ID:
            console.log(action.spot.id)
            // console.log(state)
            return {
                ...state,
                [action.spot.id]: {
                    ...state[action.spot.id],
                    ...action.spot
                }
            }
        default:
            return state
    }
}

export default spotsReducer