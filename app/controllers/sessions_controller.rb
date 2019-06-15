class SessionsController < ApplicationController

  def new
    render partial: 'sessions/login'
  end

  def create
    user = User.find_by(username: params[:username])
    if !user
      flash[:errorlogin] = "User not found."
      redirect_to root_path
    elsif !user.authenticate(params[:password])
      flash[:errorlogin] = "Incorrect password."
      redirect_to root_path
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
