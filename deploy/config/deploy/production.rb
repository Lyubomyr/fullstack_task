server '172.104.148.197', roles: [:web, :app, :db], port: fetch(:port), user: fetch(:user), primary: true
set :stage, :production
set :rails_env, 'production'
set :branch, ENV["REVISION"] || ENV["BRANCH"] || "master"
