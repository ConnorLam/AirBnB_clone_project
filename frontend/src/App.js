import React, {useEffect, useState} from 'react'
import { restoreUser } from './store/session';
import {Route, Switch} from 'react-router-dom'
import LoginFormPage from './components/LoginFormPage';
import SignupFormPage from './components/SingupFormPage';
import {useDispatch} from 'react-redux'
import Navigation from './components/Navigation'


function App() {

  const dispatch = useDispatch()
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    dispatch(restoreUser()).then(() => setIsLoaded(true)) //what is setIsLoaded and is loaded
  }, [dispatch])

  return isLoaded && (
    <>
      <Navigation />
      <Switch>
        <Route path='/login'>
          <LoginFormPage />
        </Route>
        <Route path='/signup'>
          <SignupFormPage />
        </Route>
      </Switch>
    </>
  );
}

export default App;
