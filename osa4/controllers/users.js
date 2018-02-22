
const brycpt = require('bcrypt')
const userRouter = require('express').Router()
const User = require('../models/user')

userRouter.get('/', async (req,res) => {
  const users = await User
    .find({})
    .populate('blogs', { likes: 1, author: 1, title: 1, url: 1 })
  res.json(users.map(User.Format))
})

userRouter.post('/', async (req,res) => {
  try {
    const body = req.body

    if (body.userName === undefined || body.realName === undefined || body.password === undefined) {
      return res.status(400).json({ error: 'fill all fields when creating a user' })
    }

    if (body.password.length < 3) {
      return res.status(422).json({ error: 'password is too short' })
    }

    const doesUserExist = await User.find({ userName: body.userName })
    if (doesUserExist.length > 0) {
      return res.status(422).json({ error: 'username taken' })
    }

    const saltRounds = 10
    const passwordHash = await brycpt.hash(body.password, saltRounds)

    const user = new User({
      userName: body.userName,
      realName: body.realName,
      passwordHash: passwordHash,
      adult: body.adult === undefined ? true : body.adult
    })

    const savedUser = await user.save()
    res.json(User.Format(savedUser))

  } catch (exc) {
    console.log(exc)
    res.status(500).send({ error: 'dunno what happened' })
  }
})

userRouter.delete('/:id', async (req,res) => {
  await User.findByIdAndRemove(req.params.id)
  res.status(204).end()
})

module.exports = userRouter