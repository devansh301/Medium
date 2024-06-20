# Medium Clone

Welcome to the Medium Clone web application! This project is a clone of the popular blogging website Medium, developed using a modern web technology stack. Below you will find detailed instructions on how to set up, run, and contribute to this project.

## Table of Contents

- [Technology Stack](#technology-stack)
- [Project Structure](#project-structure)
- [Installation and Setup](#installation-and-setup)
  - [Prerequisites](#prerequisites)
  - [Backend Setup](#backend-setup)
  - [Frontend Setup](#frontend-setup)
- [Configuration](#configuration)
- [Running the Application](#running-the-application)
- [Contributing](#contributing)
- [License](#license)

## Technology Stack

- **Language**: TypeScript
- **Frontend**: React
- **Backend**: Hono
- **Database**: PostgreSQL
- **ORM**: Prisma
- **HTTP Client**: Axios
- **Validation**: Zod

## Project Structure

The project is organized into three main folders:

- **frontend**: Contains all the React code for the frontend.
- **backend**: Contains all the Hono code for the backend.
- **common**: Contains a custom NPM module with Zod validations and TypeScript types.

## Installation and Setup

### Prerequisites

Before you begin, ensure you have the following installed on your machine:

- Node.js (>=14.x)
- npm (>=6.x)
- PostgreSQL
- Wrangler CLI (for managing Cloudflare Workers)

### Backend Setup

1. **Clone the repository:**

   ```bash
   git clone https://github.com/yourusername/medium-clone.git
   cd medium-clone
   ```

2. **Install backend dependencies:**

   ```bash
   cd backend
   npm install
   ```

3. **Set up the database:**

   Ensure you have PostgreSQL running and create a new database. Update the `.env` file with your PostgreSQL connection URL:

   ```env
   DATABASE_URL=postgresql://username:password@localhost:5432/database_name
   ```

4. **Configure environment variables:**

   Create a `wrangler.toml` file in the `backend` directory and add the following configuration:

   ```toml
   [vars]
   DATABASE_URL = "postgresql://username:password@localhost:5432/database_name"
   JWT_SECRET = "your_jwt_secret"
   ```

5. **Run database migrations:**

   ```bash
   npx prisma migrate dev
   ```

### Frontend Setup

1. **Install frontend dependencies:**

   ```bash
   cd ../frontend
   npm install
   ```

### Common Module Setup

1. **Install common module dependencies:**

   ```bash
   cd ../common
   npm install
   npm run build
   ```

## Configuration

Ensure your `wrangler.toml` file in the `backend` directory is properly configured with your PostgreSQL URL and JWT secret:

```toml
[vars]
DATABASE_URL = "postgresql://username:password@localhost:5432/database_name"
JWT_SECRET = "your_jwt_secret"
```

Ensure your `.env` file in the project root contains the PostgreSQL connection URL:

```env
DATABASE_URL=postgresql://username:password@localhost:5432/database_name
```

## Running the Application

1. **Start the backend server:**

   ```bash
   cd backend
   npm run dev
   ```

   The backend server will run at `http://127.0.0.1:8787` in development mode.

2. **Start the frontend server:**

   ```bash
   cd ../frontend
   npm start
   ```

## Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Make your changes.
4. Commit your changes (`git commit -am 'Add new feature'`).
5. Push to the branch (`git push origin feature-branch`).
6. Create a new Pull Request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more information.
