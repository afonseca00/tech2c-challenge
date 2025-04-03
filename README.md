
# Tech2C Junior Fullstack Challenge

This repository contains the backend and frontend logic for the Tech2C Junior FS Challenge. It processes Excel files containing data related to energy consumption and CO2 emissions, stores this data in MongoDB, and provides a web interface to interact with the data.

## Project Structure

The project is split into two main parts:

1. **Backend**: This part processes uploaded Excel files and stores the relevant data into a MongoDB database.
2. **Frontend**: A user interface to interact with the data stored in the backend.

### Technologies Used

- **Backend**:
  - Node.js
  - Express.js
  - MongoDB (Mongoose)
  - Multer (for file uploads)
  - xlsx (to read and process Excel files)

- **Frontend**:
  - React + TypeScript + Bootstrap + Recharts (frontend framework )
  - npm (Node package manager) for installing frontend dependencies

## How to Set Up the Project

Follow these steps to set up the project on your local machine. These instructions are for someone who has a fresh setup and needs to install everything from scratch.

### 1. Install Docker

If you don't have Docker installed on your machine, you need to download and install it. Docker is essential for running the backend and MongoDB.

- **For Windows**: [Install Docker for Windows](https://www.docker.com/products/docker-desktop)
- **For Mac**: [Install Docker for Mac](https://www.docker.com/products/docker-desktop)
- **For Linux**: [Install Docker for Linux](https://docs.docker.com/engine/install/)

Once Docker is installed, you can verify the installation by running this command in your terminal:

```bash
docker --version
```

### 2. Clone the Repository

First, clone this repository to your local machine.

```bash
git clone https://github.com/afonseca00/tech2c-challenge.git
cd tech2c-challenge
```

### 3. Set Up the Backend

#### Step 1: Start MongoDB and Backend with Docker

To run the backend and MongoDB, simply execute the following command in the project root directory. This will start both the backend and MongoDB containers:

```bash
docker-compose up --build
```

This command will build and run the backend, and MongoDB will be set up automatically.

- The backend will be running on `http://localhost:3000`
- MongoDB will be running in the background.

#### Step 2: Verify the Backend is Running

Once Docker finishes setting up, you should see logs indicating that the server is running and MongoDB is active. You can check the backend by navigating to:

```
http://localhost:3000
```

### 4. Set Up the Frontend

#### Step 1: Navigate to the Frontend Directory

Next, you need to install the frontend dependencies. Go to the frontend folder and run the installation command:

```bash
cd frontend
npm install
```

This will install all the necessary dependencies to run the frontend.

#### Step 2: Run the Frontend

Now that the dependencies are installed, you can run the frontend using:

```bash
npm run dev
```

This will start the frontend development server, and it will be accessible at:

```
http://localhost:5173
```

> ℹ️ If you encounter a "Permission denied" error when running `npm run dev` (especially on Mac or Linux), try running:

bash```
chmod +x node_modules/.bin/*
```

Then retry:
bash```
npm run dev
```

### 5. Using the Application

Once everything is running, open your web browser and go to:

```
http://localhost:5173
```

Here, you will see the user interface where you can upload Excel files containing energy consumption and CO2 emissions data.

### 6. API Endpoints

- **POST /data/upload**: Upload an Excel file containing the following columns: `Empresa`, `Ano`, `Setor`, `Consumo de Energia (MWh)`, `Emissões de CO2 (toneladas)`. The backend will process this file and store the data in MongoDB.
- **GET /data/read**: Retrieve the data stored in MongoDB.
- **POST /data/save**: This endpoint allows saving the data in MongoDB.

## Requirements

- **Node.js**: Version >= 18.x
- **MongoDB**: Automatically handled by Docker
- **Docker**: For backend and MongoDB setup

---

## Documentation

For more detailed documentation:
- [Documentation](./Documentation/Documentation.md)