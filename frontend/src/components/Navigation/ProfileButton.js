import React, {useState, useEffect} from 'react'
import { useDispatch } from 'react-redux' 
import { logout } from '../../store/session'
import { Redirect, useHistory } from 'react-router-dom'


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
    }

    const goToYourSpots = (e) => {
        e.preventDefault()
        return history.push('/mySpots')
    }

    return (
      <div>
        {/* () => showMenu === false ? setShowMenu(true) : showMenu */}
        <button onClick={openMenu}>
          <i className="fas fa-user-circle"></i>
        </button>
        {showMenu && (
            <ul>
                <li>{user.username}</li>
                <li>{user.email}</li>
                <li>
                    <button onClick={logOut}> Log Out</button>
                </li>
                <li>
                    <button onClick={goToYourSpots}>Your Spots</button>
                </li>
            </ul>
        )}
      </div>
    );
}

export default ProfileButton