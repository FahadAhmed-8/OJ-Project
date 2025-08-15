# MERN Stack Online Judge 🚀

[cite_start]A full-stack online judge application built with the MERN stack (MongoDB, Express.js, React, Node.js), inspired by platforms like LeetCode and Codeforces. [cite: 6, 8] [cite_start]This platform allows administrators to manage programming problems and enables users to submit and evaluate their code against hidden test cases in a secure, containerized environment. [cite: 4]

## ✨ Key Features

- [cite_start]**User Authentication:** Secure user registration and login using JWT and password hashing. [cite: 12]
- **Role-Based Access Control:** Distinct roles for 'user' and 'admin' with separate permissions and navigation flows.
- **Admin Dashboard:** A protected, admin-only dashboard for full CRUD (Create, Read, Update, Delete) management of programming problems.
- [cite_start]**Interactive Problem List:** A public-facing list of all problems, complete with client-side searching and filtering by difficulty. [cite: 19, 90]
- [cite_start]**Detailed Problem View:** A clean, responsive, two-column layout for viewing problem descriptions and submitting solutions. [cite: 93]
- [cite_start]**Multi-Language Code Submission:** Users can submit solutions in multiple languages (currently C++ and Python) via a professional-grade Monaco code editor. [cite: 13, 14, 83]
- [cite_start]**Secure Code Evaluation:** User-submitted code is evaluated in a secure, sandboxed environment using **Docker** to prevent malicious code execution. [cite: 52, 109, 110] [cite_start]This system sets resource limits and runs code against multiple, hidden test cases to determine a verdict. [cite: 21]
- [cite_start]**Real-time Verdicts:** Instant user feedback on submissions ("Accepted," "Wrong Answer," "Compilation Error," etc.) delivered via toast notifications. [cite: 86, 105]
- **Responsive Dark Theme:** A polished, LeetCode-inspired dark theme that is fully responsive and works on all device sizes.

## 🛠️ Tech Stack

- **Frontend:** React, Vite, Tailwind CSS, React Router
- **Backend:** Node.js, Express.js
- **Database:** MongoDB with Mongoose
- **Authentication:** JSON Web Tokens (JWT), bcryptjs
- **Code Evaluation:** Docker
- **Containerization:** Docker Compose

## 📁 Project Structure

The project is structured as a monorepo with three main top-level directories:

-   **/client**: Contains the entire React frontend application.
-   **/server**: Contains the Express.js backend API, database models, and routes.
-   **/compiler**: Contains the Dockerfiles and logic for the sandboxed code execution environments.

## 🚀 Getting Started

There are two ways to get the project running locally:

### Using Docker (Recommended)
This is the easiest method and ensures a consistent environment.

**Prerequisites:**
- [Docker Desktop](https://www.docker.com/products/docker-desktop/) installed and running.

**Instructions:**
1.  Clone the repository.
2.  In the `server/` directory, create a `.env` file and add your `JWT_SECRET`. The `MONGO_URI` will be handled by Docker Compose automatically.
    ```env
    MONGO_URI=mongodb://mongo:27017/online-judge-db
    JWT_SECRET=your_super_secret_key
    ```
3.  From the project's root directory, run the following command:
    ```bash
    docker-compose up --build
    ```
4.  The application will be available at `http://localhost:5173`.

### Manual Setup
**Prerequisites:**
- Node.js (v16 recommended)
- MongoDB (local instance or an Atlas connection string)
- Docker Desktop (for the code evaluation engine)
- C++ (`g++`) and Python compilers accessible in your system's PATH.

**Instructions:**
1.  **Backend:**
    ```bash
    cd server
    # Create a .env file with your MONGO_URI and JWT_SECRET
    npm install
    npm run dev
    ```
2.  **Frontend (in a separate terminal):**
    ```bash
    cd client
    npm install
    npm run dev
    ```

## 🔮 Future Improvements

Based on the initial project plan, future enhancements could include:

-   [cite_start]**Submission History:** An expanded user profile to show a history of all past submissions. [cite: 15, 16]
-   [cite_start]**Leaderboard:** A public leaderboard to rank users based on their scores or problems solved. [cite: 17, 106]
-   [cite_start]**Asynchronous Judging:** Implement a message queue to handle a high volume of submissions asynchronously. [cite: 50]
-   **Deployment:** Containerize the application for production and deploy it to a cloud service.