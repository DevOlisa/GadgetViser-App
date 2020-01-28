const gadgets = require('../controllers/gadgets.server.controller');

module.exports = (app) => {

    app.route('/gadgets')
        .get(gadgets.list, gadgets.fetchLatest, gadgets.fetchUpcoming, gadgets.fetchMoreFromOem, gadgets.fetchOem)
        .post(gadgets.saveSpecs, gadgets.create)
        .put(gadgets.update);

    app.route('/gadget/:gadgetUrl')
        .get(gadgets.log, gadgets.read);

    app.param('gadgetUrl', gadgets.fetchGadget);
};
