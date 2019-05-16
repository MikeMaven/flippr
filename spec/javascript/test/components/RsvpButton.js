import '../../testHelper.js'

import RsvpButton from '../../../../app/javascript/react/components/RsvpButton'

describe('RsvpButton', () => {
  let wrapper


  beforeEach(() => {
    jasmineEnzyme();
  })

  it('renders text when user has not rsvpd', () => {
    wrapper = mount(
      <RsvpButton
        eventId={"1"}
        userRsvp={false}
      />
    )
    expect(wrapper.find('button').text()).toContain("I'm flippin!")
  })

  it('renders text when user has rsvpd', () => {
    wrapper = mount(
      <RsvpButton
        eventId={"1"}
        userRsvp={true}
      />
    )
    expect(wrapper.find('button').text()).toContain("I'll flip another time.")
  })
});
