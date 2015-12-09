FROM debian:jessie

LABEL io.yasp.app.enabled="1"
LABEL io.yasp.app.name="Test App"
LABEL io.yasp.app.description="A simple Yasp app for test purpose"

# App variables

# "Message" variable
LABEL io.yasp.app.vars.message.label="Message"\
  io.yasp.app.uid="io.yasp.apps.test-app" \
  io.yasp.app.vars.message.description="A basic message to print"\
  io.yasp.app.vars.message.type="text"\
  io.yasp.app.vars.message.defaultValue="Hello world !"\
  io.yasp.app.vars.message.env="MY_MESSAGE"

EXPOSE 80
VOLUME /test

CMD while true; do echo $MY_MESSAGE; sleep 2; done;
