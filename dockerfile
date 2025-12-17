FROM node:20

# Backend
WORKDIR /app/backend
COPY backend/package*.json ./
RUN npm install
COPY backend .

# Frontend statique
COPY frontend /app/frontend

# Port du backend
EXPOSE 3000

# Démarrage du serveur
CMD ["node", "index.js"]
