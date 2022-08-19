import React, {useEffect} from 'react'
import { restoreUser } from './store/session';
import {Route, Switch} from 'react-router-dom'
import LoginFormPage from './components/LoginFormPage';
import {useDispatch} from 'react-redux'


function App() {

  const dispatch = useDispatch()


  useEffect(() => {
    dispatch(restoreUser()) //what is setIsLoaded and is loaded
  }, [dispatch])

  return (
    <Switch>
      <Route path='/login'>
        <LoginFormPage />
      </Route>
    </Switch>
  );
}

export default App;
