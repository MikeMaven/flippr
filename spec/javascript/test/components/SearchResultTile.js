import '../../testHelper.js'

import SearchResultTile from '../../../../app/javascript/react/components/SearchResultTile'

describe('SearchResultTile', () => {
  let wrapper


  beforeEach(() => {
    jasmineEnzyme();
    wrapper = mount(
      <SearchResultTile
        name={"Pizza Planet"}
        city={"Tri-County"}
        state={"CA"}
      />
    )
  })
  it('renders the location name, city, and state', () => {
    expect(wrapper.find('div').text()).toContain("Pizza Planet - Tri-County, CA")
  })
});
