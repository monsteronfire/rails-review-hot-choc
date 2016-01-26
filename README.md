# Review Hot Chocolate
Review Hot Chocolate is an app that was made for the specific reviewing of hot chocolate.

## Project Todo List
* Add Users with `devise`
* Allow Users to sign in using either email or Facebook
* User must sign in to add review
* User can include a star rating with their review
* User need not sign in to see reviews
* Each cafe/location has a map

## Gems to be used
* [omniauth](https://github.com/intridea/omniauth)
* [omniauth-facebook](https://github.com/plataformatec/devise/wiki/OmniAuth:-Overview)
* [bourbon](https://github.com/thoughtbot/bourbon)
* [neat](https://github.com/thoughtbot/neat)
* [refills](http://github.com/thoughtbot/refills)
* [refile](https://github.com/refile/refile)
* [searchkick](https://github.com/ankane/searchkick)

## Gems to be used generally and for production (deploying to Heroku)
```ruby
# Review Hot Choc Germs
gem 'omniauth-facebook'
gem 'bourbon'
gem 'neat'
gem 'refills', group: :development
gem 'refile'
gem 'searchkick'

group :production do
  gem 'pg'
  gem 'rails_12factor'
end
```

Generate new app
```zsh
rails new reviewhotchoc
```
### Omniauth Facebook
[Reference Tutorial](https://www.youtube.com/watch?v=11BInedaQSo&ab_channel=Stuk.io)
Generate `User` model
```zsh
rails generate model User provider:string uid:string name:string
bundle exec rake db:migrate
```

Add gem to Gemfile
```ruby
gem 'omniauth-facebook'
```

Run
```zsh
bundle install
```

Create a new initializer
```zsh
touch config/initializers/omniauth.rb
```

And add the following:
```ruby
Rails.application.config.middleware.use OmniAuth::Builder do
  provider :facebook, 'APP_ID', 'APP_SECRET'
end
```

### Welcome Page
```zsh
rails generate controller Home index profile
```

In `config/routes.rb`, set the root to point to the Welcome page
```ruby
Rails.application.routes.draw do
  root 'home#index'
  get 'home#profile'
end
```

Generate a `sessions controller`
```zsh
rails generate controller sessions 
```

And copy these methods to `app/controllers/sessions_controller.rb`
```ruby
class SessionsController < ApplicationController
  def create
    auth = request.env["omniauth.auth"]
    session[:omniauth] = auth.except 'extra'
    user = User.sign_in_from_omniauth auth
    session[:user_id] = user.id
    redirect_to root_url, notice: "SIGNED IN"
  end

  def destroy
    session[:user_id] = nil
    session[:omniauth] = nil
    redirect_to root_url, notice: "SIGNED OUT"
  end
end
```

In `app/model/user.rb`, add the following:
```ruby
class User < ActiveRecord::Base
  def self.sign_in_from_omniauth(auth)
    find_by(provider: auth['provider'], uid: auth['uid']) ||
            create_user_from_omniauth(auth)
  end

  def self.create_user_from_omniauth(auth)
    create(
      provider: auth['provider'],
      uid: auth['uid'],
      name: auth['info']['name']
    )
  end
end
```

In `app/controllers/application_controller.rb`, add
```ruby
class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception

  private
    def current_user
      @current_user ||= User.find(session[:user_id]) if session[:user_id]
    end

    helper_method :current_user
end

```