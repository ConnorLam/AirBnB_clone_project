import { csrfFetch } from "./csrf"

const GET_SPOTS = 'spots/getSpots'
const GET_SPOT_ID = 'spots/getSpotsId'
const CREATE_SPOT = 'spots/createSpot'
const DELETE_SPOT = 'spots/deleteSpot'
const GET_SPOTS_USERS = 'spots/getUserSpots'
const EDIT_SPOT = 'spots/editSpots'


const loadSpots = spots => ({
    type: GET_SPOTS,
    spots
})

const loadSpotById = spot => ({
    type: GET_SPOT_ID,
    spot
})

const loadSpotByUser = spots => ({
    type: GET_SPOTS_USERS,
    spots 
})

const createSpot = spot => ({
    type: CREATE_SPOT,
    spot
})

const deleteSpot = spotId => ({
    type: DELETE_SPOT,
    spotId
})

const editSpot = (spot) => ({
    type: EDIT_SPOT,
    spot
    // spotId
})







export const getAllSpots = () => async dispatch => {
    const res = await csrfFetch(`/api/spots`)

    if (res.ok){
        const spots = await res.json()
        dispatch(loadSpots(spots))
        return spots
    }
}

export const getUserSpots = () => async dispatch => {
    const res = await csrfFetch(`/api/spots/current`)

    if (res.ok){
        const spots = await res.json()
        // console.log(spots)
        dispatch(loadSpotByUser(spots))
        return spots
    }
    return res
}

export const getSpotById = (id) => async dispatch => {
    // console.log(id)
    const res = await csrfFetch(`/api/spots/${id}`)
    if(res.ok){
        const spotById = await res.json()
        // console.log('this is inside my thunk', spotById)
        dispatch(loadSpotById(spotById))
        return spotById
    }
}

export const createOneSpot = (spot) => async dispatch => {
    const {address, city, state, country, lat, lng, name, description, price, previewImage} = spot
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
    
    // 
    if (res.ok){
        const createdSpot = await res.json()
        // const dispatchSpot = await dispatch(createSpot(createdSpot))
        // console.log(createdSpot)
        const imageRes = await csrfFetch(`/api/spots/${createdSpot.id}/images`, {
            method: 'POST',
            body: JSON.stringify({
                url: previewImage,
                previewImage: true
            })
        })

            if(imageRes.ok){
                createdSpot.previewImage = imageRes.url
                dispatch(createSpot(createdSpot))
                return createdSpot
            }

    }

    return res
}

export const deleteASpot = (spotId) => async dispatch => {
    // console.log(spotId)
    // const {id} = spot
    const res = await csrfFetch(`/api/spots/${spotId}`, {
        method: 'DELETE'
    })

    if (res.ok){
        // const id = await res.json()
        // console.log('inside of my thunk', id)
        dispatch(deleteSpot(spotId))
        // return id
    }
    // return res
}

export const editASpot = (spot) => async dispatch => {
    // const {address, city, state, country, lat, lng, name, description, price} = spot
    // console.log(spot)
    const res = await csrfFetch(`/api/spots/${spot.id}`, {
        method: 'PUT',
        body: JSON.stringify(spot)
    })
    // console.log(spot.id)
    if(res.ok){
        const editSpotRes = await res.json()

        dispatch(editSpot(editSpotRes))
        return editSpotRes
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
        case GET_SPOTS_USERS:
            let userSpot = {}
            action.spots.Spots.forEach(spot => {
                userSpot[spot.id] = spot
            })
            return userSpot
        case CREATE_SPOT:
            let createSpot = {...state}
            createSpot[action.spot.id] = action.spot
            return createSpot
        case DELETE_SPOT:
            let deleteSpot = {...state}
            // console.log(deleteSpot)
            // console.log(action)
            delete deleteSpot[action.spotId]
            // console.log('after i delete', deleteSpot)
            // console.log('after delete action', action)
            return deleteSpot
        case EDIT_SPOT:
            let editSpot = {...state}
            editSpot[action.spot.id] = action.spot
            return editSpot
        default:
            return state
    }
}

export default spotsReducer