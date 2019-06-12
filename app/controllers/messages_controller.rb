class MessagesController < ApplicationController

  def new
    render layout: false
  end

  def create
    message = Message.new
    recipient = User.find_by(username: params[:recipient_username])
    if !recipient
      flash[:error] = `Cannot send message to #{params[:recipient_username]}. User doesn't exist.`
      redirect_to current_user
    else
      message.assign_attributes(sender_id: current_user.id, recipient_id: recipient.id, subject: params[:subject], content: params[:content])
      message.save
      redirect_to current_user
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
