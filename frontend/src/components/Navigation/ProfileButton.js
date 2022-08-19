import React, {useState, useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux' 
import { logout } from '../../store/session'

const ProfileButton = ({user}) => {
    // const user = useSelector(state => state.session.user)
    const dispatch = useDispatch()
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
            </ul>
        )}
      </div>
    );
}

export default ProfileButton