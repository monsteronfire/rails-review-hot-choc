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
* [devise](https://github.com/plataformatec/devise)
* [omniauth-facebook](https://github.com/plataformatec/devise/wiki/OmniAuth:-Overview)
* [bourbon](https://github.com/thoughtbot/bourbon)
* [neat](https://github.com/thoughtbot/neat)
* [refills](http://github.com/thoughtbot/refills)
* [refile](https://github.com/refile/refile)
* [searchkick](https://github.com/ankane/searchkick)

## Gems to be used generally and for production (deploying to Heroku)
```ruby
# Review Hot Choc Germs
gem 'devise'
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

## Devise
I prefer to add Users before I start doing anything else, because I dislike having to go into the `rails console` to manually associate users to posts.

