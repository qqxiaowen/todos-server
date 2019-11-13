const express = require('express');
const router = express.Router();

const auth = require('./auth');
const todo = require('../model/todo');

// 查看个人todo
router.get('/', auth, async(req, res, next) => {
  try {
    let userId = req.session.user._id;
    // let count = await todo.count();
    let data = await todo.find({userId});
    res.json({
      code: 200,
      msg: '获取个人todo成功',
      data
    })
  } catch(err) {
    next(err);
  }
})

// 添加个人todo
router.post('/', auth, async(req, res, next) => {
  try {
    let userId = req.session.user._id;
    let { todoContent } = req.body;
    await todo.create({ userId, todoContent });
    res.json({
      code: 200,
      msg: '添加成功'
    })
  } catch(err) {
    next(err);
  }
})

// 修改个人todo
router.put('/:todoId', auth, async(req, res, next) => {
  try {
    let { todoId } = req.params;
    let { todoContent, isAchieve } = req.body;
    if (!todoContent || !isAchieve) {
      res.json({
        msg: '缺少必传参数'
      })
    } else {
      await todo.updateOne({ _id: todoId }, {$set: { todoContent, isAchieve }});
      res.json({
        code: 200,
        msg: '修改成功'
      })
    }
    
  } catch(err) {
    next(err);
  }
})

// 删除个人todo
router.delete('/:todoId', auth, async(req, res, next) => {
  try {
    let { todoId } = req.params;
    let findData = await todo.findById(todoId);
    if (findData) {
      await todo.deleteOne({ _id: todoId });
      res.json({
        code: 200,
        msg: '删除成功'
      })
    } else {
      res.json({
        msg: '不存在该数据'
      })
    }
    
    
  } catch(err) {
    next(err);
  }
})
module.exports = router;