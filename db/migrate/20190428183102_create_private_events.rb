class CreatePrivateEvents < ActiveRecord::Migration[5.2]
  def change
    create_table :private_events do |t|
      t.belongs_to :user, null: false
      t.string :location_name, null: false
      t.string :location_address, null: false
      t.string :location_city, null: false
      t.string :location_state, null: false
      t.string :location_zip, null: false
      t.date :date, null: false
      t.time :start_time, null: false
      t.time :end_time, null: false
      t.text :description, null: false
      t.string :event_photo

      t.timestamps
    end
  end
end
