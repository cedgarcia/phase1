.PHONY: up down build logs ps clean

## Start all services (build if needed)
up:
	docker compose up --build -d

## Stop all services
down:
	docker compose down

## Rebuild images from scratch
build:
	docker compose build --no-cache

## Follow logs (all services)
logs:
	docker compose logs -f

## Follow API logs only
logs-api:
	docker compose logs -f api

## Show running containers
ps:
	docker compose ps

## Remove containers + volumes (wipes DB data!)
clean:
	docker compose down -v

## Open a psql shell inside the db container
db-shell:
	docker compose exec db psql -U postgres -d taskdb

## Hit the health endpoint
health:
	curl -s http://localhost:4000/health | python3 -m json.tool
