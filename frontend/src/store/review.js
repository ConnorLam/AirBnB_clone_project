import { csrfFetch } from "./csrf";

const GET_REVIEWS = 'reviews/getReviews'




const loadReviewsBySpot = (reviews) => ({
    type: GET_REVIEWS,
    reviews
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
            }
        default:
            return state
    }
}

export default reviewsReducer