module.exports = {
  apps: [
    {
      name: 'zarghamsanat',
      script: 'node_modules/.bin/next',
      args: 'start',
      cwd: '/var/www/zarghamsanat.ir',
      instances: 'max',
      exec_mode: 'cluster',
      watch: false,
      max_memory_restart: '1G',
      env: {
        NODE_ENV: 'production',
        PORT: 3000,
      },
      error_file: '/var/log/pm2/zarghamsanat-error.log',
      out_file: '/var/log/pm2/zarghamsanat-out.log',
      log_date_format: 'YYYY-MM-DD HH:mm:ss',
    },
  ],
}
