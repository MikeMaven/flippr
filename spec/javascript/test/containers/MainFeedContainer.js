import '../../testHelper.js'
import fetchMock from 'fetch-mock'

import MainFeedContainer from '../../../../app/javascript/react/containers/MainFeedConatiner'
import PublicEventTile from '../../../../app/javascript/react/components/PublicEventTile'

describe('MainFeedContainer', () => {
  let wrapper,
      events;

  beforeEach(() => {
    jasmineEnzyme();
    events = { events: [
      {
        id: 77,
        location_name: "Shelter Arcade Bar",
        location_address: "111 Dike Street",
        location_city: "Providence",
        location_state: "RI",
        location_zip: "02909",
        description: "We're graduated from Launch! Won't you come play some pinball with me to celebrate?",
        title: "Post Grad Pinball",
        event_photo: {
        url: "https://flippr-pinball-development.s3.amazonaws.com/uploads/public_event/event_photo/77/53236119_1988082774561970_1849220009201500160_o.jpg",
          thumb: {
            url: "https://flippr-pinball-development.s3.amazonaws.com/uploads/public_event/event_photo/77/thumb_53236119_1988082774561970_1849220009201500160_o.jpg"
          },
          show: {
            url: "https://flippr-pinball-development.s3.amazonaws.com/uploads/public_event/event_photo/77/show_53236119_1988082774561970_1849220009201500160_o.jpg"
          }
        },
        start_time: "2019-05-25T19:00:00-04:00",
        end_time: "2019-05-25T23:00:00-04:00",
        created_by: {
        id: 11,
        email: "mikemaven@gmail.com",
        first_name: "Mike",
        last_name: "Maven",
        username: "mikemaven",
        profile_photo: {
          url: "https://flippr-pinball-development.s3.amazonaws.com/uploads/user/profile_photo/11/25398170_10104007221093619_2348164205372396552_o.jpg",
          thumb: {
            url: "https://flippr-pinball-development.s3.amazonaws.com/uploads/user/profile_photo/11/thumb_25398170_10104007221093619_2348164205372396552_o.jpg"
          },
          profile: {
            url: "https://flippr-pinball-development.s3.amazonaws.com/uploads/user/profile_photo/11/profile_25398170_10104007221093619_2348164205372396552_o.jpg"
          }
        },
        search_radius: 100,
        },
        is_future: true,
        latitude: "41.815928",
        longitude: "-71.443345"
      }
    ]}

    fetchMock.get('/api/v1/public_events.json', {
      status: 200,
      body: events
    });

    wrapper.mount(
      <NewsFeed />
    )
  })
  setTimeout(() => {
    it('renders an event tile for each event fetched', () => {
      expect(wrapper.find(PublicEventTile)).toBePresent()
      done()
    }, 0)
  })
})
