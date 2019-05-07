class PublicEvent < ApplicationRecord
  mount_uploader :event_photo, PublicEventPhotoUploader
  validates :user_id, presence: true
  validates :title, presence: true
  validates :location_name, presence: true
  validates :location_address, presence: true
  validates :location_city, presence: true
  validates :location_state, presence: true
  validates :location_zip, presence: true
  validates :date, presence: true
  validates :start_time, presence: true
  validates :end_time, presence: true
  validates :description, presence: true
end
