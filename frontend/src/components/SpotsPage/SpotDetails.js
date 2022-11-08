import { useEffect, useState} from 'react'
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { getSpotById } from '../../store/spots'
import { spotReview } from '../../store/review'
import DeleteSpot from '../DeleteReviewButton/DeleteReview'
import './SpotDetail.css'
import BookingsForm from '../Booking/CreateBooking/CreateBooking'
import CreateReviewModal from '../CreateReviewPage'


const SpotById = () => {
    const {spotId} = useParams()
    // console.log(spotId)
    const reviews = useSelector((state) => state.reviews);
    // console.log('this is in my component', reviews)
    let reviewsArr = Object.values(reviews);
    const parsedSpotId = Number(spotId)
    const spot = useSelector(state => state.spots[parsedSpotId])

    const [isLoaded, setIsLoaded] = useState(false)
    const [numReviews, setNumReviews] = useState(spot?.numReviews)
    const [avgRating, setAvgRating] = useState(spot?.avgRating)

    const user = useSelector(state => state.session.user)
    // console.log(user)
    // console.log(spotId)
    // console.log(reviewsArr)
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


    // console.log(spot)

    if(!reviews) return null
    // if(!user) return null
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

    let navLink;
    // console.log(user.id)
    // let userId = user.id
    let ownerId = spot.ownerId
    // console.log(spot.ownerId)
    if(!user || user.id === ownerId){
        navLink = (  
            <div></div>
        )
    } else {
        navLink = (
            <CreateReviewModal spot={spot} setAvgRating={setAvgRating} setNumReviews={setNumReviews}/>
        )
    }

    return (
      isLoaded && (
        <div className="spot-details-page">
          <div>
            <h1 className="spot-name">{spot.name}</h1>
            <div className="spot-details-header">
              <i className="fa-solid fa-star fa-xs"></i>
              {Number(spot.avgRating).toFixed(2)} ·{" "}
              <span className="spot-info-header">
                {numReviews} reviews
              </span>{" "}
              ·{" "}
              <span className="spot-info-header">
                {spot.city}, {spot.state}, {spot.country}
              </span>
            </div>
            <div className="outer-spot-details-img">
              <div className="spot-details-img-div">
                <img
                  className="spot-details-image"
                  src={validImage(spot)}
                  alt={spot.name}
                />
              </div>
              <div className="spot-details-image-right">
                <img className='image-right image-1' src={'https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg?20200913095930'} alt={spot.name} />
                <img className='image-right image-2' src={'https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg?20200913095930'} alt={spot.name} />
                <img className='image-right image-3' src={'https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg?20200913095930'} alt={spot.name} />
                <img className='image-right image-4' src={'https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg?20200913095930'} alt={spot.name} />
              </div>
            </div>
          </div>
          <div className="description">
            <div className='description-left'>
              <h2>Home hosted by {spot.Owner.firstName}</h2>
              <div className="spot-details">{spot.description}</div>
            </div>
            <div className='booking-form'>
              <BookingsForm spot={spot}/>
            </div>
            {/* <div className="right-side-description">
              <div>$ {spot.price} night</div>
              <div className="right-side-reviews">
                <div>
                  <i className="fa-solid fa-star fa-xs"></i>
                  {Number(spot.avgRating).toFixed(2)}
                </div>
                {spot.numReviews} reviews
              </div>
            </div> */}
          </div>
          <div>
            <div className="review-header">
              <h2 className="review-h2">
                <div className="review-stats">
                  <div className="review-avgRating">
                    <i className="fa-solid fa-star fa-xs"></i>
                    {Number(spot.avgRating).toFixed(2)}
                  </div>{" "}
                  ·
                  <div className="review-numReviews">
                    {spot.numReviews} reviews
                  </div>
                </div>
                {navLink}
              </h2>
              {/* {user.id !== parsedSpotId ? <NavLink to={`/spots/${spot.id}/create/review`} >Write your review</NavLink> : <></>} */}
              {/* <NavLink to={`/spots/${spot.id}/create/review`}>Write your review</NavLink> */}
            </div>
            <ul className="reviewsUl">
              {reviewsArr.length ? (
                reviewsArr.map((review) => {
                  // console.log('review!!!!!!!!!!!!!!!!!!!!', review)
                  return (
                    <div className="reviews-div" key={review.id}>
                      <div className="reviews-first-line">
                        <div>
                          <i className="fas fa-user-circle fa-2x review-user-circle"></i>
                        </div>
                        <div className="review-user-name">
                          {review?.User?.firstName} {review?.User?.lastName}
                        </div>
                      </div>
                      <div className="actual-review">{review.review}</div>
                      <div>
                        <img
                          src={
                            review.Images ? (
                              review.Images.map((image) => image.url)
                            ) : (
                              <p>no images</p>
                            )
                          }
                          alt={""}
                        ></img>
                      </div>
                      <div>
                        <DeleteSpot review={review} user={user} setNumReviews={setNumReviews}/>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div>Be first to review!</div>
              )}
            </ul>
          </div>
        </div>
      )
    );
}


export default SpotById