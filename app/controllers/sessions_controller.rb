class SessionsController < ApplicationController

  def new
    render partial: 'sessions/login'
  end

  def create
    user = User.find_by(username: params[:username])
    if !user
      flash[:error] = "User not found."
      redirect_to login_path
    elsif !user.authenticate(params[:password])
      flash[:error] = "Incorrect password."
      redirect_to login_path
    else
      session[:user_id] = user.id
      redirect_to user
    end
  end

  def destroy
    if session[:user_id]
      session.delete :user_id
    end
    redirect_to root_path
  end

end
