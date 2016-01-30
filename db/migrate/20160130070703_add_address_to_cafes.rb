class AddAddressToCafes < ActiveRecord::Migration
  def change
    add_column :cafes, :address, :string
    add_column :cafes, :lat, :float
    add_column :cafes, :lng, :float
  end
end
