import React from 'react'
import './App.css'
import fetch from 'node-fetch'
import Button from '@material-ui/core/Button'

const today = new Date()
var ye = today.getFullYear()
var mo = ('0' + (today.getMonth() + 1)).slice(-2)
var da = ('0' + today.getDate()).slice(-2)
var day = ye + '-' + mo + '-' + da

export default class App extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      json: []
    }
  }

  onClick = () => {
    fetch('https://holidays-jp.github.io/api/v1/date.json')
      .then(response => {
        return response.json()
      })
      .then(json => {
        this.setState({
          json: json[day]
        })
      })
  }

  render () {
    return (
      <div className='App'>
        <Button onClick={this.onClick} variant='contained' color='secondary'>
          今日は祝日？
        </Button>
        <p className='align'>{'今日は ' + day}</p>
        {console.log(this.state.json)}
        <p className='color'>
          {(() => {
            if (this.state.json === void 0) return <p>"ちがうよ！"</p>
            else return JSON.stringify(this.state.json)
          })()}
        </p>
      </div>
    )
  }
}
