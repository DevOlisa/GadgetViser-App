const gadgets = require('../controllers/gadgets.server.controller');

module.exports = (app) => {

    app.route('/gadgets')
        .get(gadgets.list)
        .post(gadgets.create);

    app.route('/gadget/:gadgetUrl')
        .get(gadgets.read);

    app.param('listOpt', gadgets.fetchList);
    app.param('gadgetUrl', gadgets.fetchGadget);
};
