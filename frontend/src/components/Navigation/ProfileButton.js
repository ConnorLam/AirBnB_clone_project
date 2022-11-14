import React, {useState, useEffect} from 'react'
import { useDispatch } from 'react-redux' 
import { logout } from '../../store/session'
import { useHistory } from 'react-router-dom'


const ProfileButton = ({user}) => {
    // const user = useSelector(state => state.session.user)
    const dispatch = useDispatch()
    const history = useHistory()
    const [showMenu, setShowMenu] = useState(false);

    const openMenu = () => {
        if (showMenu) return
        setShowMenu(true)
    }

    useEffect(() => {
        const closeMenu = () => {
            if(showMenu){
                setShowMenu(false)
            }
        }

        document.addEventListener('click', closeMenu)
        return () => document.removeEventListener('click', closeMenu)
    }, [showMenu])

    const logOut = (e) => {
        e.preventDefault()
        dispatch(logout())
        history.push('/')
    }

    const goToYourSpots = (e) => {
        e.preventDefault()
        return history.push('/mySpots')
    }

    const goToYourBookings = (e) => {
      e.preventDefault()
      return history.push(`/myBookings`)
    }

    return (
      <div>
        {/* () => showMenu === false ? setShowMenu(true) : showMenu */}
        <button className='button' onClick={openMenu}>
          <i className="fa-solid fa-bars fa-2x"></i>
          <i className="fas fa-user-circle fa-2x"></i>
        </button>
        {showMenu && (
          <div>
            <ul className="dropdown">
              {/* <div className='dropdown-info'>{user.username}</div>
              <div className='dropdown-info'>{user.email}</div> */}
              <div className='dropdown-info'>
                <div>
                  <button className='dropdown-info-button your-bookings' onClick={goToYourBookings}>Your Bookings</button>
                </div>
                <div>
                  <button className='dropdown-info-button your-spots' onClick={goToYourSpots}>Your Spots</button>
                </div>
                <div>
                  <button className='dropdown-info-button log-out' onClick={logOut}> Log Out</button>
                </div>

              </div>
            </ul>
          </div>
        )}
      </div>
    );
}

export default ProfileButton