import {NavLink} from 'react-router-dom'
import {useSelector} from 'react-redux'
import ProfileButton from './ProfileButton'
import './Navigation.css'


const Navigation = ({isLoaded}) => {

    const user = useSelector(state => state.session.user)

    let session;
    if(!user){
        session = (
            <>
                <NavLink to="/login">Log In</NavLink>
                <NavLink to="/signup">Sign Up</NavLink>
            </>
        )
    } else {
        session = (
            <>
                <ProfileButton user={user}/>
            </>
        )
    }

    return (
        <ul>
            {/* <li> */}
                {isLoaded && session}
            {/* </li> */}
        </ul>
    )
}

export default Navigation