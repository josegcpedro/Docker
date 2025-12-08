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

## Architecture générale

### Technologies utilisées

- **Frontend** : HTML, JavaScript (aucun framework)
- **Backend** : Node.js, Express.js, MySQL2
- **Base de données** : MySQL 8

### Architecture Docker

- **api-dev** : Conteneur Node.js pour l’API Express (profil `dev`)
- **api-prod** : Conteneur Node.js pour l’API Express (profil `prod`)
- **db** : Conteneur MySQL avec données de test (profil `dev`)
- **db-prod** : Conteneur MySQL sans données de test (profil `prod`)
- **Volumes** : `dev-db-data` pour persistance des données en dev

## Environnements et différences

| Environnement | Conteneur DB      | Seed de données | Host DB      | Vérification accès DB         |
|---------------|-------------------|----------------|--------------|------------------------------|
| dev           | db                | Oui            | db           | user: root, pwd: password    |
| prod          | db-prod           | Non            | db-prod      | user: root, pwd: password    |

- **dev** : la base est initialisée avec des exemples (`seed-dev.sql`), volume persistant.
- **prod** : seule la structure est créée (`init.sql`), pas de seed, pas de volume persistant.

### Comment vérifier les environnements

1. **Accès à la base de données**  
	 Utiliser un client MySQL :  
	 ```sh
	 mysql -h 127.0.0.1 -P 3306 -u root -p
	 ```
	 Mot de passe : `password`
   
	 Vérifier la présence des données :  
	 - En dev :  
		 ```sql
		 USE todos;
		 SELECT * FROM todos;
		 ```
		 → Devrait afficher les tâches de test.
	 - En prod :  
		 ```sql
		 USE todos;
		 SELECT * FROM todos;
		 ```
		 → Devrait être vide.

2. **Accès API**  
	 Tester avec :  
	 ```sh
	 curl http://localhost:3000/todos
	 ```
	 Ajouter une tâche :  
	 ```sh
	 curl -X POST -H "Content-Type: application/json" -d '{"text":"Nouvelle tâche"}' http://localhost:3000/todos
	 ```

## Accès administrateur

- **MySQL** : accès complet avec `root`/`password` dans les deux environnements.
- **API** : pas d’authentification, accès libre pour les tests.

### fonctionnalités de l’app
### instructions d’installation & exécution
### architecture générale de l’application: technologies (front, back, BD), architecture Docker (quoi dans quel conteneur)…
### Indication de 2 environnements choisis et les caractéristiques les différentiant + comment les vérifier (attention à donner tous les droits d’accès nécessaires aux vérifications : user/pwd BD, compte admin, etc)

