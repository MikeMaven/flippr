class UserEventComment < ApplicationRecord
  belongs_to :user

  belongs_to :public_event
end
