module.exports = {
    //dev variables
    db: 'mongodb://localhost/gadgetviser',
    sessionSecret: 'OlisaSamson',
    facebook: {
        clientID: '',
        clientSecret: '',
        callbackURL: 'http://localhost:3000/oauth/facebook/signin'
    },
    google: {
        clientID: '299323607815-bhlendn2l5i3m63j8ug95i4ct63td77u.apps.googleusercontent.com',
        clientSecret: 'nRcqI-U9GVaSAM1sWlLh5nD_',
        callbackURL: 'http://localhost:3000/oauth/google/signin'
    }
};