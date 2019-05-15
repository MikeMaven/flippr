class User < ApplicationRecord
  mount_uploader :profile_photo, ProfilePhotoUploader
  validates :first_name, presence: true
  validates :last_name, presence: true
  validates :username, presence: true
  validates :email, presence: true
  validates :profile_photo, presence: true
  validates :search_radius, presence: true

  has_many :public_events, dependent: :destroy
  has_many :user_event_comments, dependent: :destroy
  has_many :user_event_rsvps, dependent: :destroy

  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable,
         :omniauthable, omniauth_providers: %i[facebook]
  has_many :friendships
  has_many :friends, :through => :friendships
  has_many :inverse_friendships, :class_name => "Friendship", :foreign_key => "friend_id"
  has_many :inverse_friends, :through => :inverse_friendships, :source => :user

  reverse_geocoded_by :latitude, :longitude,
    :address => :location
  after_validation :reverse_geocode

  def self.from_omniauth(auth)
    where(provider: auth.provider, uid: auth.uid).first_or_create do |user|
      user.email = auth.info.email
      user.password = Devise.friendly_token[0, 20]
      user.first_name = auth.info.first_name
      user.username = auth.info.name
      user.last_name = auth.info.last_name
      user.profile_photo = auth.info.image
    end
  end

  def self.new_with_session(params, session)
    super.tap do |user|
      if data = session["devise.facebook_data"] && session["devise.facebook_data"]["extra"]["raw_info"]
        user.email = data["email"] if user.email.blank?
      end
    end
  end
end
