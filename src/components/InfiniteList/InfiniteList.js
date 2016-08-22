import React, { PropTypes } from 'react'
import Infinite from 'react-infinite'
import axios from 'axios'

import classes from './InfiniteList.scss'

const ListItem = (props) => (
  <div className={classes.infiniteListItem}>
    {props.todo}
  </div>
)
ListItem.propTypes = {
  todo: PropTypes.string
}
let startIdx = 0

export default class InfiniteList extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      elements: [],
      isInfiniteLoading: true
    }

    this.handleInfiniteLoad = this.handleInfiniteLoad.bind(this)
  }

  componentDidMount () {
    this.loadElements()
  }

  loadElements () {
    this.setState({
      isInfiniteLoading: true
    })

    axios.get('https://jsonplaceholder.typicode.com/todos')
      .then(({ data }) => {
        console.log('Hello world!', data)

        this.setState({
          isInfiniteLoading: false,
          elements: this.state.elements.concat(this.buildElements(data))
        })
      })
  }

  buildElements (todos) {
    const elements = todos.map(({title}, idx) => {
      const key = startIdx + idx

      return (<ListItem key={key} todo={`${key + 1} ${title}`} />)
    })
    startIdx += todos.length

    return elements
  }

  elementInfiniteLoad () {
    return <div className={classes.infiniteListItem}>
      Loading...
    </div>
  }

  handleInfiniteLoad () {
    this.loadElements(100)
  }

  render () {
    const { isInfiniteLoading, elements } = this.state

    return <Infinite
      elementHeight={40}
      containerHeight={800}
      infiniteLoadBeginEdgeOffset={200}
      onInfiniteLoad={this.handleInfiniteLoad}
      loadingSpinnerDelegate={this.elementInfiniteLoad()}
      isInfiniteLoading={isInfiniteLoading}>
      {elements}
    </Infinite>
  }
}
