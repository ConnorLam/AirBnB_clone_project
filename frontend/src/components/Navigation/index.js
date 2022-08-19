import {NavLink} from 'react-router-dom'
import {useSelector} from 'react-redux'
import ProfileButton from './ProfileButton'


const Navigation = () => {

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
                <ProfileButton />
            </>
        )
    }

    return (
        <ul>
            {session}
        </ul>
    )
}

export default Navigation