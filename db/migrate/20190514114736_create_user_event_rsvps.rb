class CreateUserEventRsvps < ActiveRecord::Migration[5.2]
  def change
    create_table :user_event_rsvps do |t|
      t.belongs_to :user, null: false
      t.belongs_to :public_event, null: false
    end
  end
end
