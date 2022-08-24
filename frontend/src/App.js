import React, {useEffect, useState} from 'react'
import { restoreUser } from './store/session';
import {Route, Switch} from 'react-router-dom'
// import LoginFormPage from './components/LoginFormModal';
import SignupFormPage from './components/SignupFormPage';
import {useDispatch} from 'react-redux'
import Navigation from './components/Navigation'
import GetSpots from './components/SpotsPage/GetAllSpots';
import SpotById from './components/SpotsPage/SpotDetails';
import CreateSpot from './components/SpotFormPage/createSpot';
import UserSpots from './components/SpotsPage/UserSpots';


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
          <Route exact path="/signup">
            <SignupFormPage />
          </Route>
          <Route exact path='/'>
            <GetSpots />
          </Route>
          <Route exact path={'/spots/create'}>
            <CreateSpot />
          </Route>
          <Route exact path={'/spots/:spotId'}>
            <SpotById />
          </Route>
          <Route exact path={`/mySpots`}>
            <UserSpots />
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
