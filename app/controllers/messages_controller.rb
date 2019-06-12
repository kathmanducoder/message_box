class MessagesController < ApplicationController

  def new
    render layout: false
  end

  def create
    message = Message.new
    recipient = User.find_by(username: params[:recipient_username])
    if !recipient
      @reply = "Cannot send message to #{params[:recipient_username]}. User doesn't exist."
    else
      message.assign_attributes(sender_id: current_user.id, recipient_id: recipient.id, content: params[:content])
      message.save
      @reply = "Successfully sent message to #{params[:recipient_username]}."
    end
  end

  def content
    message = Message.find_by(id: params[:id])
    render plain: message.content
  end

  private

  def message_params
    params.require(:message).permit(:recipient_username, :content)
  end

end
