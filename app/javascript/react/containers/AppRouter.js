import React from 'react';
import { Router, browserHistory, Route, IndexRoute } from 'react-router';

import NewsFeed from './NewsFeed'
import PublicEventShowContainer from './PublicEventShowContainer'
import LocationButton from '../components/LocationButton'
import UserDashboardContainer from './UserDashboardContainer'
import UserProfileContainer from './UserProfileContainer'

export const AppRouter = props => {
  return(
    <div>
      <Router history={browserHistory}>
        <Route path='/' component={NewsFeed}/>
        <Route path='public_events/:id' component={PublicEventShowContainer}/>
        <Route path='/location' component={LocationButton}/>
        <Route path='/dashboard/:id' component={UserDashboardContainer}/>
        <Route path='/users/:id' component={UserProfileContainer} />
      </Router>
    </div>
  )
}

export default AppRouter
