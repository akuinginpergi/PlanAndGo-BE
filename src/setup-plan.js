const express = require('express')
const { PrismaClient } = require('@prisma/client')
const  uuid = require('short-uuid')
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

router.post('/save-temp', async (req, res) => {
  await prisma.$connect()
  const plan = req.body
  const id = uuid.generate()
  await prisma.$executeRaw`INSERT INTO pesananku_temp VALUES (${id}, ${plan.tiket_berangkat}, ${plan.tiket_pulang}, ${plan.hotel},${plan.kota_asal}, ${plan.kota_tujuan}, to_date(${plan.tgl_berangkat}, 'YYYY/MM/DD'), to_date(${plan.tgl_pulang}, 'YYYY/MM/DD'), ${parseInt(plan.dana)}, ${plan.tema})`

  res.sendStatus(200)
  await prisma.$disconnect()
  process.exit(1)
})

router.get('/plan-temp/:id', async (req, res) => {
  await prisma.$connect()
  const id = req.params.id;
  const data = await prisma.$queryRaw`SELECT * FROM pesananku_temp WHERE id = ${id}`
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

router.post('/save-plan/:id', async (req, res) => {
  await prisma.$connect()

  const plan = req.body
  const id = req.params.id
  await prisma.$executeRaw`INSERT INTO pesananku VALUES (${id}, ${plan.tiket_berangkat}, ${plan.tiket_pulang}, ${plan.hotel},${plan.kota_asal}, ${plan.kota_tujuan}, to_date(${plan.tgl_berangkat}, 'YYYY/MM/DD'), to_date(${plan.tgl_pulang}, 'YYYY/MM/DD'), ${parseInt(plan.dana)}, ${plan.tema})`
  await prisma.$executeRaw`DELETE FROM pesananku_temp WHERE id = ${id}`
  res.sendStatus(200)
  await prisma.$disconnect()
  process.exit(1)
})

module.exports = router