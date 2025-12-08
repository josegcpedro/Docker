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
docker compose --profile dev up --build
```

- Accès API : [http://localhost:3000/todos](http://localhost:3000/todos)
- Accès MySQL : host `localhost`, port `3306`, user `root`, password `password`, base `todos`
- Les données de test sont automatiquement insérées.

#### Environnement de production

```sh
docker compose --profile prod up --build
```

- Accès API : [http://localhost:3000/todos](http://localhost:3000/todos)

- Accès MySQL : host `localhost`, port `3306`, user `root`, password `password`, base `todos`
```sh
docker exec -it docker-db-1 mysql -ppassword
```

- Pas de données de test (seulement la structure de la base).

### Accès au frontend

Ouvrir le fichier `frontend/index.html` dans votre navigateur ou lancer un serveur local :
```sh
python3 -m http.server 8080
```
Cette application est une Todo List : elle permet de gérer vos tâches quotidiennes facilement. Vous pouvez ajouter de nouvelles tâches, consulter la liste des tâches existantes, et organiser votre travail. L’interface est simple et accessible depuis un navigateur web, tandis que les données sont stockées de façon sécurisée dans une base MySQL.

Ce projet est conçu pour être utilisé même par des personnes n’ayant jamais programmé. Voici les étapes à suivre :
1. **Installer Docker et Docker Compose**
	- Rendez-vous sur https://docs.docker.com/get-docker/ et suivez les instructions pour votre système (Windows, Mac, Linux).
2. **Télécharger le projet**
	- Clonez le dépôt ou téléchargez les fichiers dans un dossier sur votre ordinateur.
3. **Ouvrir un terminal**
	- Naviguez dans le dossier du projet avec la commande `cd`.
4. **Lancer l’application**
	- Pour le développement :  
	  ```sh
	  docker compose --profile dev up --build
	  ```
	- Pour la production :  
	  ```sh
	  docker compose --profile prod up --build
	  ```
5. **Accéder à l’application**
	- Ouvrez le fichier `frontend/index.html` dans votre navigateur, ou lancez un serveur local :
	  ```sh
	  python3 -m http.server 8080
	  ```
    - Et dirigez-vous sur [http://localhost:8080/frontend](http://localhost:8080/frontend)
	- L’API est disponible sur [http://localhost:3000/todos](http://localhost:3000/todos)

1. **Accès à la base de données**  
L’application est composée de trois parties :
- **Frontend** : HTML et JavaScript, accessible via le navigateur, situé dans le dossier `frontend/`.
- **Backend** : Node.js avec Express.js, gère les requêtes API et la logique métier, situé dans le dossier `backend/`.
- **Base de données** : MySQL, stocke les tâches, initialisée via les fichiers SQL dans le dossier `db/`.

**Architecture Docker** :
- Un conteneur pour l’API (backend)
- Un conteneur pour la base de données (MySQL)
- Les profils `dev` et `prod` permettent de choisir entre une base avec des exemples ou une base vide.
- Les volumes Docker assurent la persistance des données en développement.
		 USE todos;
Deux environnements sont disponibles :

**Développement (dev)**
- Conteneur DB : `db`
- Données de test insérées automatiquement (`seed-dev.sql`)
- Volume Docker pour garder les données entre les redémarrages
- Accès complet à la base : user `root`, mot de passe `password`, base `todos`

**Production (prod)**
- Conteneur DB : `db-prod`
- Base initialisée sans données de test (`init.sql` uniquement)
- Pas de volume persistant
- Accès complet à la base : user `root`, mot de passe `password`, base `todos`

**Vérification**
1. Se connecter à MySQL :
	```sh
	docker exec -it docker-db-1 mysql -ppassword
	```

2. Vérifier la base :
	```sql
	USE todos;
	SELECT * FROM todos;
	```
	- En dev : des tâches de test sont présentes
	- En prod : la table est vide
3. Accès API :

	- [http://localhost:3000/todos](http://localhost:3000/todos)
	- En dev : retourne la liste de tâches de test
	- En prod : retourne une liste vide
4. Droits d’accès :
	- Utilisateur MySQL : `root`, mot de passe `password` (admin)
	- L’API ne nécessite pas d’authentification

