import React from 'react';
import { Router, browserHistory, Route, IndexRoute } from 'react-router';

import NewsFeed from './NewsFeed'
import PublicEventShowContainer from './PublicEventShowContainer'
import LocationButton from '../components/LocationButton'

export const AppRouter = props => {
  return(
    <div>
      <Router history={browserHistory}>
        <Route path='/' component={NewsFeed}/>
        <Route path='public_events/:id' component={PublicEventShowContainer}/>
        <Route path='/location' component={LocationButton}/>
      </Router>
    </div>
  )
}

export default AppRouter
