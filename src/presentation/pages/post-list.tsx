import React, { useEffect, useState } from 'react'

interface PostProps {
  id: number
  title: string
  post_content: string
  featured: number
  status: number

}

const PostList: React.FC = () => {
  const [query, setQuery]: any = useState([])
  const url = 'http://localhost:5000/api/'
  const endPoint = 'post/'

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch(url + endPoint, {
          method: 'GET',
          mode: 'cors',
          headers: {
            'Content-Type': 'application/json'
          }
        })
        const data = await response.json()
        if (data.code === 'success' && data.post !== null) {
          setQuery(data.post)
        }
      } catch (err) {
        console.log(err.message)
      }
    })()
  }, [])

  return (
    <div>
      <thead>
        <tr>
          <th>ID</th>
          <th>Title </th>
          <th>Content </th>
          <th>Action </th>
        </tr>
      </thead>
      <tbody>
        {query.map((post: PostProps) => (
          <tr key={post.id}>
            <td> {post.id}</td>
            <td>{post.title}</td>
            <td> <div dangerouslySetInnerHTML={{ __html: post.post_content }}></div> </td>
            <td>Algum botão</td>
          </tr>
        ))}
      </tbody>
    </div>
  )
}

export default PostList
