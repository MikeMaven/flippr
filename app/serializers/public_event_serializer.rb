class PublicEventSerializer < ActiveModel::Serializer
  attributes :id, :location_name, :location_id, :location_address, :location_city, :location_state, :location_zip, :description, :title, :event_photo, :start_time, :end_time, :created_by, :is_future
end
