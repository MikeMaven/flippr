class CreateUserEventComments < ActiveRecord::Migration[5.2]
  def change
    create_table :user_event_comments do |t|
      t.belongs_to :user, null: false
      t.belongs_to :public_event, null: false
      t.string :body, null: false
    end
  end
end
