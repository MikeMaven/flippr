class AddTitleToPublicEvents < ActiveRecord::Migration[5.2]
  def change
    add_column :public_events, :title, :string, {null: false}
    add_column :private_events, :title, :string, {null: false}
  end
end
