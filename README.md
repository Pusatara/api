# Pusatara API
## Local Dev
1. Clone this branch `git clone -b api https://github.com/pandi20/pusatara`
2. [Setup MySql Server](https://dev.mysql.com/doc/mysql-getting-started/en/) on localhost
3. Put MySql credentials to `.env` (follow `.env.example` format)
4. Install and run `npm i && npm run dev`

> Note: Cloud Storage may not work on local dev. To fix this, create a service account and put the credentials to `p_sa.json` in config folder. Then, change the `projectName` in `post.controller.js` to your project name.

## Tech stack 
- Framework/Library
  - NodeJS
  - ExpressJS
  - Sequelize
- Deployment
  - Cloud Run
  - Cloud SQL
  - Cloud Storage

## Resources
- [Postman Collection](https://www.postman.com/bold-space-626447/workspace/pusatara/collection/3398277-2fc54cf2-b54f-4edc-a4c5-0011cbb3342e?action=share&creator=3398277)
- [Live API](https://pusatara.systems/)
