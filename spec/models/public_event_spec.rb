require 'rails_helper'

RSpec.describe PublicEvent, type: :model do
  it { should have_valid(:title).when("Let's have fun!")}
  it { should_not have_valid(:title).when(nil, "")}

  it { should have_valid(:location_name).when("Shelter Arcade Bar")}
  it { should_not have_valid(:location_name).when(nil, "")}

  it { should have_valid(:location_address).when("103 Dike St")}
  it { should_not have_valid(:location_address).when(nil, "")}

  it { should have_valid(:location_city).when("Providence")}
  it { should_not have_valid(:location_city).when(nil, "")}

  it { should have_valid(:location_state).when("RI")}
  it { should_not have_valid(:location_state).when(nil, "")}

  it { should have_valid(:location_zip).when("02909")}
  it { should_not have_valid(:location_state).when(nil, "")}

  it { should have_valid(:description).when("A fun time!")}
  it { should_not have_valid(:description).when(nil, "")}
end
