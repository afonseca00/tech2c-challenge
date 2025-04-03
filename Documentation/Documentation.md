
# Tech2C Junior Fullstack Challenge – Technical Documentation

## Introduction

This documentation provides a detailed overview of the project, including instructions for setting up the project and an explanation of the architecture and logic used. The goal is to create a service that can upload and process data about energy consumption and CO2 emissions from an Excel file, store this data in MongoDB, and allow users to interact with it via a web interface.

## Table of Contents

- [Setup Instructions](#setup-instructions)
- [Backend Design](#backend-design)
- [Frontend Design](#frontend-design)
- [Testing](#testing)
- [Docker Setup](#docker-setup)
- [Resources](#resources)

## Setup Instructions

### Prerequisites

Before setting up the project, ensure that you have the following installed:

- **Docker**: [Install Docker](https://docs.docker.com/get-docker/)
- **Node.js**: [Install Node.js](https://nodejs.org/)

### Backend & MongoDB Setup

1. **Clone the repository**:
   - Clone the project from GitHub:
   ```bash
   git clone https://github.com/afonseca00/tech2c-challenge.git
   ```
   
2. **Start the backend and MongoDB with Docker**:
   - Use Docker Compose to start both services:
   ```bash
   docker-compose up --build
   ```
   This will automatically set up the backend and MongoDB containers.

### Frontend Setup

1. Navigate to the frontend folder:
   ```bash
   cd frontend
   ```

2. Install the frontend dependencies:
   ```bash
   npm install
   ```

3. Start the frontend development server:
   ```bash
   npm run dev
   ```
   The frontend should be accessible at [http://localhost:5173](http://localhost:5173).

> ℹ️ If you encounter a "Permission denied" error when running `npm run dev` (especially on Mac or Linux), try running:

```bash
chmod +x node_modules/.bin/*
```

Then retry:
```bash
npm run dev
```

## Backend Design

- **API Endpoints**:
  - `/data/upload`: This endpoint accepts an Excel file, processes it, and stores the data in the MongoDB database.
  - `/data/read`: Fetches and returns the data stored in the database.
  - `/data/save`: Saves the data to MongoDB (not currently used but available for future extensions).

- **Data Flow**:
  1. User uploads an Excel file via the `/upload` endpoint.
  2. The file is read, and the necessary data is extracted.
  3. The backend filters and inserts valid data (ensuring required columns are present).
  4. The data is stored in MongoDB for further retrieval via the `/read` endpoint.

## Frontend Design

The frontend is built using **React.js** and provides the user interface for uploading the Excel file and viewing the data. It interacts with the backend API to display stored data and show error messages if the data is missing or invalid.

## Testing

Once the backend and frontend are running, the application can be tested by uploading a properly formatted Excel file containing the required columns.

### Example Data Format

| Empresa  | Ano | Setor      | Consumo de Energia (MWh) | Emissões de CO2 (toneladas) |
|----------|-----|------------|--------------------------|-----------------------------|
| Empresa A| 2023| Transporte | 1234.56                  | 567.89                      |
| Empresa B| 2023| Indústria  | 2345.67                  | 678.90                      |

## Docker Setup

The project uses **Docker** to containerize the backend and MongoDB. This ensures that the application runs consistently across all environments. The Docker setup includes:
- A backend container that runs the Express.js server.
- A MongoDB container that stores the data uploaded by users.

For those unfamiliar with Docker, install Docker and Docker Compose first. The project comes with a pre-configured `docker-compose.yml` file that sets up the environment automatically.

## Resources

- [Docker Documentation](https://docs.docker.com/)
- [Node.js Documentation](https://nodejs.org/en/docs/)
