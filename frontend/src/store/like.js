import { csrfFetch } from "./csrf"

const GET_SPOT_LIKES = 'like/get-spot-likes'
const LIKE_SPOT = 'like/create-like'
const DELETE_LIKE = 'like/delete-like'

const getSpotLikesAction = (payload) => {
    return {
        type: GET_SPOT_LIKES,
        payload
    }
}

const createLikeAction = (payload) => {
    return {
        type: LIKE_SPOT,
        payload,
    };
};

const deleteLikeAction = (payload) => {
    return {
        type: DELETE_LIKE,
        payload,
    };
};

export const getSpotLikeThunk = (spotId) => async dispatch => {
    const res = await fetch(`/api/spots/${spotId}/likes`)
    const data = await res.json()

    if(res.ok){
        await dispatch(getSpotLikesAction(data))
    }

    return data
}

export const createLikeThunk = ({spotId, userId}) => async dispatch => {
    const res = await csrfFetch(`/api/spots/${spotId}/likes`, {
        method: 'POST',
        spotId,
        userId
    })

    const data = await res.json()

    if(res.ok){
        await dispatch(createLikeAction(data))
    }

    return data
}

export const deleteLikeThunk = (likeId) => async dispatch => {
    const res = await csrfFetch(`/api/likes/${likeId}`, {
        method: 'DELETE'
    })

    const data = await res.json()

    if(res.ok){
        await dispatch(deleteLikeAction(likeId))
    }

    return data
}

const initialState = {}

const likesReducer = (state = initialState, action) => {
    let newState = {}
    switch(action.type){
        case(GET_SPOT_LIKES): {
            action.payload.Likes.forEach(like => {
                newState[like.id] = like
            })
            return newState
        }
        case(LIKE_SPOT): {
            newState = {...state}
            newState[action.payload.id] = {...action.payload}
            return newState
        }
        case(DELETE_LIKE): {
            newState = {...state}
            delete newState[action.payload]
            return newState
        }
        default: {
            return state
        }
    }
}

export default likesReducer