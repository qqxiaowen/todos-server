const express = require('express');
const router = express.Router();

const user = require('../model/user');
const auth = require('./auth');

// 注册用户
router.post('/', async (req, res, next) => {
  try {
    let { username, password, desc, sex, nickname } = req.body;

    let findData = await user.findOne({username});
    let count = await user.count();
    if (!username || !password) {
      res.json({
        msg: '缺少必要参数'
      })
    } else if (findData) {
      res.json({
        msg: '该用户已被注册'
      })
    } else {
      if (!nickname) {
        nickname = `用户${count + 1}`
      }

      await user.create({ username, password, desc, sex, nickname })
      res.json({
        code: 200,
        msg: '注册成功',
      })
    }

  } catch (err) {
    next(err);
  }
})

// 用户登录
router.post('/login', async(req, res, next) => {
  try {
    let { username, password } = req.body;
    if (!username || !password) { // 未传递用户名/密码
      res.json({
        msg: '请输入用户名/密码'
      })
    } else {
      let findData = await user.findOne({username});
      if (!findData) { // 用户不存在
        res.json({
          msg: '用户不存在'
        })
      } else {
        if (findData.password !== password) { // 密码错误
          res.json({
            msg: '密码错误'
          })
        } else {
          findData.password = null;
          req.session.user = findData;
          res.json({
            code: 200,
            msg: '登录成功'
          })
        }
      }
    }
  } catch(err) {
    next(err);
  }
})

// 用户修改个人密码
router.put('/', auth, async (req, res, next) => {
  try {
    let userId = req.session.user._id;
    let { password } = req.body;
    await user.updateOne({_id:userId}, {$set: {password}});
    res.json({
      code: 200,
      msg: '修改密码成功'
    })
  } catch(err) {
    next(err);
  }
})

// 用户注销
router.get('/logout', auth, async(req, res, next) => {
  try {
    req.session.user = '';
    res.json({
        code: 200,
        msg: '退出登录成功'
    })
  } catch(err) {
    next(err);
  }
})

module.exports = router;