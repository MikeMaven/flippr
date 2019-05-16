import '../../testHelper.js'
import EventDiscussionTile from '../../../../app/javascript/react/components/EventDiscussionTile'

describe('EventDiscussionTile',() => {
  let wrapper

  beforeEach(() => {
    jasmineEnzyme();
    wrapper = mount(
      <EventDiscussionTile
        eventId={1}
        id={1}
        key={1}
        user={
          {
            id: 1,
            first_name: "Mike",
            last_name: "Maven",
            profile_photo: {
              thumb: {
                url: "../../../support/test.jpg"
              }
            }
          }
        }
        currentUser={1}
        body={"I can't believe it"}
      />
    )
  })

  it('renders the content of the body', () => {
    expect(wrapper.find('div.event-comment-body').text()).toContain("I can't believe it")
  })

  it('renders the photo and name of the person who created it', () => {
    expect(wrapper.find('img').prop('src')).toEqual("../../../support/test.jpg")
  })

})
