[![Codeship Status for MikeMaven/flippr](https://app.codeship.com/projects/f631c870-497e-0137-a621-6a504c50fb4c/status?branch=master)](https://app.codeship.com/projects/338186)

# FLIPPR

Flippr is a fully featured Rails and React social event feed for pinball players built in Ruby 2.4.5 and React 15

To contribute to the React Native version, please check out my flippr-react-native repo. It is in the early stages of development and could use your input!

## How to set up Flippr on your local machine

**You must have Ruby 2.4.5 and Yarn installed on your system**
1. Fork or clone this repo to your machine with `git clone`
2. Run these commands in your terminal:<br/>
  `$ bundle exec bundle install`<br/>
  `$ yarn install`<br/>
  `$rake db:create`<br/>
  `$rake db:migrate`<br/>
3. Start the server:<br/>
  `$ rails s`<br/>
   In another tab - `$ yarn run start`
4. Visit `localhost:3000` in your browser
