namespace :sidekiq do
  desc "Setup sidekiq init.d script"
  task :script do
    on roles(:web) do
      script "sidekiq.sh.erb", fetch(:sidekiq_script_path)
    end
  end

  desc "Download sidekiq config and init.d files"
  task :sync do
    on roles(:all) do
      sync fetch(:sidekiq_conf_path), "sidekiq", clear: true
      sync "/etc/init.d/#{fetch(:sidekiq_name)}", "sidekiq"
    end
  end

  %w[start stop status].each do |command|
    desc "#{command} sidekiq server"
    task command do
      on roles(:app), except: {no_release: true} do
        puts "/etc/init.d/#{fetch(:sidekiq_name)} #{command}"
        sudo "/etc/init.d/#{fetch(:sidekiq_name)} #{command}"
      end
    end
  end
end
