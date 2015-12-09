FROM debian:jessie
MAINTAINER william.petit@ptitcloud.fr

# Container installation

RUN DEBIAN_FRONTEND=noninteractive apt-get update &&\
  apt-get install --no-install-recommends --yes ca-certificates curl

RUN curl --silent --location https://deb.nodesource.com/setup_4.x | /usr/bin/env bash -

RUN DEBIAN_FRONTEND=noninteractive apt-get install --yes --no-install-recommends nodejs

# Get Etherpad-lite's other dependencies
RUN DEBIAN_FRONTEND=noninteractive apt-get update && \
  apt-get install -y gzip git-core python libssl-dev pkg-config build-essential gettext-base

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

CMD "/opt/etherpad/run.sh"

# Yasp App manifest

LABEL io.yasp.app.enabled="1" \
  io.yasp.app.name="Etherpad"\
  io.yasp.app.description="A basic installation of Etherpad"\
  \
  io.yasp.app.service.enabled="1"\
  \
  io.yasp.app.vars.title.label="Titre de l'instance Etherpad"\
  io.yasp.app.vars.title.description="Le titre affiché par votre instance Etherpad"\
  io.yasp.app.vars.title.type="text"\
  io.yasp.app.vars.title.defaultValue="Mon Etherpad"\
  io.yasp.app.vars.title.env="ETHERPAD_TITLE"\
  \
  io.yasp.app.vars.welcome.label="Message d'accueil"\
  io.yasp.app.vars.welcome.type="text"\
  io.yasp.app.vars.welcome.defaultValue="Bienvenue sur l'instance Etherpad d'Yasp"\
  io.yasp.app.vars.welcome.env="ETHERPAD_WELCOME"\
  \
  io.yasp.app.vars.admin.label="Nom du compte administrateur"\
  io.yasp.app.vars.admin.type="text"\
  io.yasp.app.vars.admin.defaultValue="admin"\
  io.yasp.app.vars.admin.env="ETHERPAD_ADMIN"\
  \
  io.yasp.app.vars.admin_password.label="Mot de passe du compte administrateur"\
  io.yasp.app.vars.admin_password.type="text"\
  io.yasp.app.vars.admin_password.defaultValue="admin"\
  io.yasp.app.vars.admin_password.env="ETHERPAD_ADMIN_PASSWORD"
