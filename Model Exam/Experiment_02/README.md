# Experiment 02 – Containerize a Node.js Express Notes Application

## API
- `GET /health` – health check
- `GET /notes` – list notes
- `POST /notes` – add note (`{"text":"..."}`)
- `DELETE /notes/:id` – delete note

## Run locally
```bash
cd Source_Code
npm install
npm test
npm start
```
Open `http://localhost:3000`.

## Docker
```bash
docker build -t notes-express:1.0 .
docker run --name notes-app -p 3000:3000 notes-express:1.0
```
Test with:
```bash
curl http://localhost:3000/health
curl -X POST http://localhost:3000/notes -H "Content-Type: application/json" -d '{"text":"Prepare lab record"}'
curl http://localhost:3000/notes
curl -X DELETE http://localhost:3000/notes/1
```

## Docker Hub
```bash
docker login
docker tag notes-express:1.0 YOUR_DOCKERHUB_USERNAME/notes-express:1.0
docker push YOUR_DOCKERHUB_USERNAME/notes-express:1.0
```
Replace the placeholder with your username. Never share passwords or tokens.

## Data behaviour
Notes are in process memory and disappear when the container is removed. A database or persistent volume is needed for durable notes.

## Evidence limitation
The Node built-in tests and JavaScript syntax check were run here. Docker is not installed in this environment and npm registry access was unavailable, so the Express runtime and Docker image were not launched here. Run the commands above locally to capture your own Docker screenshots and publish the image.
