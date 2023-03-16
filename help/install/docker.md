Docker {: .tag-core .tag-ee }
====

This is a **complete** Docker setup example for Grist.

The following `docker-compose.yml` files are needed.

Make sure, you adjust the environment variables to your needs.

### NGINX Reverse Proxy with automatic HTTPS

For automatic HTTPS to work, you first need to setup proper DNS entries for the server you are running this reverse proxy on.

This NGINX is separate from Grist, so you can have more than one backend, NGINX may route to.
It pretty much acts, like a normal NGINX on the host, except much better.

```docker
version: "3.9"
services:
  letsencrypt:
    image: lscr.io/linuxserver/swag # NGINX with automatic HTTPS
    container_name: nginx-letsencrypt-master
    network_mode: "host"
    environment:
      - PUID=1001 # Optional Change
      - PGID=1001 # Optional Change
      - TZ=Europe/London # Change!
      - URL=mydomain.eu # Change here & in .env files!
      - SUBDOMAINS=grist,webhook.grist # Change here & in .env files!
      - VALIDATION=http
      - EMAIL=admin@mydomain.eu # Change!
      - ONLY_SUBDOMAINS=true
      - STAGING=false # Enable if testing!
    volumes:
      - ./config:/config
    restart: unless-stopped
```

### Grist
```docker
# https://github.com/gristlabs/grist-core#using-grist

version: "3.9"

services:
  grist:
    image: gristlabs/grist:1.0.8 # Change! --> https://hub.docker.com/r/gristlabs/grist/tags
    container_name: grist
    user: "1001" # Optional Change
    env_file:
      - ./grist.env
    volumes:
      - ./data:/persist
    ports:
      - 127.0.0.1:3000:443
    depends_on:
      - database

  database:
    image: postgres:15-alpine
    container_name: grist_db
    user: "1001" # Optional Change
    env_file:
      - ./grist_db.env
    volumes:
      - ./database/data:/var/lib/postgresql/data
```

### Environment

The following `.env` files must be located in the same folder, as the Grist `docker-compose.yml`.

### `grist.env`
```
# https://github.com/gristlabs/grist-core#environment-variables

PORT=443
APP_HOME_URL=https://grist.mydomain.eu
GRIST_ALLOWED_HOSTS=grist,webhook.grist
GRIST_DOMAIN=grist.mydomain.eu
GRIST_SINGLE_ORG=myorg
GRIST_HIDE_UI_ELEMENTS=billing
GRIST_LIST_PUBLIC_SITES=false
GRIST_MAX_UPLOAD_ATTACHMENT_MB=10
GRIST_MAX_UPLOAD_IMPORT_MB=300
GRIST_ORG_IN_PATH=false
GRIST_PAGE_TITLE_SUFFIX=_blank
GRIST_FORCE_LOGIN=true
GRIST_SUPPORT_ANON=false
GRIST_THROTTLE_CPU=true
HOME_PORT=share

GRIST_SANDBOX_FLAVOR=gvisor
PYTHON_VERSION=3
PYTHON_VERSION_ON_CREATION=3

# Database
TYPEORM_DATABASE=grist
TYPEORM_USERNAME=grist
TYPEORM_HOST=grist_db
TYPEORM_LOGGING=false
TYPEORM_PASSWORD=mysupersecretpassword CHANGE THIS!!!!
TYPEORM_PORT=5432
TYPEORM_TYPE=postgres
```

### `grist_db.env`
```
# https://hub.docker.com/_/postgres

POSTGRES_DB=grist
POSTGRES_USER=grist
POSTGRES_PASSWORD=mysupersecretpassword CHANGE THIS!!!!
```

###### This Example is originally authored by [Akito](https://github.com/theAkito).