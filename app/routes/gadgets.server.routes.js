const gadgets = require('../controllers/gadgets.server.controller');

module.exports = (app) => {

    app.route('/gadgets')
        .get(gadgets.list, gadgets.fetchLatest, gadgets.fetchUpcoming, gadgets.fetchMoreFromOem, gadgets.fetchOem)
        .post(gadgets.create);

    app.route('/gadget/:gadgetUrl')
        .get(gadgets.read);

    app.param('gadgetUrl', gadgets.fetchGadget);
};
