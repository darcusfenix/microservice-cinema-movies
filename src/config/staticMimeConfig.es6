const staticMimes = (express) => {

    express.static.mime.define({"text/css": ["css"]});
    express.static.mime.define({"application/x-font-woff": ["woff"]});
    express.static.mime.define({"application/x-font-ttf": ["ttf"]});
    express.static.mime.define({"application/vnd.ms-fontobject": ["eot"]});
    express.static.mime.define({"font/opentype": ["otf"]});

};

export default staticMimes;
