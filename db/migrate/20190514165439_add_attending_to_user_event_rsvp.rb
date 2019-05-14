class AddAttendingToUserEventRsvp < ActiveRecord::Migration[5.2]
  def change
    add_column :user_event_rsvps, :attending, :boolean, default: false
  end
end
