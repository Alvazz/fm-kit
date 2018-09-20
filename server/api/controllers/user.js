const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const User = require('../models/user')

const config = {}
config.JWT_KEY = 'secret'

exports.user_signup = (req, res, next) => {
  User.find({ username: req.body.username })
    .exec()
    .then(user => {
      if (user.length >= 1) {
        return res.status(409).json({
          message: 'User exists'
        })
      } else {
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          if (err) {
            return res.status(500).json({
              error: err
            })
          } else {
            const user = new User({
              _id: new mongoose.Types.ObjectId(),
              username: req.body.username,
              // confirmPassword: req.body.confirmPassword,
              email: req.body.email,
              flashed: [],
              role: req.body.role,
              password: hash
            })
            user
              .save()
              .then(result => {
                console.log(result)
                res.status(201).json({
                  message: 'User created'
                })
              })
              .catch(err => {
                console.log(err)
                res.status(500).json({
                  error: err
                })
              })
          }
        })
      }
    })
}

exports.user_login = (req, res, next) => {
  User.find({ username: req.body.username })
    .exec()
    .then(user => {
      if (user.length < 1) {
        return res.status(401).json({
          message: 'Auth failed'
        })
      }
      bcrypt.compare(req.body.password, user[0].password, (err, result) => {
        if (err) {
          return res.status(401).json({
            message: 'Auth failed'
          })
        }
        if (result) {
          const token = jwt.sign(
            {
              email: user[0].email,
              userId: user[0]._id,
              username: user[0].username,
              role: user[0].role
            },
            config.JWT_KEY, // app.get('superSecret'), //config.JWT_KEY,
            {
              expiresIn: 60 * 60 * 24 // expires in 1 hours
            }
          )
          return res.status(200).json({
            message: 'Auth successful',
            token: token
          })
        }
        res.status(401).json({
          message: 'Auth failed'
        })
      })
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({
        error: err
      })
    })
}

exports.user_delete = (req, res, next) => {
  User.remove({ _id: req.params.userId })
    .exec()
    .then(result => {
      res.status(200).json({
        message: 'User deleted'
      })
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({
        error: err
      })
    })
}

exports.user_list = (req, res, next) => {
  User.find()
    .select('username role')
    .exec((err, result) => {
      if (err) {
        res.send(err)
      } else {
        res.json(result)
      }
    })
}

exports.user_profile = (req, res, next) => {
  const id = req.params.userId
  User.findById(id)
    .select('username role email flashed')
    .exec((err, result) => {
      if (err) {
        res.send(err)
      } else {
        res.json(result)
      }
    })
}

exports.user_update_profile = (req, res, next) => {
  const id = req.params.userId
  const updateOps = {}
  for (const ops of req.body) {
    updateOps[ops.propName] = ops.value
  }

  User.find({ username: updateOps['username'] })
    .exec()
    .then(user => {
      if (user.length >= 1) {
        return res.status(409).json({
          message: 'User exists'
        })
      } else {
        User.update({ _id: id }, { $set: updateOps })
          .exec()
          .then(result => {
            res.status(200).json({
              message: 'User updated',
              request: {
                type: 'GET',
                url: 'http://localhost:3000/user/' + id
              }
            })
          })
          .catch(err => {
            console.log(err)
            res.status(500).json({
              error: err
            })
          })
      }
    })
}
