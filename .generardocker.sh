#!/bin/bash
# FUNCIONA DIOS SANTO

ARGM=$1

case $ARGM in
  UPS)
    docker-compose -f .docker/docker-compose_dev.yml --project-directory . stop -t 0;
    docker-compose -f .docker/docker-compose_dev.yml --project-directory . rm -s -f -v; 
    docker image prune -f;
    docker container prune -f;
    docker-compose -f .docker/docker-compose_dev.yml --project-directory . up --build --force-recreate --remove-orphans;
    docker image prune -f;
    ;;
  UPD)
    docker-compose -f .docker/docker-compose_dev.yml --project-directory . stop -t 0;
    docker-compose -f .docker/docker-compose_dev.yml --project-directory . rm -s -f -v; 
    docker image prune -f;
    docker container prune -f;
    docker-compose -f .docker/docker-compose_dev.yml --project-directory . up -d --build --force-recreate --remove-orphans;
    docker image prune -f;
    ;;
  BUILD)
    docker-compose -f .docker/docker-compose_dev.yml --project-directory . stop -t 0;
    docker-compose -f .docker/docker-compose_dev.yml --project-directory . rm -s -f -v; 
    docker image prune -f;
    docker container prune -f;
    docker-compose -f .docker/docker-compose_dev.yml --project-directory . build --compress --force-rm --pull;   
    docker image prune -f;
    ;;
  DEBUG)
    docker-compose -f .docker/docker-compose_dev.yml --project-directory . stop -t 0;
    docker-compose -f .docker/docker-compose_dev.yml --project-directory . rm -s -f -v; 
    docker image prune -f;
    docker container prune -f;
    docker-compose -f .docker/docker-compose_dev.yml --project-directory . DEBUG --compress --force-rm --pull;   
    docker image prune -f;
    ;;
  *)
    echo -n "PAILA";
    ;;
esac

docker ps -sa;
docker container ps -sa;
ls -lathris;
