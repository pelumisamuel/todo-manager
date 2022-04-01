import React from 'react'
import PropTypes from 'prop-types'
import Button from '../components/Button'
import { useLocation } from 'react-router'

const Header = ({ title, onAdd, showAddTaskValue }) => {
  // const onClick = () => {
  //   console.log('click')
  // }
  const location = useLocation()
  return (
    <div className='header'>
      <h1>{title}</h1>
      {location.pathname === '/' && (
        <Button
          color={showAddTaskValue ? 'red' : 'green'}
          text={showAddTaskValue ? 'Close' : 'Open'}
          onClick={onAdd}
        />
      )}
      {/* <Button onClick={onClick} /> */}
    </div>
  )
}

Header.defaultProps = {
  title: 'task Tracker',
}
Header.propTypes = {
  title: PropTypes.string,
}

export default Header
