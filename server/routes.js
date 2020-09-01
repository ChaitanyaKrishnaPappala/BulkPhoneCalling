const express = require('express')
const router = express.Router()
const controller = require('./controller')

router.get('/numbers', (req, res) => controller.fetchNumbers(req, res))
router.post('/call', (req, res) => controller.initiateCall(req, res))
router.post('/status', (req, res) => controller.receiveCallStatuses(req, res))

module.exports = router
