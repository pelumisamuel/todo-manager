import React from 'react'
import PropTypes from 'prop-types'

function Button({ color, text, onClick }) {
  return (
    <div onClick={onClick} className='btn' style={{ backgroundColor: color }}>
      {text}{' '}
    </div>
  )
}

Button.defaultProps = {
  color: 'steelblue',
  text: 'hello world',
}

Button.propTypes = {
  color: PropTypes.string,
  text: PropTypes.string,
  onclick: PropTypes.func,
}

export default Button
