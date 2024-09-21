# Express App

This is a Node.js application built with Express.js.

## Getting Started

To get started, clone the repository and install the dependencies:

```bash
git clone https://github.com/Tanay-Verma/Dev-Assignment.git
cd express-app
npm install
```

## Running the Application

To start the application, run:

```bash
npm start
```

This will start the server on port 3000. You can access the application by visiting [http://localhost:3000](http://localhost:3000) in your web browser.

## Development Mode

To start the application in development mode, run:

```bash
npm run dev
```

This will start the server with nodemon, which will automatically restart the server when changes are made to the code.

## Loading Data

To load data into the database, run:

```bash
npm run load_data
```

This will execute the script in `db/insert_into_db.js` to populate the database.

## Docker Compose

This application uses Docker Compose to manage the MongoDB instance. To start the MongoDB instance, run:

```bash
docker-compose up
```

This will start the MongoDB instance on port 27017.

## Environment Variables

This application uses environment variables to configure the MongoDB connection. You can set the `MONGODB_URI` environment variable in the `.env` file.

## Dependencies

This application uses the following dependencies:

* `cors`: for handling CORS requests
* `csv-parser`: for parsing CSV files
* `dotenv`: for loading environment variables from the `.env` file
* `express`: for building the web application
* `mongoose`: for interacting with the MongoDB database