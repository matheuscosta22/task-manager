Task Manager:

To execute the projects it is only necessary (https://docs.docker.com/compose/install/):

- Docker,

- Docker compose,

To run the API, access the task-manager and use the command:
- To upload the project container
  ```sh
    docker compose up --build
  ```
- To bring down
  ```sh
    docker compose down
  ```
---

To run the frontend, access the task-manager-front directory and use the command:

- To upload the project containers
  ```sh
    docker compose up --build
  ```
- To bring down
  ```sh
    docker compose down
  ```
---

If everything is okay you can access the route http://localhost:3000 and you can see the login page, 
and make login with the email: admin@gmail.com, password: adminPassword
