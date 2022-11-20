import { useEffect, useState} from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { getSpotById } from '../../store/spots'
import { spotReview } from '../../store/review'
import DeleteSpot from '../DeleteReviewButton/DeleteReview'
import './SpotDetail.css'
import BookingsForm from '../Booking/CreateBooking/CreateBooking'
import CreateReviewModal from '../CreateReviewPage'
import OwnerSpotBookings from '../Booking/OwnerSpotBookings/OwnerSpotBookings'
import SpotBookings from '../Booking/SpotBookings/SpotBookings'
import UpdateReviewModal from '../UpdateReviewModal/UpdateReviewModal'
import { getSpotLikeThunk, createLikeThunk, deleteLikeThunk } from '../../store/like'
import { Modal } from '../../context/Modal'
import LoginForm from '../LoginFormModal/LoginForm'



const SpotById = () => {
    const {spotId} = useParams()
    const history = useHistory()
    const parsedSpotId = Number(spotId)
    const spot = useSelector(state => state.spots[parsedSpotId])
    const user = useSelector(state => state.session.user)
    
    const reviews = useSelector((state) => state.reviews);
    let reviewsArr = Object.values(reviews).reverse();
    const likes = useSelector((state) => state.likes)
    let likesArr = Object.values(likes)
    const likesId = likesArr.map((like) => {
      return like.userId;
      // gets the user id of each like so we can see if user already has a like
    });

    const likeOrDislike = async () => {
      if(likesId.includes(user.id)){
        await dispatch(deleteLikeThunk(likesArr[likesId.indexOf(user.id)].id))
      } else {
        const payload = {spotId : spot.id, userId: user.id}
        await dispatch(createLikeThunk(payload))
      }
    }



    // const state = useSelector(state => console.log(state))

    const [isLoaded, setIsLoaded] = useState(false)
    const [numReviews, setNumReviews] = useState(spot?.numReviews)
    const [avgRating, setAvgRating] = useState(spot?.avgRating)
    const [showModal, setShowModal] = useState(false);

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
            .then(() => dispatch(getSpotLikeThunk(spotId)))
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


    let session;
    if (!user) {
      session = (
        <>
          <div className="likes">
              <i onClick={() => setShowModal(true)} className="fa-solid fa-thumbs-up like-button" id={likesId.includes(user?.id) ? 'is-liked' : 'not-liked'}></i>&nbsp;&nbsp;
              <div id={likesArr.length === 1 ? 'one-like' : 'many-likes'}>{likesArr.length === 1 ? `${likesArr.length} like` : `${likesArr.length} likes` }</div>
          </div>
          {showModal && (
            <Modal onClose={() => setShowModal(false)}>
              <LoginForm />
            </Modal>
          )}
        </>
      );
    } else {
      session = (
        <div className="likes">
            <i onClick={() => likeOrDislike()} className="fa-solid fa-thumbs-up like-button" id={likesId.includes(user?.id) ? 'is-liked' : 'not-liked'}></i>&nbsp;&nbsp;
            <div id={likesArr.length === 1 ? 'one-like' : 'many-likes'}>{likesArr.length === 1 ? `${likesArr.length} like` : `${likesArr.length} likes` }</div>
        </div>
      );
    }


    return (
      isLoaded && (
        <div className="spot-details-page">
          <div>
            <h1 className="spot-name">{spot.name}</h1>
            <div className="spot-details-header">
              <i className="fa-solid fa-star fa-xs"></i>
              {Number(spot.avgRating).toFixed(2)} ·{" "}
              <span className="spot-info-header">{spot.numReviews} reviews</span> ·{" "}
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
                <img
                  className="image-right image-1"
                  src={
                      validImage(spot)
                  }
                  alt={spot.name}
                />
                <img
                  className="image-right image-2"
                  src={
                      validImage(spot)
                  }
                  alt={spot.name}
                />
                <img
                  className="image-right image-3"
                  src={
                      validImage(spot)
                  }
                  alt={spot.name}
                />
                <img
                  className="image-right image-4"
                  src={
                      validImage(spot)
                  }
                  alt={spot.name}
                />
              </div>
            </div>
          </div>
          <div className='left-right'>
            <div className="middle-section left">
              <div className="description">
                <div className="description-left">
                  <div className='like-header'>
                    <h2>Home hosted by {spot.Owner.firstName}</h2>

                    {session}
                  </div>
                  <div className="spot-details">{spot.description}</div>
                </div>
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
                              <i className="fas fa-user-circle fa-2x review-user-circle" id='no-cursor'></i>
                            </div>
                            <div className="review-user-name">
                              {review?.User?.firstName} {review?.User?.lastName}
                            </div>
                            {/* <UpdateReviewModal review={review} user={user} /> */}
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
                            <UpdateReviewModal review={review} user={user} />
                            <DeleteSpot
                              review={review}
                              user={user}
                              setNumReviews={setNumReviews}
                            />
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
            <div className='booking-stuff'>
              <div className={user?.id !== spot.ownerId ? 'booking-form right' : null} id={user?.id !== spot.ownerId ? null : 'spot-bookings'}>
                {user?.id !== spot.ownerId ? <SpotBookings spot={spot}/> : null}
              </div>
              <div className={user?.id !== spot.ownerId ? 'booking-form right' : 'booking-form right'} id={user?.id !== spot.ownerId ? 'spot-bookings' : null}>
                {user?.id !== spot.ownerId ? <BookingsForm spot={spot}/> : <OwnerSpotBookings spot={spot}/>}
                
                {/* <BookingsForm spot={spot} /> */}
              </div>
            </div>
          </div>
          {/* <div>
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
                        <DeleteSpot
                          review={review}
                          user={user}
                          setNumReviews={setNumReviews}
                        />
                      </div>
                    </div>
                  );
                })
              ) : (
                <div>Be first to review!</div>
              )}
            </ul>
          </div> */}
        </div>
      )
    );
}


export default SpotById