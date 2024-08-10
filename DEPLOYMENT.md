# Deloying on Render

URL: https://dashboard.render.com/

## Web Service

Language: Node

Build Command (copy on one line):
npm install &&
npm run build &&
npm run sequelize --prefix backend db:migrate &&
npm run sequelize --prefix backend db:seed:all

Start Command: npm start

Environment Variables:
JWT_SECRET (click "Generate" to generate a secure secret for production)
JWT_EXPIRES_IN (copy value from local .env file)
NODE_ENV production
SCHEMA hauntedbnb_schema
DATABASE_URL (copy from PostgreSQL internal URL)

Auto-Deply: Yes

Instance Type: Free


## PostgreSQL

Name: db

Instance Type: Free
