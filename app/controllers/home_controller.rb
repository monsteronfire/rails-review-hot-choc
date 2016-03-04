class HomeController < ApplicationController
  def index
    @cafes = Cafe.all.order("created_at DESC")
  end

  def profile
  end
end
