# Task Manager — Docker → Kubernetes Learning Project

A full-stack task manager built to learn containerisation step by step.

## Stack

| Layer    | Tech                    |
|----------|-------------------------|
| Frontend | React 18 + nginx        |
| API      | Node.js + Express       |
| Database | PostgreSQL 16           |
| Runtime  | Docker Compose → K8s    |

## Project Structure

```
task-manager/
├── api/
│   ├── src/index.js        ← Express REST API
│   ├── Dockerfile
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── App.js          ← Kanban dashboard
│   │   ├── api.js          ← All fetch calls in one place
│   │   └── components/
│   │       ├── TaskCard.js
│   │       └── AddTaskForm.js
│   ├── nginx.conf          ← Proxies /api/* → api container
│   └── Dockerfile          ← Multi-stage build
├── postgres/
│   └── init.sql            ← Auto-runs on first start
├── docker-compose.yml      ← Wires everything together
└── Makefile                ← Handy shortcuts
```

## Running Locally (Phase 1 — Docker)

```bash
# Build and start all 3 containers
make up

# Check everything is running
make ps

# Open in browser
open http://localhost:3000

# Stream logs
make logs

# Stop
make down
```

## API Endpoints

| Method | Path           | Description        |
|--------|----------------|--------------------|
| GET    | /api/tasks     | List all tasks     |
| POST   | /api/tasks     | Create a task      |
| PATCH  | /api/tasks/:id | Update task status |
| DELETE | /api/tasks/:id | Delete a task      |
| GET    | /health        | Health check       |

## How Containers Talk

```
Browser → localhost:3000 → [nginx container]
                               ↓ proxies /api/*
                           [api container :4000]
                               ↓ pg driver
                           [db container :5432]
```

Docker Compose puts all services in the same network.
Service names (db, api, frontend) resolve as hostnames inside that network.

## Phase 2 — Kubernetes (next steps)

Each service becomes:
- A `Deployment` (manages pods/replicas)
- A `Service` (internal DNS + load balancing)
- An `Ingress` (external traffic routing)

The env vars in docker-compose.yml map directly to K8s `ConfigMap` + `Secret`.
The named volume `db_data` becomes a `PersistentVolumeClaim`.
