class CafesController < ApplicationController
  def search
    render json: Cafe.all.select(:lat, :lng, :name).to_json
  end

  def index
  end

  def new
    @cafe = Cafe.new
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
    def set_cafe
    end

    def cafe_params
    end
end
