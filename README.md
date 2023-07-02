# Project NestJS - API TodoList

## Installation and run

Create .env file via .env.example

and run

```bash
$ make dev
```

## Swagger : 
```
http://localhost:3000/api
```
- Insérer uniquement le token après l'avoir récuperer du login. Ie '`<token>`' et non 'Bearer `<token>`'.

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
