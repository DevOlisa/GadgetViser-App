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
    if (!req.query.function) {
        console.log('Simple List Request');
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
    } else {
        next();
    }
};

exports.fetchLatest = (req, res, next) => {
    if (req.query.function === "latest") {
        console.log('fetching latest')

        Gadget.find({
            type: req.query.type,
            released: {
                $ne: false
            }
        }, "", {
            limit: 10,
        },
            (err, gadgets) => {
                if (err) {
                    next(err);
                } else {
                    res.json(gadgets);
                }
            }).sort({ added: -1 });
    } else {
        next();
    }
};

exports.fetchUpcoming = (req, res, next) => {
    if (req.query.function === "upcoming") {
        console.log('fetching upcoming')

        Gadget.find({
            released: false,
            type: req.query.type
        }, "", {
            limit: 10
        },
            (err, gadgets) => {
                if (err) {
                    next(err);
                } else {
                    res.json(gadgets);
                }
            }).sort({ added: -1 });
    } else {
        next();
    }
};

exports.fetchOem = (req, res, next) => {
    if (req.query.function === "oem") {
        console.log('fetching oem devices');

    }
};

exports.fetchMoreFromOem = (req, res, next) => {
    if (req.query.function === 'moreFromOem') {
        console.log('fetching more from oem');
        Gadget.find({
            $and: [
                {
                    _id: {
                        $ne: req.query.id
                    }
                },
                {
                    type: {
                        $eq: req.query.type
                    }
                },
                {
                    oem: {
                        $eq: req.query.oem
                    }
                }
            ]
        }, (err, gadgets) => {
            if (err) {
                next(err);
            } else {
                res.json(gadgets);
            }
        })
    } else {
        next();
    }
}

// exports.fetchList = (req, res, next, params) => {
//     console.log('Got here in list function');
//     Gadget.find(req.params, "", {
//         limit: req.params.limit
//     },
//         (err, gadgets) => {
//             if (err) {
//                 next(err);
//             } else {
//                 req.gadgets = gadgets;
//                 next();
//             }
//         });
// };

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
