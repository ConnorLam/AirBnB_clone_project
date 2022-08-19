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
                <ProfileButton user={user}/>
            </>
        )
    }

    return (
        <ul>
            <li>
                <NavLink exact to='/'>Home</NavLink>
                {isLoaded && session}
            </li>
        </ul>
    )
}

export default Navigation