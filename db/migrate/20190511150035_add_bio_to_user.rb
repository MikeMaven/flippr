class AddBioToUser < ActiveRecord::Migration[5.2]
  def change
    add_column :users, :bio, :string, null: false, default: "This user has not added a bio yet."
  end
end
