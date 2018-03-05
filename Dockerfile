FROM wernight/phantomjs

ADD https://raw.githubusercontent.com/ariya/phantomjs/master/examples/rasterize.js /rasterize.js
USER root
RUN chown phantomjs /rasterize.js
USER phantomjs

VOLUME ["/srv"]
WORKDIR /srv

ENTRYPOINT ["/usr/local/bin/phantomjs", "--ignore-ssl-errors=true", "--ssl-protocol=any", "--web-security=true", "/rasterize.js"]
