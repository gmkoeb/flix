class CheckSessionController < ApplicationController
  before_action :authenticate_user
  
  def check
    render status: 200, json: { session: 'Authorized' }
  end
end