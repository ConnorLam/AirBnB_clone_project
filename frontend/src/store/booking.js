import { csrfFetch } from "./csrf";

//types

const GET_SPOTS_BOOKINGS = 'bookings/get-spot-bookings'
const GET_USER_BOOKINGS = 'bookings/get-user-bookings'
const ADD_BOOKING = 'bookings/create-booking'
const UPDATE_BOOKING = 'bookings/update-booking'
const DELETE_BOOKING = 'bookings/delete-booking'

const getSpotBookingAction = payload => {
    return {
        type: GET_SPOTS_BOOKINGS,
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

export const getSpotBookingThunk = (spotId) => async dispatch => {
    const res = await csrfFetch(`/api/spots/${spotId}/bookings`)
    const data = await res.json()

    if(res.ok){
        await dispatch(getSpotBookingAction(data))
    }

    return data
}


export const createBookingThunk = (bookingObj) => async dispatch => {
    const res = await csrfFetch(`/api/spots/${bookingObj.spotId}/bookings`, {
        method: 'POST',
        body: JSON.stringify(bookingObj)
    })
    const data = await res.json()
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