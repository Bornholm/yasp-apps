# Base image
FROM gliderlabs/alpine:3.3
MAINTAINER Philippe Caseiro <pcaseiro@cadoles.com>

# Yasp things

LABEL io.yasp.app.enabled="1"
LABEL io.yasp.app.name="Hastebin"
LABEL io.yasp.app.description="A simple online paste and share system"

LABEL io.yasp.app.vars.title.label="Title for hastebin service"
LABEL io.yasp.app.vars.title.description="Title of hastebin service to printLe"
LABEL io.yasp.app.vars.title.type="text"
LABEL io.yasp.app.vars.title.defaultValue="My Hastebin"
LABEL io.yasp.app.vars.title.env="HASTEBIN_TITLE"

# Install Nodejs
RUN apk add --no-cache nodejs
RUN apk add --no-cache git

# Clone haste-server from git
RUN mkdir /opt
RUN git clone git://github.com/seejohnrun/haste-server.git /opt/haste

# Adding customization theme setup to haste
ADD opt/config.js /opt/haste/

# Override logo and CSS
ADD opt/logo.png /opt/haste/static/
ADD opt/application.css /opt/haste/static/
ADD opt/highlight.min.js /opt/haste/static/
ADD opt/highlight.css /opt/haste/static/
ADD start.sh /opt/haste

# Ajust CSS
RUN sed -i -e 's/<script type="text\/javascript" src="highlight.min.js"><\/script>/<script type="text\/javascript" src="highlight.min.js"><\/script><link rel="stylesheet" href="highlight.css">/g' /opt/haste/static/index.html

# Set working directory
WORKDIR /opt/haste

# Install haste-server
#ENV HTTP_PROXY "http://192.168.xxx.xxx:xxxx"
#RUN export https_proxy="${HTTP_PROX}"
RUN npm install

# Cleanup things
RUN apk del git
# Expose guest port and volume
EXPOSE 7777
VOLUME ["/opt/haste/data"]

# Start actual haste-server
RUN chmod +x ./start.sh
CMD ./start.sh 
