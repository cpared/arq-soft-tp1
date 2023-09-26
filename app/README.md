# My Node Server

This is a Node.js server built with TypeScript and Express.

## Getting Started

1. Clone the repository
2. Install dependencies with `npm install`
3. Build the project with `npm run build`
4. Start the server with `npm start`

## Project Structure

- `src/app.ts`: Entry point of the application. Creates an instance of the Express app and sets up middleware and routes.
- `src/controllers/index.ts`: Exports a class `IndexController` which handles the root route of the application.
- `src/routes/index.ts`: Exports a function `setRoutes` which sets up the routes for the application.
- `src/types/index.ts`: Exports interfaces `Request` and `Response` which extend the interfaces from the `express` library.
- `tsconfig.json`: Configuration file for TypeScript.
- `package.json`: Configuration file for npm.

## Usage

The server listens on port 3000 by default. To access the root route, navigate to `http://localhost:3000/`. The server will respond with the message "Hello, World!".

## License

This project is licensed under the MIT License. See the `LICENSE` file for details.