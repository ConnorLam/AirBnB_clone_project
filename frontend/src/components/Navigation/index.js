import {NavLink} from 'react-router-dom'
import {useSelector} from 'react-redux'
import ProfileButton from './ProfileButton'
import './Navigation.css'
import LoginFormModal from '../LoginFormModal'


const Navigation = ({isLoaded}) => {

    const user = useSelector(state => state.session.user)

    let session;
    if(!user){
        session = (
            <>
                <LoginFormModal />
                <NavLink to="/signup">Sign Up</NavLink>
            </>
        )
    } else {
        session = (
            <>
                <NavLink to={'/spots/create'}>Host A Spot</NavLink>
                {/* <NavLink to={'/mySpots'}>Your Spots</NavLink> */}
                <ProfileButton user={user}/>
            </>
        )
    }

    return (
        <ul>
            <div>
                <NavLink exact to='/'>Home</NavLink>
                {isLoaded && session}
            </div>
        </ul>
    )
}

export default Navigation