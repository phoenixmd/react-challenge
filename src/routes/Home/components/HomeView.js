import React from 'react'

import InfiniteList from 'components/InfiniteList'
import DuckImage from '../assets/Duck.jpg'
import classes from './HomeView.scss'

export const HomeView = () => (
  <div>
    <h4>Welcome!</h4>
    <InfiniteList />
    <img
      alt='This is a duck, because Redux!'
      className={classes.duck}
      src={DuckImage} />
  </div>
)

export default HomeView
