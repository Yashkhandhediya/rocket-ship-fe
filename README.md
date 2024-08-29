# Cargo Cloud Frontend

## Overview

Cargo Cloud Frontend is a React application designed to provide an intuitive user interface for managing cargo and shipment data. It interacts with the backend API built with FastAPI, offering seamless integration and user-friendly functionalities. The application leverages modern JavaScript and React practices to ensure a responsive and robust user experience.

## Installation

To set up and run the Cargo Cloud Frontend project, follow these steps:

1. **Clone the repository:**

    ```bash
    git clone https://github.com/your-username/cargo-cloud-frontend.git
    cd cargo-cloud-frontend
    ```

2. **Install dependencies:**

    Before installing dependencies, make sure you are using Node.js version 20. You can use [nvm (Node Version Manager)](https://github.com/nvm-sh/nvm) to manage your Node.js versions:

    ```bash
    nvm install 20
    nvm use 20
    ```

    Then, install the required dependencies using `npm`:

    ```bash
    npm install
    ```

3. **Configure environment variables:**

    Create a `.env` file in the root directory and add the necessary environment variables. For example:

    ```env
    REACT_APP_API_BASE_URL=http://localhost:8000/api
    ```

    Adjust the `REACT_APP_API_BASE_URL` to point to your backend API.

4. **Run the application:**

    Start the development server:

    ```bash
    npm start
    ```

    The application will be running at `http://localhost:3000`.

## Scripts

- **`npm start`**: Runs the app in development mode.
- **`npm run build`**: Builds the app for production to the `build` folder.
- **`npm test`**: Launches the test runner in the interactive watch mode.
- **`npm run eject`**: Ejects the application from `create-react-app` configuration (not recommended).

## Testing

To run tests, use:

```bash
npm test