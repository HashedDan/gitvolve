import React, { Component } from 'react'
import Link from 'gatsby-link'
import axios from 'axios'
import './index.css'

class IndexPage extends Component {
  constructor() {
    super()
    this.handleChange = this.handleChange.bind(this)
    this.printClick = this.printClick.bind(this)
    this.state = {
      input: ""
    }
  }

  componentWillMount() {
    console.log("COMPONENT WILL MOUNT!")
  }

  handleChange(e) {
    console.log(e.target.value)
    this.setState({input: e.target.value})
  }

  printClick() {
    console.log("CLICK")
    console.log()
    axios({
      method:'get',
      url:'https://api.github.com/repos/'+ this.state.input +'/commits',
      responseType:'json'
    })
    .then(data=>console.log(data))
    .catch(err=>console.log(err))
  }

  render() {

    const input = this.state.input

    return (
      <div>
        <input id="input" placeholder="GitHub Repository" value={input} onChange={this.handleChange}></input>
        <button type="button" onClick={this.printClick}>Hatch</button>
      </div>
    )
  }
}

export default IndexPage
