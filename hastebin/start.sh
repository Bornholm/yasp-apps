#!/bin/ash 

# Adjust title
sed -i -e "s/<title>hastebin<\/title>/<title>${HASTEBIN_TITLE}<\/title>/g" /opt/haste/static/index.html
sed -i -e "s/haste('hastebin'/haste('${HASTEBIN_TITLE}'/g" /opt/haste/static/index.html

npm start
