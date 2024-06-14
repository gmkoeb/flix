class GenresController < ApplicationController
  before_action :authenticate_user
  
  def index
    render status: 200, json: { genres: Genre.all }
  end
end