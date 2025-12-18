<img src="./logo-todolist.svg" alt="Logo" style="width:100vw; height:auto;">

# Todo List JS – Documentation

## Fonctionnalités de l’application

- **Frontend** : Application web simple permettant d’ajouter et de visualiser des tâches (todos).
- **Backend** : API REST Express.js pour gérer les tâches (GET/POST).
- **Base de données** : MySQL pour stocker les tâches.

## Instructions d’installation & exécution

### Prérequis

- Docker & Docker Compose installés sur votre machine.

### Démarrage

#### Environnement de développement

```sh
docker compose -f docker-compose-dev.yml up -d
```
- Accès Front : [http://localhost:8080](http://localhost:8080)

- Accès API : [http://localhost:3000/todos](http://localhost:3000/todos)
##### Accès MySQL : 
```sh
docker exec -it laborendufinal-db-1 mysql -u root -p
```
- Le mot de pass est "password"

#### Environnement de production

```sh
docker compose -f docker-compose-prod.yml up -d
```
- Accès Front : [http://localhost:8080](http://localhost:8080)
- Accès API : [http://localhost:3000/todos](http://localhost:3000/todos)

##### Accès MySQL : 
```sh
docker exec -it laborendufinal-db-1 mysql -u root -p
```
- Le mot de pass est "password"

- Pas de données de test (seulement la structure de la base).


**Architecture Docker** :
- Un conteneur pour l’API (app-1)
- Un conteneur pour la base de données (db-1)
- Un conteneur pour le front (forntend-1)

**Développement (dev)**
- Conteneur DB : `db`
- Données de test insérées automatiquement (`seed-dev.sql`)
- Accès complet à la base : user `root`, mot de passe `password`, base `todos`
- Pas de message de log etc...

**Production (prod)**
- Conteneur DB : `db-prod`
- Base initialisée sans données de test (`init.sql` uniquement)
- Pas de volume persistant
- Accès complet à la base : user `root`, mot de passe `password`, base `todos`
- Message à chaque activité sur le projet (regarder le terminal)


# Documentation pour dockerhub


-Ensuite créer un docker-compose.yml
#### Si c'est pour l'environnement de dev ajouter:

```sh
version: "3.8"

services:
  app:
    image: pedrowww777/app:dev
    ports:
      - "3000:3000"
    environment:
      DB_HOST: db
      LOG_LEVEL: warn
      DEBUG: "false"
    depends_on:
      - db

  frontend:
    image: pedrowww777/frontend:dev
    ports:
      - "8080:80"

  db:
    image: pedrowww777/mysql:dev
    environment:
      MYSQL_ROOT_PASSWORD: password
      MYSQL_DATABASE: todos
    ports:
      - "3306:3306"
    volumes:
      - dev-db-data:/var/lib/mysql

volumes:
  dev-db-data:
```

- et faire la commande suivante :

```sh 
docker compose -f docker-compose.yml up -d
```


#### Si c'est pour l'environnement de prod ajouter:

```sh
version: "3.8"

services:
  app:
    image: pedrowww777/app:prod
    ports:
      - "3000:3000"
    environment:
      DB_HOST: db
      LOG_LEVEL: warn
      DEBUG: "false"
    depends_on:
      - db

  frontend:
    image: pedrowww777/frontend:prod
    ports:
      - "8080:80"

  db:
    image: pedrowww777/mysql:prod
    environment:
      MYSQL_ROOT_PASSWORD: password
      MYSQL_DATABASE: todos
    ports:
      - "3306:3306"
    volumes:
      - prod-db-data:/var/lib/mysql

volumes:
  prod-db-data:
```

- et faire la commande suivante :

```sh 
docker compose -f docker-compose.yml up -d
```


#### Ensuite lire la documentation en haut pour le reste 

