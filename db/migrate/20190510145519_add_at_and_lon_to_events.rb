class AddAtAndLonToEvents < ActiveRecord::Migration[5.2]
  def change
    add_column :public_events, :latitude, :decimal, {:precision=>10, :scale=>6}
    add_column :public_events, :longitude, :decimal, {:precision=>10, :scale=>6}
  end
end
