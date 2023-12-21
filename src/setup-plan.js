const express = require('express')
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
const router = express.Router()

router.get('/choose-destination', async (req, res) => {
  await prisma.$connect()
  const tujuan = req.query.kota_tujuan
  const data = await prisma.$queryRaw`SELECT * FROM tiket_wisata WHERE lokasi_wisata = ${tujuan}`
  if (data != []) {
    res.status(200).json({
      error: false,
      message: "Success!",
      data: data
    })
  } else {
    res.status(404).json({
      error: true,
      message: "Data tidak ada"
    })
  }
  await prisma.$disconnect()
  process.exit(1)
})

router.get('/choose-hotel', async (req, res) => {
  await prisma.$connect()
  const tujuan = req.query.kota_tujuan
  const data = await prisma.$queryRaw`SELECT * FROM hotel WHERE alamat ILIKE ${'%' + tujuan +'%'}`
  if (data != []) {
    res.status(200).json({
      error: false,
      message: "Success!",
      data: data
    })
  } else {
    res.status(404).json({
      error: true,
      message: "Data tidak ada"
    })
  }
  await prisma.$disconnect()
  process.exit(1)
})

router.get('/choose-depart', async (req, res) => {
  await prisma.$connect()
  const depart = decodeURI(req.query.kota_asal)
  const arrival = decodeURI(req.query.kota_tujuan)
  const data = await prisma.$queryRaw`SELECT * FROM tiket_transportasi WHERE kota_keberangkatan = ${depart} AND kota_tiba = ${arrival}`
  if (data != []) {
    res.status(200).json({
      error: false,
      message: "Success!",
      data: data
    })
  } else {
    res.status(404).json({
      error: true,
      message: "Data tidak ada"
    })
  }
  await prisma.$disconnect()
  process.exit(1)
})

router.get('/choose-return', async (req, res) => {
  await prisma.$connect()
  const depart = decodeURI(req.query.kota_asal)
  const arrival = decodeURI(req.query.kota_tujuan)
  const data = await prisma.$queryRaw`SELECT * FROM tiket_transportasi WHERE kota_tiba = ${depart} AND kota_keberangkatan = ${arrival}`
  if (data != []) {
    res.status(200).json({
      error: false,
      message: "Success!",
      data: data
    })
  } else {
    res.status(404).json({
      error: true,
      message: "Data tidak ada"
    })
  }
  await prisma.$disconnect()
  process.exit(1)
})
module.exports = router