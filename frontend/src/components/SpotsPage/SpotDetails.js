import { useEffect} from 'react'
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { getSpotById } from '../../store/spots'


const SpotById = () => {
    const {spotId} = useParams()
    console.log(spotId)
    const parsedSpotId = Number(spotId)
    const spot = useSelector(state => (state.spots[parsedSpotId]))
    console.log('this is my selector', spot)
    // console.log(getSpotById.res)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getSpotById(spotId))
    }, [dispatch, spotId])

    if(!spot || spot === {}) return <div>loading</div>

    let images = spot.Images?.map(image => image.url)
    console.log(images)
    return(
        <div>
            <h1>{spot.name}</h1>
            <div>{spot.city}, {spot.state}</div>
            <div>
                <img src={images} alt={spot.name}/> 
            </div>
        </div>
    )
}


export default SpotById