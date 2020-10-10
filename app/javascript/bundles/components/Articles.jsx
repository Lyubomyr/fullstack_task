import PropTypes from 'prop-types'
import React, { useState } from 'react'

const Articles = props => {
  const [name, setName] = useState('Test')

  return (
    <div>
      <h3>Hello, {name}!</h3>
      <hr />
      <form>
        <label htmlFor="name">
          Say hello to:
          <input id="name" type="text" value={name} onChange={e => setName(e.target.value)} />
        </label>
      </form>
    </div>
  )
}

export default Articles
