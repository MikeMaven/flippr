class AddLatAndLonToUsers < ActiveRecord::Migration[5.2]
  def change
    add_column :users, :latitude, :decimal, {:precision=>10, :scale=>6}
    add_column :users, :longitude, :decimal, {:precision=>10, :scale=>6}
  end
end
