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
    })

    // if(!spot) return <div>loading</div>
    return(
        <div>{spot?.name}</div>
    )
}


export default SpotById