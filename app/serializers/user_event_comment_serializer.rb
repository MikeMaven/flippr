class UserEventCommentSerializer < ActiveModel::Serializer
  attributes :id, :user_id, :public_event_id, :body, :created_by
end
