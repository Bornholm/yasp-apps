FROM gliderlabs/alpine:3.3
MAINTAINER william.petit@ptitcloud.fr

MAINTAINER William Petit <wpetit@cadoles.com>

ENV PHPMYADMIN_VERSION 4.5.5.1
ENV BUILDPKG wget tar xz sed
ENV SYSPKG ca-certificates \
  mysql mysql-client php-mysql php-mysqli \
  php-pdo php-pdo_pgsql php-soap php-xmlrpc php-posix php-mcrypt php-gettext php-ldap php-ctype php-dom \
  lighttpd php-common php-iconv php-json php-gd php-curl php-xml php-pgsql php-imap php-cgi fcgi

RUN apk add $SYSPKG $BUILDPKG --no-cache

RUN mkdir -p /usr/share/webapps
RUN cd /usr/share/webapps && wget http://files.phpmyadmin.net/phpMyAdmin/${PHPMYADMIN_VERSION}/phpMyAdmin-${PHPMYADMIN_VERSION}-all-languages.tar.xz
RUN cd /usr/share/webapps && tar -xJf phpMyAdmin-${PHPMYADMIN_VERSION}-all-languages.tar.xz
RUN cd /usr/share/webapps && mv phpMyAdmin-${PHPMYADMIN_VERSION}-all-languages phpmyadmin
RUN cd /usr/share/webapps && chmod -R 777 /usr/share/webapps/
RUN cd /usr/share/webapps && rm phpMyAdmin-${PHPMYADMIN_VERSION}-all-languages.tar.xz
RUN ln -s /usr/share/webapps/phpmyadmin/ /var/www/localhost/htdocs/phpmyadmin

RUN apk del $BUILDPKG && rm -rf /var/cache/apk/*

RUN mkdir -p /app
WORKDIR /app

ADD lighttpd-phpmyadmin.conf /etc/lighttpd/phpmyadmin.conf
# Active mod_fastcgi
RUN sed -i '/^#.*include.*"mod_fastcgi.conf"/s/^#//' /etc/lighttpd/lighttpd.conf
RUN echo 'include "phpmyadmin.conf"' >> /etc/lighttpd/lighttpd.conf

# Configure PHPMyAdmin
ADD phpmyadmin.config.inc.php /usr/share/webapps/phpmyadmin/config.inc.php

ADD start-mysqld.sh start-mysqld.sh
RUN chmod +x start-mysqld.sh

ADD start-lighttpd.sh start-lighttpd.sh
RUN chmod +x start-lighttpd.sh

ADD run.sh run.sh
RUN chmod +x run.sh

VOLUME /var/lib/mysql
EXPOSE 3306

CMD ./run.sh

# Yasp App manifest

LABEL io.yasp.app.enabled="1" \
  io.yasp.app.name="MySQL" \
  io.yasp.app.description="Une instance de MySQL avec interface d'administration PHPMyAdmin préconfigurée" \
  io.yasp.app.service.enabled="1" \
  \
  io.yasp.app.vars.passwdAdmin.label="Mot de passe du compte 'root' MySQL"\
  io.yasp.app.vars.passwdAdmin.type="text"\
  io.yasp.app.vars.passwdAdmin.defaultValue="admin"\
  io.yasp.app.vars.passwdAdmin.env="MYSQL_ROOT_PASSWORD"
