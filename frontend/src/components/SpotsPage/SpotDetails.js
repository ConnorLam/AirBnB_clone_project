import { useEffect, useState} from 'react'
import { NavLink, useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { getSpotById } from '../../store/spots'
import { spotReview } from '../../store/review'


const SpotById = () => {
    const {spotId} = useParams()
    // console.log(spotId)

    const [isLoaded, setIsLoaded] = useState(false)

    const parsedSpotId = Number(spotId)
    const spot = useSelector(state => state.spots[parsedSpotId])
    const user = useSelector(state => state.session.user)
    // console.log(user)
    // console.log(spotId)
    const reviews = useSelector(state => state.reviews)
    // console.log('this is in my component', reviews)
    let reviewsArr = Object.values(reviews)
    // console.log(reviewsArr, 'ARRAY')
    // console.log('this is my selector', spot)
    // console.log(getSpotById.res)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getSpotById(spotId))
            .then(() =>
            dispatch(spotReview(spotId))
        .then(() => (setIsLoaded(true)))
        );
    }, [dispatch, spotId])

    if(!spot || spot === {}) return <div>loading</div>


    if(!reviews) return null
    if(!user) return null
    // if(!reviews.User) return null
    // if(reviewsArr.length === 0) return <h2>no reviews yet</h2>
    
    if(!spot.Images) return null
    let images = spot.Images.map(image => image.url)

    function validImage(spot){
        if(spot.Images.length > 0){
            return images
        } else {
            return "https://thumbs.dreamstime.com/z/young-man-says-no-white-53544424.jpg";
        }
    }

    return isLoaded && (
        <div>
            <div>
                <h1>{spot.name}</h1>
                <div>{spot.city}, {spot.state}, {spot.Owner.firstName}</div>
                <div>
                    <img src={validImage(spot)} alt={spot.name}/> 
                </div>
            </div>
            <div>
                <h2>Reviews</h2>
                {user.id !== parsedSpotId ? <NavLink to={`/spots/${spot.id}/create/review`} >Write your review</NavLink> : <></>}
                {/* <NavLink to={`/spots/${spot.id}/create/review`}>Write your review</NavLink> */}
            </div>
            <ul>
                {reviewsArr.length ? reviewsArr.map(review => {
                    // console.log('review!!!!!!!!!!!!!!!!!!!!', review)
                    return(
                        <div key={review.id}>
                            <div>
                                {review.User.firstName} {review.User.lastName}
                            </div>
                            <div>
                                {review.review}
                            </div>
                            <div>
                                <img src={review.Images ? review.Images.map(image => image.url) : <p>no images</p>} alt={''}></img>
                            </div>
                        </div>
                    )
                }): <div>Be first to review!</div>}
            </ul>
        </div>
    )
}


export default SpotById