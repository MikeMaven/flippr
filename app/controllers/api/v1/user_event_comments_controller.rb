class Api::V1::UserEventCommentsController < ApiController
  def create
    comment = UserEventComment.new(user: current_user, public_event_id: params[:public_event_id], body: comment_params[:body])

    comment.save

    render json: { comments: serialized_event_comments }
  end

  def destroy
    UserEventComment.find(params[:id]).delete
  end

  def comment_params
    params.require(:comment).permit(:body)
  end

  def serialized_event_comments
    ActiveModel::Serializer::ArraySerializer.new(UserEventComment.where(public_event: PublicEvent.find(params[:public_event_id])), each_serializer: UserEventCommentSerializer)
  end
end
