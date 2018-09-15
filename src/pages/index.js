import React, { Component } from 'react'
import Link from 'gatsby-link'
import axios from 'axios'
import Viz from '../components/viz'
import './index.css'

class IndexPage extends Component {
  constructor() {
    super()
    this.handleChange = this.handleChange.bind(this)
    this.printClick = this.printClick.bind(this)
    this.state = {
      input: "",
      tree: []
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
    // Get List of Commits
    axios({
      method:'get',
      url:'https://api.github.com/repos/'+ this.state.input +'/commits',
      responseType:'json'
    })
    .then(data=>{
      console.log(data)
      var tree = data.request.response
      var temp = []
      count = 0
      for (var i = 0; i < tree.length; i++){
        var obj = tree[i];
        console.log(obj)
        // Get List of Files for each Commit
        axios({
          method:'get',
          url: obj.commit.tree.url,
          responseType:'json'
        })
        .then(res=>{
          console.log(res)
          count++
        })
        .catch(err=>console.log(err))
      }
      console.log("COUNT: " + count)
    })
    .catch(err=>console.log(err))
  }

  buildViz() {

  }

  render() {

    const input = this.state.input

    return (
      <div id="content">
        <input id="input" placeholder="GitHub Repository" value={input} onChange={this.handleChange}></input>
        <button type="button" onClick={this.printClick}>Hatch</button>
        <div>
          <Viz size={[500,500]} />
        </div>
      </div>
    )
  }
}

export default IndexPage
