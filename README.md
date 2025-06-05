# Task Manager Backend API

A simple REST API for managing tasks, built for the Internship Entrance Challenge.

## Features
- **GET /api/tasks**: Retrieve all tasks.
- **POST /api/tasks**: Add a new task (requires `{ "title": "task title" }` in the body).
- **PUT /api/tasks/:id**: Mark a task as completed.
- **DELETE /api/tasks/:id**: Delete a task.
- Input validation: Task title must not be empty.
- Data persistence using a JSON file (`tasks.json`).

## Tech Stack
- Node.js
- Express.js
- Tailwind CSS (for the "API is running" page)

## Setup Instructions
1. Clone the repository:
   ```bash
   git clone <your-repo-url>
   cd backend