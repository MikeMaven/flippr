class AddIndexToUserEventRsvps < ActiveRecord::Migration[5.2]
  def change
    add_index :user_event_rsvps, [:user_id, :public_event_id], unique: true
  end
end
