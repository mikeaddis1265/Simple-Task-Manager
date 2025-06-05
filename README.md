# Task Manager Backend API

A simple REST API for managing tasks.

## Features
- **GET /api/tasks**: Retrieve all tasks.
- **POST /api/tasks**: Add a new task (requires `{ "title": "task title" }` in the request body).
- **PUT /api/tasks/:id**: Mark a task as completed.
- **DELETE /api/tasks/:id**: Delete a task.
- Input validation: Task title must not be empty.
- Data persistence: Tasks are stored in a `tasks.json` file for persistence between server restarts.
- Simple UI: A styled "API is running" page is served at the root URL (`/`).

## Tech Stack
- **Node.js**: JavaScript runtime for the server.
- **Express.js**: Web framework for building the REST API.
- **Tailwind CSS**: Used for styling the "API is running" page.
- **JSON**: File-based storage for tasks (`tasks.json`).

## Setup Instructions
1. Clone the repository:
   ```bash
   git repo
   cd Simple-Task-Manager
