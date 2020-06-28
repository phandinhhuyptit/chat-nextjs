deploy-server:
	docker build -t chatrealtimeimage .
	docker-compose up -d

deploy-staging-server:
	docker build -t chatrealtimeimage-dev .
	docker-compose -f docker-compose-dev.yml up -d