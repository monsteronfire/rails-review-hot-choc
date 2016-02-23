class CafesController < ApplicationController
  before_action :find_cafe, only: [:show, :edit, :update, :destroy]
  before_action :authenticate_user!, except: [:index, :show]

  def search
    render json: Cafe.all.select(:lat, :lng, :name).to_json
  end

  def index
  end

  def show
  end

  def new
    @cafe = current_user.cafes.build
  end

  def create
    @cafe = current_user.cafes.build(cafe_params)

    if @cafe.save
      redirect_to @cafe
    else
      render 'new'
    end
  end

  def edit
  end

  def update
  end

  def destroy
  end

  private
    def find_cafe
      @cafe = Cafe.find(params[:id])
    end

    def cafe_params
      params.require(:cafe).permit(:name)
    end
end
