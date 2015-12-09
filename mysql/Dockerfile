FROM corbinu/docker-phpmyadmin

MAINTAINER William Petit <wpetit@cadoles.com>

RUN apt-get update &&\
  apt-get install -y --no-install-recommends mariadb-server mariadb-client

RUN sed -i 's/listen 80;/listen unix:\/var\/run\/yasp\/admin.sock;/' /etc/nginx/sites-enabled/site

ENV MYSQL_PORT_3306_TCP_ADDR 127.0.0.1
ENV MYSQL_PORT_3306_TCP_PORT 3306

ADD run.sh /usr/local/bin/run-app
RUN chmod +x /usr/local/bin/run-app

CMD /usr/local/bin/run-app

# Yasp App manifest

LABEL io.yasp.app.enabled="1" \
  io.yasp.app.uid="io.yasp.apps.mysql" \
  io.yasp.app.name="MySQL" \
  io.yasp.app.description="A basic installation of MySQL with PHPMyAdmin" \
  io.yasp.app.service.enabled="1" \
  \
  io.yasp.app.vars.loginAdmin.label="Login administrateur BDD"\
  io.yasp.app.vars.loginAdmin.type="text"\
  io.yasp.app.vars.loginAdmin.defaultValue="admin"\
  io.yasp.app.vars.loginAdmin.env="MYSQL_USERNAME"\
  \
  io.yasp.app.vars.passwdAdmin.label="Mot de passe administrateur BDD"\
  io.yasp.app.vars.passwdAdmin.type="text"\
  io.yasp.app.vars.passwdAdmin.defaultValue="admin"\
  io.yasp.app.vars.passwdAdmin.env="MYSQL_PASSWORD"\
  \
  io.yasp.app.vars.loginPMA.label="Login du compte BDD de l'utilisateur PHPMyAdmin"\
  io.yasp.app.vars.loginPMA.type="text"\
  io.yasp.app.vars.loginPMA.defaultValue="phpmyadmin"\
  io.yasp.app.vars.loginPMA.env="PMA_USERNAME"\
  \
  io.yasp.app.vars.passwdPMA.label="Mot de passe du compte BDD de l'utilisateur PHPMyAdmin"\
  io.yasp.app.vars.passwdPMA.type="text"\
  io.yasp.app.vars.passwdPMA.defaultValue="phpmyadmin"\
  io.yasp.app.vars.passwdPMA.env="PMA_PASSWORD"
