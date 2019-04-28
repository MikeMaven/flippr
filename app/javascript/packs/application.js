
import React from 'react'
import { render } from 'react-dom'

import NewsFeed from '../react/components/NewsFeed'
import RedBox from 'redbox-react'

document.addEventListener('DOMContentLoaded', () => {
  let reactElement = document.getElementById('app')

  if (reactElement) {
    if(window.railsEnv && window.railsEnv === 'development'){
      try {
        render(<NewsFeed />, reactElement)
      } catch (e) {
        render(<RedBox error={e} />, reactElement)
      }
    }
    else {
      render(<NewsFeed />, reactElement)
    }
  }
})
