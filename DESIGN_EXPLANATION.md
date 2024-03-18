# Setup Instructions.

1 - First things first, run "git pull" to ensure that you have the latest version of the repository.

2 - Ensure your docker-daemon is running, then on the root of the project, run the following command: "docker-compose up" to start up your docker container and create a potgress database image.

3 - npm install;

4 - seed the database with the sampla data by running "npm run seed";

5 - finally, run "npm run dev" to start up your development server.

# Project Overview

In this project, I'm utilizing Node.js and Express.js to construct the backend, which has proven to be a reliable choice for managing server-side development. To ensure consistency and organization, I've containerized my Postgres database using Docker.

For user authentication, I've implemented JSON Web Tokens (JWT) to securely transmit credentials between the client and server. Additionally, I've integrated a custom middleware to handle authentication seamlessly, while also enhancing security by utilizing bcrypt for password hashing.

In terms of database communication, I've found the PG library to be incredibly useful—it simplifies SQL queries and interactions with Postgres, making database operations within the Node.js environment straightforward.

To streamline development, I've configured Nodemon to automatically restart the server whenever changes are made to the code—saving valuable time and effort. Additionally, I've incorporated the express-async-handler middleware, which greatly simplifies error handling for asynchronous functions in Express.

For testing, I rely on Postman to ensure that our API endpoints function as expected.

# Design Decisions and Thoughts

## 1 - Technology Stack Selection:

-   **Node.js and Express.js**: Chosen for their efficiency in building scalable and lightweight web applications. Node.js provides a non-blocking, event-driven runtime, while Express.js offers a minimalist framework for building robust APIs and web servers.
-   **Postgres Database in Docker**: Dockerizing the database ensures consistency across environments and simplifies deployment.
-   **PG for Database Communication**: Chosen for its simplicity and compatibility with Postgres, facilitating efficient database interactions within the Node.js environment.
-   **Express Async Handler**: Integrated to simplify error handling for asynchronous route handlers in Express.js, enhancing code readability and maintainability.

## 2 - Authentication and Security:

-   **JWT Authentication**: JWT is preferred for its stateless nature, allowing scalability and flexibility in user authentication.
-   **Bcrypt Password Hashing**: Utilized for securely storing user passwords in the database, providing resistance to brute-force attacks.

## 3 - Development and Testing:

-   **Postman for API Testing**: Allows comprehensive validation of API functionality under various scenarios, ensuring adherence to specifications.
-   **Nodemon for Development**: Automates server restarts upon code changes, facilitating rapid iteration and debugging.

## Overall Thoughts:

The chosen technology stack and design decisions aim to balance performance, security, and developer experience. By leveraging established libraries and tools, the application streamlines development processes while maintaining robustness and security. Continuous testing and validation, along with automated server restarts, contribute to a smoother development workflow and faster iteration cycles.

## Test Notes

I have attached a postman collection of request I made to test the endpoints. You could make use of it to save yourself time.
