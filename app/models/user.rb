class User < ApplicationRecord
  mount_uploader :profile_photo, ProfilePhotoUploader
  validates :first_name, presence: true
  validates :last_name, presence: true
  validates :username, presence: true
  validates :email, presence: true
  validates :profile_photo, presence: true
  validates :search_radius, presence: true

  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable
  has_many :friendships
  has_many :friends, :through => :friendships
  has_many :inverse_friendships, :class_name => "Friendship", :foreign_key => "friend_id"
  has_many :inverse_friends, :through => :inverse_friendships, :source => :user

  reverse_geocoded_by :latitude, :longitude,
    :address => :location
  after_validation :reverse_geocode
end
