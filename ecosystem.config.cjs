module.exports = {
  apps: [
    {
      name: 'zarghamsanat',
      script: 'node_modules/.bin/next',
      args: 'start',
      cwd: '/var/www/zarghamsanat',
      instances: 1,
      exec_mode: 'fork',
      watch: false,
      max_memory_restart: '1G',
      env: {
        NODE_ENV: 'production',
        PORT: 3006,
      },
      error_file: '/var/log/pm2/zarghamsanat-error.log',
      out_file: '/var/log/pm2/zarghamsanat-out.log',
      log_date_format: 'YYYY-MM-DD HH:mm:ss',
    },
  ],
}
