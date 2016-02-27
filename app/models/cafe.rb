class Cafe < ActiveRecord::Base
  # searchkick
  
  belongs_to :user
  has_many :reviews

  accepts_nested_attributes_for :reviews, reject_if: :all_blank, allow_destroy: true
end
