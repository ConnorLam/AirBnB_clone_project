import {NavLink} from 'react-router-dom'
import {useSelector} from 'react-redux'
import ProfileButton from './ProfileButton'
import './Navigation.css'
import LoginFormModal from '../LoginFormModal'
// import { useHistory } from 'react-router-dom'
import SignUpFormModal from '../SignupFormPage'
import CreateSpotModal from '../SpotFormPage/IndexCreateSpot'


const Navigation = ({isLoaded}) => {

    // const history = useHistory

    // const signUpOnClick = (e) => {
    //     e.preventDefault()
    //     return history.push('/signup')
    // }

    const user = useSelector(state => state.session.user)

    let session;
    if(!user){
        session = (
            <nav className='right-not-loggedin'>
                {/* <div>
                    <div>
                        
                    </div>
                </div> */}
                <div>
                    <LoginFormModal className='test'/>
                </div>
                <div>
                    <SignUpFormModal />
                </div>
            </nav>
        )
    } else {
        session = (
            <div className='right-side'>
                <CreateSpotModal />
                {/* <NavLink to={'/mySpots'}>Your Spots</NavLink> */}
                <ProfileButton className='button' user={user}/>
            </div>
        )
    }

    return (
        // <ul>
            <nav className='top'>
                <div>
                    <NavLink className='home' exact to='/'>airbnb "Clone"</NavLink>
                </div>
                {isLoaded && session}
            </nav>
        // </ul>
    )
}

export default Navigation