
const express = require('express');
const  uuid = require('short-uuid')
const { PrismaClient} = require('@prisma/client')
let toCSV = require('json-2-csv')

const prisma = new PrismaClient()
const router = express.Router();

router.get('/list-my-plan', async (req, res) => {
  const result = await prisma.$queryRaw`SELECT * FROM pesananku`
  res.send(result)
})

router.post('/store-new-plan', async (req, res) => {
  const plan = req.body
  const csv = await toCSV.json2csv(plan)
  let id = uuid.generate()
  // await prisma.$executeRaw`INSERT INTO pesananku_temp (id, kota_asal, kota_tujuan, tanggal_berangkat, tanggal_pulang, dana, tema) VALUES (${id}, ${plan.kota_asal}, ${plan.kota_tujuan}, to_date(${plan.tgl_berangkat}, 'YYYY/MM/DD'), to_date(${plan.tgl_pulang}, 'YYYY/MM/DD'), ${parseInt(plan.dana)}, ${plan.tema})`

  console.log(csv)
  res.send(csv)
})

router.post('/plan-it', async (req, res) => {
  const plan = req.body
  let id = uuid.generate()
  await prisma.$executeRaw`INSERT INTO pesananku_temp (id, kota_asal, kota_tujuan, tanggal_berangkat, tanggal_pulang, dana, tema) VALUES (${id}, ${plan.kota_asal}, ${plan.kota_tujuan}, to_date(${plan.tgl_berangkat}, 'YYYY/MM/DD'), to_date(${plan.tgl_pulang}, 'YYYY/MM/DD'), ${parseInt(plan.dana)}, ${plan.tema})`
  console.log(plan)
  res.send(plan)
})

module.exports = router