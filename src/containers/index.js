import {connect} from 'react-redux'
import React, {useEffect, useState, useRef} from 'react'
import PropTypes from 'prop-types'
import {selector} from '../redux/selector'
import {List} from 'immutable'
import {fetchNumbers, dial} from '../redux/actions'

const Numbers = ({fetchNumbers, dial, numbers}) => {
    const interval = useRef(null)
    const [isDial, setIsDial] = useState(false)
    const [isFirstFetch, setIsFirstFetch] = useState(false)

    const isAllCompleted = numbers.filter((num)=>num.get('status')
        === 'completed').size === numbers.size


    useEffect(()=>{
        if(!isFirstFetch){
            fetchNumbers()
            setIsFirstFetch(s=>!s)
        }
        if(isDial) {
            interval.current = setInterval(() => fetchNumbers(), 1000)
        }
    }, [fetchNumbers, isDial, isFirstFetch])

    // stop polling once all calls are completed
    if(isAllCompleted){
        clearInterval(interval.current)
    }
    return (
        <div>
            <div style={{border: '2px solid lightgray', display: 'flex',
                flexDirection: 'column', marginBottom: 40}}>
        <div style={{display:'flex', padding: 10,
            borderBottom: '2px solid lightgray', justifyContent: 'space-evenly'}}>
            <div style={{display:'flex', paddingRight: 100}}>Number</div>
            <div style={{display:'flex'}}>Status</div>
        </div>
        {numbers.map((numberRecord, index)=>{
            return (<div style={{display:'flex', padding: 10, justifyContent: 'space-evenly',
            marginBottom: 20}} key={index}>
                <div style={{display:'flex', paddingRight: 100}}>{numberRecord.get('value')}</div>
                <div style={{display:'flex'}}>{numberRecord.get('status')}</div>
            </div>)
        })}
    </div>
            <button onClick={()=>{
                if(!isDial && !isAllCompleted){
                    dial()
                    setIsDial(s=>!s)
                }
            }} style={{width: 100, height: 50, color: 'white', backgroundColor: !isDial && !isAllCompleted ?
                    '#00c5ff': 'lightgray'}}>
                Call</button>
        </div>)
}

Numbers.propTypes = {
    fetchVideoFiles: PropTypes.func,
    dial: PropTypes.func,
    numbers: PropTypes.instanceOf(List)
}
export default connect(selector, {fetchNumbers, dial})(Numbers)
