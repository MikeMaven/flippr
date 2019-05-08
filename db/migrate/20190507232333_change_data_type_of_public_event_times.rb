class ChangeDataTypeOfPublicEventTimes < ActiveRecord::Migration[5.2]
  def up
    change_column :public_events, :start_time, :string, null: false
    change_column :public_events, :end_time, :string, null: false
  end

  def down
    change_column :public_events, :start_time, :string, null: false
    change_column :public_events, :end_time, :string, null: false
  end
end
