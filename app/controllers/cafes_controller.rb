class CafesController < ApplicationController
  def search
    render json: Cafe.all.select(:lat, :lng, :name).to_json
  end

  def new
  end

  def edit
  end

  def create
  end

  def update
  end

  def destroy
  end

  private
end
