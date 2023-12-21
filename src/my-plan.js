
const express = require('express');
const  uuid = require('short-uuid')
const { PrismaClient} = require('@prisma/client')
let toCSV = require('json-2-csv')

const prisma = new PrismaClient()
const router = express.Router();

router.get('/list-my-plan', async (req, res) => {
  await prisma.$connect()
  const data = await prisma.$queryRaw`SELECT * FROM pesananku`
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

router.get('/list-my-plan/:id', async (req, res) => {
  await prisma.$connect()
  const id = req.params.id;
  const data = await prisma.$queryRaw`SELECT * FROM pesananku WHERE id = ${id}`
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

router.delete('/list-my-plan/:id/cancel-plan', async (req, res) => {
  await prisma.$connect()
  const id = req.params.id
  await prisma.$executeRaw`DELETE FROM pesananku WHERE id = ${id}`

  res.sendStatus(200)
  await prisma.$disconnect()
  process.exit(1)
})

module.exports = router