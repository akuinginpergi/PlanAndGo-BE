const express = require('express')
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
const router = express.Router()

router.get('/choose-destination', async (req, res) => {
  const tujuan = req.query.kota_tujuan
  const data = await prisma.$queryRaw`SELECT * FROM tiket_wisata WHERE lokasi_wisata = ${tujuan}`
  res.status(200).json({
    error: false,
    message: "Success!",
    data: data
  })
})

module.exports = router