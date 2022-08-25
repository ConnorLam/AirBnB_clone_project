import { csrfFetch } from "./csrf";

const GET_REVIEWS = 'reviews/getReviews'
const CREATE_REVIEWS = 'reviews/createReviews'




const loadReviewsBySpot = (reviews) => ({
    type: GET_REVIEWS,
    reviews
})

const createOneReview = review => ({
    type: CREATE_REVIEWS,
    review
})





export const spotReview = (spotId) => async dispatch =>{
    // console.log(spotId)
    const res = await csrfFetch(`/api/spots/${spotId}/reviews`)
    // console.log(res)
    if(res.ok){
        const reviews = await res.json()
        dispatch(loadReviewsBySpot(reviews))
        // return reviews 
    }
    // return res
}

export const createReview = (reviewObj, spotId) => async dispatch => {
    // const {review, stars} = reviewObj
    const res = await csrfFetch(`/api/spots/${reviewObj.spotId}/reviews`, {
        method: 'POST',
        body: JSON.stringify(reviewObj)
    })
    if(res.ok){
        const createdReview = await res.json()
        await dispatch(createOneReview(createdReview))
        return createdReview
    } 
    // else {
    //     if (res.status === 403){
    //         return 'You already have a review'
    //     }
    // }
    return res
}






const initialState = {}

const reviewsReducer = (state = initialState, action) => {
    switch(action.type){
        case GET_REVIEWS:
            const spotReviews = {}
            console.log(action)
            action.reviews.Reviews.forEach(review => {
                spotReviews[review.id] = review
            })
            return {
                // ...state,
                ...spotReviews
            };
        case CREATE_REVIEWS:
            let createReview = {...state}
            createReview[action.review.id] = action.review
            return createReview
        default:
            return state
    }
}

export default reviewsReducer