# How to run locally
1. Clone from this repo https://github.com/ramdanplusplus/express-tutorial
   ```bash
   git clone https://github.com/ramdanplusplus/express-tutorial
   ```
2. Change directory to current tutorial
   ```bash
   cd express-tutorial-1
   ```
3. Run sql query in folder db-migration
   ```bash
   cd express-tutorial-1
   ```
4. Setting up .env file
   ```bash
    PORT=4000
    APP_ENV=development

    # Postgres Database
    PSQL_HOST=
    PSQL_PORT=5432
    PSQL_DATABASE=online_course_db
    PSQL_USER=postgres
    PSQL_PASSWORD=
    PSQL_SSL=
   ```
5. Install dependencies
   ```bash
   npm install
   ```
6. Run application
   ```bash
   npm run dev
   ```
7. To test application work, please open http://localhost:4000/status on your browser.# express-12
