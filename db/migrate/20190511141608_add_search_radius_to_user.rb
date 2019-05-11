class AddSearchRadiusToUser < ActiveRecord::Migration[5.2]
  def change
    add_column :users, :search_radius, :integer, null: false, default: 100
  end
end
