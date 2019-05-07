class AddLocationIdToPublicEvents < ActiveRecord::Migration[5.2]
  def change
    add_column :public_events, :loction_id, :integer
  end
end
