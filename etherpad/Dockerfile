FROM debian:jessie
MAINTAINER william.petit@ptitcloud.fr

# Container installation

RUN apt-get update &&\
  apt-get install --no-install-recommends --yes ca-certificates curl

RUN curl --silent --location https://deb.nodesource.com/setup_4.x | /usr/bin/env bash -

RUN apt-get install --yes --no-install-recommends nodejs

# Get Etherpad-lite's other dependencies
RUN apt-get update
RUN apt-get install -y gzip git-core python libssl-dev pkg-config build-essential gettext-base

# Grab the latest Git version
RUN cd /opt && git clone git://github.com/ether/etherpad-lite.git etherpad

# Install node dependencies
RUN /opt/etherpad/bin/installDeps.sh

# Install process runner
RUN npm install pm2 -g

WORKDIR /opt/etherpad

# Add configuration template
ADD settings-template.json /opt/etherpad/settings-template.json

# Add startup script
ADD run.sh /opt/etherpad/
RUN chmod +x /opt/etherpad/run.sh

EXPOSE 9001
EXPOSE 8080

CMD "/opt/etherpad/run.sh"

# Yasp App manifest

LABEL io.yasp.app.enabled="1"
LABEL io.yasp.app.name="Etherpad"
LABEL io.yasp.app.description="A basic installation of Etherpad"

LABEL io.yasp.app.service.enabled="1"
LABEL io.yasp.app.service.webAdminPort="8080"

# Yasp variables

LABEL io.yasp.app.vars.title.label="Titre de l'instance Etherpad"
LABEL io.yasp.app.vars.title.description="Le titre affiché par votre instance Etherpad"
LABEL io.yasp.app.vars.title.type="text"
LABEL io.yasp.app.vars.title.defaultValue="Mon Etherpad"
LABEL io.yasp.app.vars.title.env="ETHERPAD_TITLE"

LABEL io.yasp.app.vars.welcome.label="Message d'accueil"
LABEL io.yasp.app.vars.welcome.type="text"
LABEL io.yasp.app.vars.welcome.defaultValue="Bienvenue sur l'instance Etherpad d'Yasp"
LABEL io.yasp.app.vars.welcome.env="ETHERPAD_WELCOME"

LABEL io.yasp.app.vars.admin.label="Nom du compte administrateur"
LABEL io.yasp.app.vars.admin.type="text"
LABEL io.yasp.app.vars.admin.defaultValue="admin"
LABEL io.yasp.app.vars.admin.env="ETHERPAD_ADMIN"

LABEL io.yasp.app.vars.admin_password.label="Mot de passe du compte administrateur"
LABEL io.yasp.app.vars.admin_password.type="text"
LABEL io.yasp.app.vars.admin_password.defaultValue="admin"
LABEL io.yasp.app.vars.admin_password.env="ETHERPAD_ADMIN_PASSWORD"
