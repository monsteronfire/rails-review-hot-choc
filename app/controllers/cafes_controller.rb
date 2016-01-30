class CafesController < ApplicationController
  def search
    render json: Cafe.all.select(:lat, :lng, :name).to_json
  end
end
