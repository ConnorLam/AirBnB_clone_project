import { useEffect} from 'react'
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { getSpotById } from '../../store/spots'


const SpotById = () => {
    const {spotId} = useParams()
    // console.log(spotId)
    const spot = useSelector(state => state.spots[spotId])
    console.log(spot)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getSpotById(spotId))
    }, [dispatch, spotId])

    if(!spot) return <div>loading</div>

    console.log(spot.previewImage)
    return(
        <div>
            <div>{spot.name}</div>
            <div>{spot.city}, {spot.state}</div>
            <div>
                <img src={spot.previewImage} alt={spot.name}/> 
            </div>
        </div>
    )
}


export default SpotById