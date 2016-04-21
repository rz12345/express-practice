var User = require('./controllers/user');

module.exports = function (app) {
    // user 登錄狀態保存預處理
    app.use(function (req, res, next) {
        var _user = req.session.user;
        app.locals.user = _user ? _user : null;
        return next();
    });

    // 首頁
    app.get('/', function (req, res) {
        return res.render('index', {
            title: 'Index'
        });
    });

    // 登錄
    app.get('/user/signin', User.showSignIn);
    app.post('/user/signin', User.signIn);

    // 註冊
    app.get('/user/signup', User.showSignUp);
    app.post('/user/signup', User.signUp);

    // 登出
    app.get('/user/logout', User.logOut);
};