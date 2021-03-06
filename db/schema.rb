# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2019_05_14_165439) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "private_events", force: :cascade do |t|
    t.bigint "user_id", null: false
    t.string "location_name", null: false
    t.string "location_address", null: false
    t.string "location_city", null: false
    t.string "location_state", null: false
    t.string "location_zip", null: false
    t.date "date", null: false
    t.time "start_time", null: false
    t.time "end_time", null: false
    t.text "description", null: false
    t.string "event_photo"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "title", null: false
    t.index ["user_id"], name: "index_private_events_on_user_id"
  end

  create_table "public_events", force: :cascade do |t|
    t.bigint "user_id", null: false
    t.string "location_name", null: false
    t.string "location_address", null: false
    t.string "location_city", null: false
    t.string "location_state", null: false
    t.string "location_zip", null: false
    t.string "start_time", null: false
    t.string "end_time", null: false
    t.text "description", null: false
    t.string "event_photo"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "title", null: false
    t.integer "location_id"
    t.decimal "latitude", precision: 10, scale: 6
    t.decimal "longitude", precision: 10, scale: 6
    t.index ["user_id"], name: "index_public_events_on_user_id"
  end

  create_table "user_event_comments", force: :cascade do |t|
    t.bigint "user_id", null: false
    t.bigint "public_event_id", null: false
    t.string "body", null: false
    t.index ["public_event_id"], name: "index_user_event_comments_on_public_event_id"
    t.index ["user_id"], name: "index_user_event_comments_on_user_id"
  end

  create_table "user_event_rsvps", force: :cascade do |t|
    t.bigint "user_id", null: false
    t.bigint "public_event_id", null: false
    t.boolean "attending", default: false
    t.index ["public_event_id"], name: "index_user_event_rsvps_on_public_event_id"
    t.index ["user_id", "public_event_id"], name: "index_user_event_rsvps_on_user_id_and_public_event_id", unique: true
    t.index ["user_id"], name: "index_user_event_rsvps_on_user_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "email", default: "", null: false
    t.string "encrypted_password", default: "", null: false
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "first_name", null: false
    t.string "last_name", null: false
    t.string "username", null: false
    t.string "profile_photo"
    t.decimal "latitude", precision: 10, scale: 6
    t.decimal "longitude", precision: 10, scale: 6
    t.string "location"
    t.integer "search_radius", default: 100, null: false
    t.string "bio", default: "This user has not added a bio yet.", null: false
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true
  end

end
