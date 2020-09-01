const axios = require('axios')
const uuid = require('uuid')

const {STATUSES, SUNDIAL_API_SERVER_URL, WEBHOOK_URL} = require('./constants')
const apiServer = axios.create({baseURL: SUNDIAL_API_SERVER_URL})

let count = 1

let NUMBERS = [{status: STATUSES.IDLE, value: '13018040009', unique_id: uuid.v4()},
{status: STATUSES.IDLE, value: '19842068287', unique_id: uuid.v4()},
{status: STATUSES.IDLE, value: '15512459377', unique_id: uuid.v4()},
{status: STATUSES.IDLE, value : '19362072765', unique_id: uuid.v4()},
{status: STATUSES.IDLE, value : '18582210308', unique_id: uuid.v4()},
{status: STATUSES.IDLE, value : '13018040009', unique_id: uuid.v4()},
{status: STATUSES.IDLE, value : '19842068287', unique_id: uuid.v4()},
{status: STATUSES.IDLE, value : '19842068287', unique_id: uuid.v4()},
{status: STATUSES.IDLE, value : '19362072765', unique_id: uuid.v4()}]

let inProgressIds= []


const fetchNumbers = async function (req, res) {
res.status(200).json({data: NUMBERS})
}

const initiateCalls = function (n = 3) {
    const remaininingIdleNumbers  = NUMBERS.filter((num)=>num.status === STATUSES.IDLE &&
        !inProgressIds.includes(num.unique_id))
    const firstNIdle = remaininingIdleNumbers.slice(0,n)
    inProgressIds = [...inProgressIds, ...firstNIdle.map((record)=>record.unique_id)]
    const promises = []
    firstNIdle.forEach((idleNumber)=>{
        if(idleNumber) {
            let index = NUMBERS.findIndex((num)=>num.unique_id === idleNumber.unique_id)
            if(index !== -1){
                let found = NUMBERS[index]
                found.id = count
                NUMBERS[index] = found
                count++
            }
            promises.push(apiServer.post('/call', {phone: idleNumber.value, webhookURL: WEBHOOK_URL}))
        }
    })
    Promise.all(promises).then((data)=>{
        console.log('data', NUMBERS)
    }).catch((ex)=>{
        console.log('exception', ex.toString())
    })
}

const initiateCall = async function (req, res) {
    initiateCalls()
    res.status(200).json({message: 'Calls initiated'})
}


const receiveCallStatuses= async function (req, res){
    const {id, status} = req.body
    const index = NUMBERS.findIndex((num)=>num.id === id)
    if(index !== -1 && NUMBERS[index].status !== STATUSES.COMPLETED){
        NUMBERS[index] = {...NUMBERS[index], status}
    }

    const completedNumbers  = NUMBERS.filter((num)=>num.status === STATUSES.COMPLETED)
    const ringingOrAnsweredNumbers = NUMBERS.filter((num)=>num.status === STATUSES.RINGING
        || num.status === STATUSES.ANSWERED)

        // always have atleast 3 calls in progress unless idle calls are less than 3
    if(ringingOrAnsweredNumbers.length >= 0 && ringingOrAnsweredNumbers.length < 3
        && completedNumbers.length !== NUMBERS.length){
        initiateCalls(3-ringingOrAnsweredNumbers.length)
    }

    res.status(200).json({message: 'Received status'})
}


module.exports = {fetchNumbers, initiateCall, receiveCallStatuses}
