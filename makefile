.PHONY: start stop restart install dev build serve

start:
	docker compose up --detach

stop:
	docker compose down --remove-orphans --volumes --timeout 0

restart: stop start

install: start
	docker compose exec server npm install

dev: install
	docker compose exec server npm run start:dev

build: install
	docker compose exec server npm run build

serve: build
	docker compose exec server npm start

exec:
	docker compose exec server /bin/sh
