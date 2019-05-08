class RemoveDateFromPublicEvents < ActiveRecord::Migration[5.2]
  def up
    remove_column :public_events, :date
  end

  def down
    add_column :public_events, :date, :integer, null: false
  end
end
