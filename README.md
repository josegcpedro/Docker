docker compose --profile prod up --build
docker compose --profile dev up --build
python3 -m http.server 8080

