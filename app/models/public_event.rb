class PublicEvent < ApplicationRecord
  mount_uploader :event_photo, PublicEventPhotoUploader
  validates :user_id, presence: true
  validates :title, presence: true, length: { maximum: 60 }
  validates :location_name, presence: true
  validates :location_address, presence: true
  validates :location_city, presence: true
  validates :location_state, presence: true
  validates :location_zip, presence: true
  validates :start_time, presence: true
  validates :end_time, presence: true
  validates :description, presence: true

  geocoded_by :the_address
  after_validation :geocode

  def the_address
    "#{location_address} #{location_city} #{location_state}"
  end

  def created_by
    User.find(user_id)
  end
end
