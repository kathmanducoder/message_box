class ApplicationController < ActionController::Base

  helper_method :current_user

  def index
    if logged_in?
      redirect_to potlucks_path
    end
  end

  def logged_in?
    !!session[:user_id]
  end

  def current_user
    if logged_in?
      User.find_by(id:session[:user_id])
    end
  end
  
end
