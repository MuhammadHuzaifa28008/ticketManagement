const express = require('express')
const router= express.Router()


const {handleDBStats, handleErrorLog}  = require ('../controllers/utilsControllers')

router.get('/db-stats',handleDBStats )
router.post('/fatal-error',handleErrorLog )


module.exports = router