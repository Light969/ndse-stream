#!/usr/bin/env node

const fs = require('fs')
const os = require('os')
const path = require('path')
const readline = require('readline')
const yargs = require('yargs')
const argv = yargs(process.argv.slice(2)).argv

const rl = readline.createInterface({
  input: process.stdin
})

const isNumber = val => {
  const num = Number(val)
  if (isNaN(num)) {
    console.log('Необходимо ввести число!')
    return false
  }
  return true
}

const log = async (win) => {
  const fileName = argv['log-file']
  const pathFile = path.join(__dirname, `${fileName ?? path.parse(__filename).name}.log`)
  const data = `${new Date()} | ${win}${os.EOL}`
  try {
    return fs.promises.appendFile(pathFile, data)
  } catch (e) {
    console.log(e)
  }
}

const headOrTails = () => {
  const randomVal = Math.round(Math.random()) + 1
  console.log('Орел или решка? Орел = 1, решка = 2')
  rl.on('line', async val => {
    if (!isNumber(val)) return
    if (val > 2) {
      console.log('Необходимо ввести 1 или 2')
      return
    }
    const win = randomVal == val
    console.log(win ? 'Верно!' : 'Не верно!')
    await log(win)
    rl.close()
  })
}

headOrTails()