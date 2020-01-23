const axios = require('axios')
const Dev = require('../models/Dev')
const parseStringAsArray = require('../utils/parseStringasArray')

module.exports = {
  async index(req, res) {
    try {
      const devs = await Dev.find()

      if (devs) {
        return res.json(devs)
      }
      return false
    } catch (error) {
      console.log(error)
      return false
    }
  },

  async store(req, res) {

    const { github_username, techs, latitude, longitude } = req.body

    try {
      let dev = await Dev.findOne({ github_username })

      if (!dev) {
        const response = await axios.get(`https://api.github.com/users/${github_username}`)

        const { name = login, avatar_url, bio } = response.data

        const techsArray = parseStringAsArray(techs)

        const location = {
          type: 'Point',
          coordinates: [longitude, latitude]
        }

        dev = await Dev.create({
          github_username,
          name,
          avatar_url,
          bio,
          location,
          techs: techsArray,
        })
      }

      return res.json(dev)
    } catch (error) {
      console.log(error)
      return false
    }
  },

  async update(req, res) {

  },

  async delete(req, res) {

  }
}