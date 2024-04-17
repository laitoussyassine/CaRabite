# Carabite - Trusted Mechanics Platform

Welcome to Carabite, a platform that connects car owners with trusted mechanics for maintenance and repairs. This project is built using the MERN (MongoDB, Express.js, React, Node.js) stack with a monorepo structure.

## Table of Contents

- [Project Structure](#project-structure)
- [Dependencies](#dependencies)
- [Development](#development)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Running the Application](#running-the-application)
- [Environment Variables](#environment-variables)
- [License](#license)

## Project Structure

- `server`: Backend API built with Express.js and Node.js.
- `src`: Frontend React Vite application.

## Dependencies

The project uses various dependencies and devDependencies. Notable ones include:

- [axios](https://axios-http.com/): Promise-based HTTP client for the browser and Node.js.
- [express](https://expressjs.com/): Fast, unopinionated, minimalist web framework for Node.js.
- [mongoose](https://mongoosejs.com/): Elegant MongoDB object modeling for Node.js.
- [react](https://reactjs.org/): A JavaScript library for building user interfaces.

For a complete list of dependencies, refer to the `package.json` files in each package.

## Development

### Prerequisites

Make sure you have the following installed:

- Node.js
- npm or yarn
- MongoDB Atlas account (for the database)

### Installation

Clone the repository:

```bash
git clone https://github.com/laitoussyassine/CaRabite.git
```

### Install dependencies:

```
    cd carabite
    npm install
```

### Environment Variables

Create a `.env` file in the root of the project with the following variables:

```
  MONGO_URI=your-mongodb-uri
  PORT=your-mongodb-port
  DB_NAME=your-database-name
```

## License

This project is licensed under the MIT `License` - see the LICENSE file for details.

`Feel free to adapt this template based on your specific project details.`
