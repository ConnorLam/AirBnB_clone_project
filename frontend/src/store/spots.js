import { csrfFetch } from "./csrf"

const GET_SPOTS = 'spots/getSpots'
const GET_SPOT_ID = 'spots/getSpotsId'
const CREATE_SPOT = 'spots/createSpot'


const loadSpots = spots => ({
    type: GET_SPOTS,
    spots
})

const loadSpotById = spot => ({
    type: GET_SPOT_ID,
    spot
})

const createSpot = spot => ({
    type: CREATE_SPOT,
    spot
})








export const getAllSpots = () => async dispatch => {
    const res = await csrfFetch(`/api/spots`)

    if (res.ok){
        const spots = await res.json()
        dispatch(loadSpots(spots))
        return spots
    }
}

export const getSpotById = (id) => async dispatch => {
    const res = await csrfFetch(`/api/spots/${id}`)
    if(res.ok){
        const spotById = await res.json()
        // console.log('this is inside my thunk', spotById)
        dispatch(loadSpotById(spotById))
        return spotById
    }
}

export const createOneSpot = (spot) => async dispatch => {
    const {address, city, state, country, lat, lng, name, description, price} = spot
    const res = await csrfFetch(`/api/spots`, {
        method: 'POST',
        body: JSON.stringify({
            address,
            city,
            state, 
            country,
            lat,
            lng,
            name,
            description,
            price
        })
    })
    if (res.ok){
        const createdSpot = await res.json()
        dispatch(createSpot(createdSpot))
        return createdSpot
    }
    return res
}









const initialState = {}

const spotsReducer = (state = initialState, action) => {
    // let newState = {}
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
            // console.log(action.spot.id)
            // console.log(state)
            // newState = {...state}
            let oneSpot = { ...state };
            oneSpot[action.spot.id] = action.spot;
            return oneSpot;
            // return {
            //     ...state,
            //     [action.spot.id]: {
            //         ...state[action.spot.id],
            //         ...action.spot
            //     }
            //     // ...newState[action.spot.id] = action.spot
            // }
        case CREATE_SPOT:
            let createSpot = {...state}
            createSpot[action.spot.id] = action.spot
            return createSpot
        default:
            return state
    }
}

export default spotsReducer