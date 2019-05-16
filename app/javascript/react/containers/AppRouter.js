import React from 'react';
import { Router, browserHistory, Route, IndexRoute } from 'react-router';

import NewsFeed from './NewsFeed'
import PublicEventShowContainer from './PublicEventShowContainer'
import LocationButton from '../components/LocationButton'
import UserDashboardContainer from './UserDashboardContainer'
import UserProfileContainer from './UserProfileContainer'
import PublicEventEditContainer from './PublicEventEditContainer'
import UserAllEventsContainer from './UserAllEventsContainer'

export const AppRouter = props => {
  return(
    <div>
      <Router history={browserHistory}>
        <Route path='/' component={NewsFeed}/>
        <Route path='public_events/:id' component={PublicEventShowContainer}/>
        <Route path='/location' component={LocationButton}/>
        <Route path='/dashboard/:id' component={UserDashboardContainer}/>
        <Route path='/users/:id' component={UserProfileContainer} />
        <Route path='public_events/:id/edit' component={PublicEventEditContainer}/>
        <Route path="/users/:user_id/public_events" component={UserAllEventsContainer} />
      </Router>
    </div>
  )
}

export default AppRouter
