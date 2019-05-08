class AddLocationIdToPublicEvents < ActiveRecord::Migration[5.2]
  def change
    add_column :public_events, :location_id, :integer
  end
end
