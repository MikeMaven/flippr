require 'factory_bot'
require 'faker'

FactoryBot.define do
  factory :user do
    sequence(:email) {|n| "user#{n}@example.com" }
    password { 'password' }
    password_confirmation { 'password' }
    first_name { Faker::Name.first_name }
    last_name { Faker::Name.last_name }
    username { Faker::Internet.username(8) }
    profile_photo { Rack::Test::UploadedFile.new(Rails.root.join('spec/support/test.jpg'), 'image/jpeg') }
  end

end
