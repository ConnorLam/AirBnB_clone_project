import React, {useEffect, useState} from 'react'
import { restoreUser } from './store/session';
import {Route, Switch} from 'react-router-dom'
// import LoginFormPage from './components/LoginFormModal';
import SignupFormPage from './components/SignupFormPage';
import {useDispatch} from 'react-redux'
import Navigation from './components/Navigation'


function App() {

  const dispatch = useDispatch()
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    dispatch(restoreUser()).then(() => setIsLoaded(true)) //what is setIsLoaded and is loaded
  }, [dispatch])

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route path="/signup">
            <SignupFormPage />
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
