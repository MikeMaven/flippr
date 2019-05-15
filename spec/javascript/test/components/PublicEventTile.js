import '../../testHelper.js'

import PublicEventTile from '../../../../app/javascript/react/components/PublicEventTile'


describe('PublicEventTile', () => {
  let wrapper,
      id,
      key,
      event_photo,
      title,
      locationName,
      user,
      date,
      current_user_id


  beforeEach(() => {
    jasmineEnzyme();
    wrapper = mount(
      <PublicEventTile
        id={1}
        key={1}
        event_photo={"../../../support/test.jpg"}
        title={"Fun times!"}
        locationName={"Shelter Arcade Bar"}
        user={{
          id: 1,
          first_name: "Mike",
          last_name: "Maven",
          profile_photo: {
            thumb: {
              url: "../../../support/test.jpg"
            }
          }
        }}
        date={"2019-05-31T20:00:00-04:00"}
        current_user_id={1}
      />
    )
  })

  it('renders a button for dropdown menu', () => {
    expect(wrapper.find('button.tiny')).toBePresent()
  })

  it('renders the thumbnail profile photo of the creating user', () => {
    expect(wrapper.find('img.event-tile-user-photo')).toBePresent()
    expect(wrapper.find('img.event-tile-user-photo').prop('src')).toEqual("../../../support/test.jpg")
  })

  it('renders the first and last name of its creating user', () => {
    expect(wrapper.find('h5.event-tile-user-name')).toBePresent()
    expect(wrapper.find('h5.event-tile-user-name').text()).toContain('Mike Maven')
  })

  it('renders the event photo', () => {
    expect(wrapper.find('img.event-tile-event-photo')).toBePresent()
    expect(wrapper.find('img.event-tile-event-photo').prop('src')).toEqual("../../../support/test.jpg")
  })

  it('renders the event title', () => {
    expect(wrapper.find('h4').text()).toContain('Fun times!')
  })

  it('render the location name', () => {
    expect(wrapper.find('p.event-tile-location').text()).toContain('Shelter Arcade Bar')
  })

  it('renders the start date and time', () => {
    expect(wrapper.find('p.event-tile-date').text()).toContain("May 31st 2019")
  })
});
