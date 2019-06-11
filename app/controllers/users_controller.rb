class UsersController < ApplicationController
  before_action :set_user, only: [:show, :inbox, :sent_messages]

  def new
    @user = User.new
  end

  def create
    user = User.new(user_params)
    if user.valid?
      user.save
      redirect_to user
    else
      flash[:error] = "Error creating account."
      redirect_to new_user_path
    end
  end

  def show
  end

  def inbox
    render json: @user.received_messages
  end

  def sent_messages
    render json: @user.sent_messages
  end

  private

  def user_params
    params.require(:user).permit(:name, :username, :password)
  end

  def set_user
    @user = User.find_by(id: params[:id])
  end

end
