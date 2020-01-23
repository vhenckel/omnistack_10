const Dev = require('../models/Dev')
const parseStringAsArray = require('../utils/parseStringasArray')

module.exports = {
  async index(req, res) {
    const { latitude, longitude, techs } = req.query

    try {
      const techsArray = parseStringAsArray(techs)

      const devs = await Dev.find({
        techs: {
          $in: techsArray
        },
        location: {
          $near: {
            $geometry: {
              type: 'Point',
              coordinates: [longitude, latitude],
            },
            $maxDistance: 10000,
          },
        }
      })

      console.log(devs)
      return res.json(devs)
    } catch (error) {
      console.log(error)
      return false
    }
  },
}