import { csrfFetch } from "./csrf";

//types

const GET_SPOTS_BOOKINGS = 'bookings/get-spot-bookings'
const GET_USER_BOOKINGS = 'bookings/get-user-bookings'
const ADD_BOOKING = 'bookings/create-booking'
const UPDATE_BOOKING = 'bookings/update-booking'
const DELETE_BOOKING = 'bookings/delete-booking'

//actions

const getSpotBookingAction = payload => {
    return {
        type: GET_SPOTS_BOOKINGS,
        payload
    }
}

const getUserBookingAction = payload => {
    return {
        type: GET_USER_BOOKINGS,
        payload
    }
}

const createBookingAction = payload => {
    return {
        type: ADD_BOOKING,
        payload
    }
}

const updateBookingAction = payload => {
    return {
        type: UPDATE_BOOKING,
        payload
    }
}

const deleteBookingAction = payload => {
    return {
        type: DELETE_BOOKING,
        payload
    }
}

//thunks

export const getSpotBookingThunk = (spotId) => async dispatch => {
    const res = await fetch(`/api/spots/${spotId}/bookings`)
    const data = await res.json()

    if(res.ok){
        await dispatch(getSpotBookingAction(data))
    }

    return data
}

export const getUserBookingThunk = () => async dispatch => {
    const res = await csrfFetch(`/api/bookings/current`)

    const data = await res.json()
    if(res.ok){
        await dispatch(getUserBookingAction(data))
    }

    return data
}


export const createBookingThunk = (bookingObj) => async dispatch => {
    const res = await csrfFetch(`/api/spots/${bookingObj.spotId}/bookings`, {
        method: 'POST',
        body: JSON.stringify(bookingObj)
    })
    const data = await res.json()
    // console.log(data, 'this is inside my thunk')
    if(res.ok){
        await dispatch(createBookingAction(data))
    }

    return data
}

export const updateBookingThunk = (bookingObj) => async dispatch => {
    const res = await csrfFetch(`/api/bookings/${bookingObj.id}`, {
        method: 'PUT',
        body: JSON.stringify(bookingObj)
    })

    const data = await res.json()

    if (res.ok){
        dispatch(updateBookingAction(data))
    }

    return data
}

export const deleteBookingThunk = (bookingId) => async dispatch => {
    const res = await csrfFetch(`/api/bookings/${bookingId}`, {
        method: 'DELETE',
    })

    const data = await res.json()

    if (res.ok){
        await dispatch(deleteBookingAction(bookingId))
    }

    return data
}

//reducer

const initialState = {}

const bookingsReducer = (state = initialState, action) => {
    let newState = {}
    switch(action.type){
        case (GET_SPOTS_BOOKINGS): {
            // console.log(action.payload)
            action.payload.Bookings.forEach(booking => {
                newState[booking.startDate] = booking
            })
            return newState
        }
        case (GET_USER_BOOKINGS): {
            action.payload.Bookings.forEach(booking => {
                newState[booking.startDate] = booking
            })
            return newState
        }
        case (ADD_BOOKING): {
            newState = {...state}
            newState[action.payload.id] = {...action.payload}
            return newState
        }
        case (UPDATE_BOOKING): {
            newState = {...state}
            newState[action.payload.id] = {...newState[action.payload.id], ...action.payload}
            return newState
        }
        case (DELETE_BOOKING): {
            newState = {...state}
            delete newState[action.payload]
            return newState
        }
        default: {
            return state
        }
    }

}
export default bookingsReducer