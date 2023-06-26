# Project NestJS - API TodoList

## Installation and run

Create .env file via .env.example

and run

```bash
$ make dev
```

## Routes

Users :
- POST /users
- GET /users
- POST /users/admin
- GET /users/:id
- PATCH /users/:id
- DELETE /users/:id

Auth :
- POST /auth/login

Tasks :
- POST /tasks
- GET /tasks
- GET /tasks/:id
- PATCH /tasks/asign-user
- PATCH /tasks/:id
- PATCH /tasks/:id/change-status
- DELETE /tasks/:id
