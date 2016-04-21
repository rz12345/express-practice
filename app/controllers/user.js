var mongoose = require('mongoose');
var User = mongoose.model('User');

exports.showIsLogin = function (req,res){
    if(req.session.user){
        return res.send(req.session.user.name + ' is login');
    }
    return res.send('Hello world');
};

exports.showSignUp = function (req, res) {
    res.render('signup', {
        title: '註冊頁'
    });
};

exports.showSignIn = function (req, res) {
    res.render('signin', {
        title: '登錄頁'
    });
};

exports.signIn = function (req, res) {
    var _user = req.body.user;
    var name = _user.name;
    var password = _user.password;

    User.findOne({name: name}, function (err, user) {
        if (err)  return next(err);

        if (!user) {
            // user 不存在的話, 提示不存在
            res.send('user 不存在, 寶寶不悅');
        } else {
            // user 存在的話, 比對密碼
            user.comparePassword(password, function (err, isMatch) {
                if (err)  return next(err);

                if (isMatch) {
                    // 密碼比對成功
                    req.session.user = user;
                    //res.send('user 驗證通過');
                    res.redirect('/');
                } else {
                    // 密碼比對失敗
                    res.send('密碼輸入錯誤');
                }
            });
        }
    });
};

exports.signUp = function (req, res, next) {
    var _user = req.body.user;
    User.findOne({name: _user.name}, function (err, user) {
        if (err) {
            return next(err);
        }
        if (user) {
            // user 已存在的話, 提示已存在
            res.send('user 已存在');
        } else {
            // user 不存在的話, 新建一個
            user = new User(_user);
            user.save(function (err, user) {
                if (err) return next(err);
                res.redirect('/user/signin');
            });
        }
    });
};

exports.logOut = function (req,res,next){
    delete req.session.user;
    res.redirect('/');
};