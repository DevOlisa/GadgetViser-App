exports.render = function (req, res) {
    if (req.session.lastVisit) {
        console.log(req.session.lastVisit);
    }
    console.log(req.user);  
    req.session.lastVisit = new Date();
};