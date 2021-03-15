import React, { useEffect, useState } from 'react'
import App from '../../App'

const Noticia = () => {
  const [post, setPost] = useState([])
  const url = "http://localhost:5000/api/post/orgao/1"

  useEffect(() => {
    ;(async () => {
      try {
        const response = await fetch(url, {
          method: 'GET',
          mode: 'cors',
          headers: {
            'Content-Type': 'application/json'
          }
        })
        const data = await response.json()
        setPost(data.post)
        return
      } catch (err) {
        console.log(err.message)
      }
    })()
  }, [url])


  return (
    <App>
      <ul>
      {post.map((item) => 
        <li key={item.id}>
         <div>{item.title}</div>
         <div>{item.post_content}</div>
         <div>{item.}</div>
        </li>
      )}
      </ul>
    </App>
  )
}

export default Noticia