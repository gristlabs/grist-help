Exemple d'utilisation de Docker et NGINX {: .tag-core .tag-ee }
====

###### Cet exemple a été initialement rédigé par [Akito](https://github.com/theAkito).

Ceci est un exemple **complet** de configuration Docker pour Grist.

Les fichiers `docker-compose.yml` suivants sont nécessaires.

Vous devrez ajuster les variables d'environnement selon vos besoins.

### Exigences

Vous devez avoir la distribution Docker la plus récente, y compris l'extension `docker compose` installée.

Pour préparer l'environnement hôte, créez un répertoire vide et, à l'intérieur, exécutez :

```bash
sudo -u "$(id -un 1000):$(id -un 1000)" mkdir -p ./config/nginx/site-confs ./data ./database/data
```

### Proxy inverse NGINX avec HTTPS automatique

Pour que le HTTPS automatique fonctionne, vous devez d'abord configurer des entrées DNS appropriées pour le serveur sur lequel vous exécutez ce proxy inverse.

Ce proxy inverse est découplé de Grist, dans un `docker-compose.yml` séparé, vous pouvez donc fournir commodément des backends supplémentaires vers lesquels il peut router le trafic - par exemple, Authelia pour l'authentification.
Cette configuration utilise SWAG, une image Docker qui regroupe le proxy inverse NGINX avec des services utiles, y compris la génération et le renouvellement de certificats TLS.

Voici le fichier `docker-compose.yml` gérant l'instance NGINX.
```docker
version: "3.9"
services:
  letsencrypt:
    image: lscr.io/linuxserver/swag # NGINX avec HTTPS automatique
    container_name: nginx-letsencrypt-master
    network_mode: "host"
    environment:
      - PUID=1000 # Changement optionnel
      - PGID=1000 # Changement optionnel
      - TZ=Europe/London # Changez ici !
      - URL=mydomain.eu # Changez ici, dans ./config/nginx/site-confs/grist.conf et dans les fichiers .env !
      - SUBDOMAINS=grist,webhook.grist # Changez ici, dans ./config/nginx/site-confs/grist.conf et dans les fichiers .env !
      - VALIDATION=http
      - EMAIL=admin@mydomain.eu # Changez ici !
      - ONLY_SUBDOMAINS=true
      - STAGING=false # Activez si vous testez !
    volumes:
      - ./config:/config
    restart: unless-stopped
```

#### Configuration NGINX

La configuration suivante doit être placée dans `./config/nginx/site-confs/grist.conf`, pour que l'instance NGINX route correctement vers Grist.
```nginx
server {
    listen 443 ssl http2;
    listen [::]:443 ssl http2;

    # Ajustez selon vos besoins !
    server_name grist.mydomain.eu webhook.grist.mydomain.eu;

    # activez les confs de proxy inverse en sous-dossier
    include /config/nginx/proxy-confs/*.subfolder.conf;

    # activez pour l'authentification LDAP (nécessite ldap-location.conf dans le bloc location)
    #include /config/nginx/ldap-server.conf;

    # activez pour Authelia (nécessite authelia-location.conf dans le bloc location)
    #include /config/nginx/authelia-server.conf;

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
    }
}
```

### Grist

Voici le `docker-compose.yml` pour le backend Grist.
Il contient le déploiement de l'application Grist, qui est accompagnée d'une base de données PostgreSQL.

```docker
# https://github.com/gristlabs/grist-core#using-grist

version: "3.9"

services:
  grist:
    image: gristlabs/grist:1.0.8 # Changez ici ! --> https://hub.docker.com/r/gristlabs/grist/tags
    container_name: grist
    user: "1000" # Changement optionnel
    env_file:
      - ./grist.env
    volumes:
      - ./data:/persist
    ports:
      - 127.0.0.1:3000:8080
    depends_on:
      - database

  database:
    image: postgres:15-alpine
    container_name: grist_db
    user: "1000" # Changement optionnel
    env_file:
      - ./grist_db.env
    volumes:
      - ./database/data:/var/lib/postgresql/data
```

### Environnement

Les fichiers `.env` suivants doivent être situés dans le même dossier que le `docker-compose.yml` de Grist.

### `grist.env`
```
# https://github.com/gristlabs/grist-core#environment-variables

PORT=8080
APP_HOME_URL=https://grist.mydomain.eu
GRIST_ALLOWED_HOSTS=webhook.grist.mydomain.eu # Remplacez par les domaines cibles du webhook
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

GRIST_SANDBOX_FLAVOR=gvisor
PYTHON_VERSION=3
PYTHON_VERSION_ON_CREATION=3

# Base de données
TYPEORM_DATABASE=grist
TYPEORM_USERNAME=grist
TYPEORM_HOST=grist_db
TYPEORM_LOGGING=false
TYPEORM_PASSWORD=mysupersecretpassword CHANGEZ ICI!!!!
TYPEORM_PORT=5432
TYPEORM_TYPE=postgres
```

### `grist_db.env`
```
# https://hub.docker.com/_/postgres

POSTGRES_DB=grist
POSTGRES_USER=grist
POSTGRES_PASSWORD=mysupersecretpassword CHANGEZ ICI!!!!
```