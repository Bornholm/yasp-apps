FROM gliderlabs/alpine:3.3
MAINTAINER william.petit@ptitcloud.fr

MAINTAINER William Petit <wpetit@cadoles.com>

ENV PHPMYADMIN_VERSION 4.5.5.1
ENV BUILDPKG wget tar xz
ENV SYSPKG ca-certificates mariadb \
  php-fpm php-json php-zlib php-xml \
  php-pdo php-phar php-openssl \
  php-pdo_mysql php-mysqli php-gd \
  php-iconv php-mcrypt \
  bash nginx musl

RUN apk add $SYSPKG $BUILDPKG --no-cache

RUN wget https://files.phpmyadmin.net/phpMyAdmin/4.5.5.1/phpMyAdmin-${PHPMYADMIN_VERSION}-all-languages.tar.xz
RUN tar -xJf phpMyAdmin-${PHPMYADMIN_VERSION}-all-languages.tar.xz
RUN mkdir -p /var/www/phpmyadmin
RUN cp -R phpMyAdmin-${PHPMYADMIN_VERSION}-all-languages/* /var/www/phpmyadmin/

RUN apk del $BUILDPKG && rm -rf /var/cache/apk/*

# Yasp App manifest

LABEL io.yasp.app.enabled="1" \
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
