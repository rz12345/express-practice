var User = require('./controllers/user');

module.exports = function(app){
    app.get('/' , User.showIsLogin);

    // 登錄
    app.get('/user/signin', User.showSignIn);
    app.post('/user/signin', User.signIn);

    // 註冊
    app.get('/user/signup', User.showSignUp);
    app.post('/user/signup', User.signUp);
};;