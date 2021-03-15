
import React from 'react'
import App from '../../App'

const HomePage = () => {


  const json = [
    {
      "id": 1,
      "name": "teste"
    }
  ]

  return (
    <App>
      {json.map(item => (
        <li key={item.id}> {item.name} </li>
      ))}
        <h1>Página I nicial</h1>
    </App>
  )
}

export default HomePage