import React, { Component } from 'react'
import Link from 'gatsby-link'
import axios from 'axios'
import Viz from '../components/viz'
import './index.css'

class IndexPage extends Component {
  constructor() {
    super()
    axios.defaults.headers.common['Authorization'] = 'bearer' + auth_token;
    this.handleChange = this.handleChange.bind(this)
    this.printClick = this.printClick.bind(this)
    this.print = this.print.bind(this)
    this.state = {
      input: "",
      tree: {}
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
    // Get List of Commits
    axios({
      method:'post',
      url:'https://api.github.com/graphql',
      responseType:'json',
      data: {
        query: `
          query {
            repository(owner:"babel", name:"babel") {
              issues(last:20, states:CLOSED) {
                edges {
                  node {
                    title
                    url
                    labels(first:5) {
                      edges {
                        node {
                          name
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        `
      }
    })
    .then(data=>{
      console.log(data)
    })
    .catch(err=>console.log(err))
  }

  print() {
    console.log(this.state.input)
    console.log(this.state.tree)
  }

  render() {

    const input = this.state.input

    return (
      <div id="content">
        <input id="input" placeholder="GitHub Repository" value={input} onChange={this.handleChange}></input>
        <button type="button" onClick={this.printClick}>Hatch</button>
        <button type="button" onClick={this.print}>Print</button>
        <div>
          <Viz size={[500,500]} />
        </div>
      </div>
    )
  }
}

export default IndexPage
