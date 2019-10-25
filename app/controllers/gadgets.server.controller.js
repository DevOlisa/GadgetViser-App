const Gadget = require('mongoose').model('Gadget');

exports.create = (req, res, next) => {
    let gadget = new Gadget(req.body);

    gadget.save((err) => {
        if (err) {
            return next(err);
        } else {
            res.json(gadget);
        }
    });
};

exports.list = (req, res, next) => {
    console.log(req.query)
    Gadget.find(req.query, "", {
        limit: 10
    },
        (err, gadgets) => {
            if (err) {
                next(err);
            } else {
                res.json(gadgets);
            }
        });
};

exports.fetchList = (req, res, next, params) => {
    console.log('Got here in list function');
    Gadget.find( req.params, "", {
        limit: req.params.limit
    },
        (err, gadgets) => {
            if (err) {
                next(err);
            } else {
                req.gadgets = gadgets;
                next();
            }
        });
};

exports.read = (req, res) => {
    if (req.gadget) {
        res.json(req.gadget);
    } else {
        res.json(req.gadgets);
    }
};

exports.fetchGadget = (req, res, next, url) => {
    Gadget.findOne({
        link: url
    }, "", (err, gadget) => {
        if (err) {
            console.log(err);
            return next(err);
        } else {
            req.gadget = gadget;
            next();
        }
    });
};

exports.update = (req, res, next) => {
    Gadget.findOneAndUpdate({
        name: req.gadget.name
    }, req.body, (err, gadget) => {
        if (err) {
            return next(err);
        } else {
            res.json(gadget);
        }
    });
};

exports.delete = (req, res, next) => {
    req.gadget.remove((err) => {
        if (err) {
            return next(err);
        } else {
            res.json(req.gagdet);
        }
    });
};
