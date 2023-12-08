# Virtuagym Assessment

This assessment serves as a simple system that manages check-ins at fitness clubs. It allows a series of REST API endpoint that allow you to perform CRUD (Create, Read, Update, Delete) operations.
There are also additional functionalites to process the turnstile check-ins, manage the status of the memberships and invoices.



# Architecture and design choices
The system was designed and built using various tools and techniques. Below is an explanation of what each does.

1. Javascript (Express.js): JavaScript was the main programming language used to build the system. Express.js is a framework used to build APIs. 
2. Node.js: Node.js is a runtime that allows for running JavaScript locally.
3. Sequelize: Sequelize is an ORM (Object-Relational Mapper). It's a tool that lets you interact with your database, similiarly to how you would interact with a JavaScript object.
4. Docker: Docker was the tool i used for containerization. 
5. PostgreSQL PostgreSQL is an advanced open-source relational database management system utilizing SQL for data management.
6. Jest: Jest is a JavaScript testing framework with a focus on simplicity.

The design pattern is often reffered to as MVC (Model-View-Controller). It helps keeping code easier to maintain and understand.

# Installation Guide

Make sure you have the following prerequisites installed on your machine:

- Docker (https://docs.docker.com/get-docker/)
- Docker Compose (https://docs.docker.com/compose/install/)
- Node.js v19 or above (https://nodejs.org/en/download)

Steps:
1. Clone the repository onto your local machine by running the following command in a terminal "https://github.com/recruitmentvg/sallahda"
2. Navigate into the cloned directory "cd virtuagym-assignment"
3. Install all the necessary dependencies "npm install"

Run locally:
4. Run the server file "node index.js"

With Docker:
4. Build the Docker image "docker build -t virtuagym-assignment ."
5. Run the Docker container "docker run -p 8080:3000 virtuagym-assignment"

Note: You'll also have to configure the PostgreSQL database connection. To do this navigate to the config folder and change the database credentials in connection.js. Also change the database credentials in the docker compose file, in both the environment variables for the db and the db link for the app.

The application should now be running at http://localhost:3000.

If you wish to interact with the endpoints, you can use tools like Postman or Curl.

# Run the tests 

Below are the steps to run the tests.

Steps:
1. Make sure you're in the root directory of the project.
2. Run the test command "npm test"

# Database setup/integration

I created a script for the integration of the models into the database, and also inserts mock objects for testing purposes.

These are the steps to integrate the models into your database using Sequelize and a self made script:
1. Make sure PostgreSQL is running, either locally or with Docker.
2. Make sure your database credentials have been correctly configured in the config folder (connection.js)
3. Navigate to the integration folder.
4. To run the script use "node integration.js"





