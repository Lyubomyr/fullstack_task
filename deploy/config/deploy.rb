lock '3.11.0'

set :application_name, "fullstack_task"
set :repo_url, 'git@github.com:Lyubomyr/fullstack_task.git'
set :nginx_server_name, "fullstack_task.ortsoft.com"
set :use_certbot_ssl, false

set :deploy_user, 'deploy'
set :user, ENV['user'] || fetch(:deploy_user)
set :application, "#{fetch :application_name}_#{fetch :stage}"
set :deploy_to, "/home/#{fetch(:user)}/applications/#{fetch(:application)}"
set :ruby_version, File.read('.ruby-version').strip
set :rvm1_ruby_version, "#{fetch(:ruby_version)}@#{fetch(:application_name)}"
set :rvm1_map_bins, %w{rake gem bundle ruby sidekiq sidekiqctl}
set :unicorn_name, "unicorn_#{fetch(:application)}"
set :sidekiq_name, "sidekiq_#{fetch(:application)}"
set :sidekiq_config, 'config/sidekiq.yml'

set :linked_files, %w{config/database.yml config/unicorn.rb config/master.key .ruby-version .env}
set :linked_dirs, fetch(:linked_dirs, []) + %w{log pids sockets public/uploads public/assets tmp/cache}

set :monit_notification_type, :email # or :slack . Configure mailserver in monitrc file or slack in slack_notifications.sh
set :monit_password, "secure_pass" # to access /monit url

set :pg_password, 'asdkfj@$KJnfsdnm123'
set :db_local_clean, true
set :db_remote_clean, true
set :locals_rails_env, "development"
set :dump_file_folder, "../db"
set :conditionally_migrate, true

set :log_level, :debug
set :port, 22
set :scm, :git
set :deploy_via, :remote_cache
set :use_sudo, false
set :bundle_binstubs, nil
set :ssh_options, { forward_agent: true, auth_methods: %w(publickey password), user: fetch(:user) }
set :keep_releases, 5

load 'config/config_path.rb'
Dir.glob('config/recipes/*.rb').each { |r| load r }

set :bundle_exec, "cd #{fetch(:current_path)}; #{fetch(:rvm1_auto_script_path)}/rvm-auto.sh #{fetch(:rvm1_ruby_version)} bundle exec"

before "rvm1:hook", "install:all"
before "rvm1:install:ruby", "rvm1:install:rvm"

before 'deploy', 'rvm1:install:ruby'
before 'deploy', 'rvm1:install:gems'
before 'deploy', 'rvm1:alias:create'

after 'postgresql:generate_database_yml', 'setup:all'
after 'deploy:check:make_linked_dirs', 'rvm1:create_rvmrc'
after 'deploy:assets:precompile', 'rails:compile'
after 'deploy:publishing', 'unicorn:upgrade'   # it's like restart, but with zero downtime
