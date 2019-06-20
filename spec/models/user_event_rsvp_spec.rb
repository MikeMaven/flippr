require 'rails_helper'

RSpec.describe UserEventRsvp, type: :model do
  it { should belong_to(:user) }
  it { should belong_to(:public_event) }
end
