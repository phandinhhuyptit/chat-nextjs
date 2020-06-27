deploy-server:
	docker build -t wevaweb20image .
	docker-compose up -d

deploy-staging-server:
	docker build -t wevaweb20image-dev .
	docker-compose -f docker-compose-dev.yml up -d