class UserEventComment < ApplicationRecord
  belongs_to :user

  belongs_to :public_event

  def created_by
    User.find(self.user_id)
  end
end
