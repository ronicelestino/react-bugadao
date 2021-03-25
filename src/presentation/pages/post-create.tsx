import React, { useEffect, useState } from 'react'
import { PostCategoryDropDown } from '@/presentation/components'

import { Editor } from '@tinymce/tinymce-react'

interface PostProps {
  id?: number
  title?: string
  post_content?: string
  post_category_id?: number
  featured?: number
  status?: number
  user_created?: number

}
interface HTMLInputEvent extends Event {
  target: HTMLInputElement & EventTarget
}

const PostCreate: React.FC = () => {
  const url = 'http://localhost:5000/api/'
  const endPoint = 'post/'
  const url_get_by_id = 'http://localhost:5000/api/post/5'

  const [query, setQuery] = useState([])

  const [title, setTitle] = useState()
  const [post_content, setPostContent] = useState()
  const [post_category, setPostCategory] = useState()
  const [featured, setFeatured] = useState()
  const [status, setStatus] = useState()
  const [user_created, setUserCreated] = useState(1)

  const create_post = async (data: PostProps): Promise<void> => {
    try {
      const response = await fetch(url + endPoint, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })
      return await response.json()
    } catch (err) {
      console.log(err)
      return err
    }
  }

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch(url_get_by_id, {
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

  const handleTitle = (event: any): void => {
    setTitle(event.target.value)
  }

  const handlePostContent = (content: any): void => {
    setPostContent(content)
  }

  const handleFeatured = (event: any): void => {
    setFeatured(event.target.value)
  }

  const handleStatus = (event: any): void => {
    setStatus(event.target.value)
  }

  const handlePostCategory = (event: any): void => {
    setPostCategory(event.target.value)
  }

  const handleSubmit = (event: any): void => {
    event.preventDefault()
    const data_form: PostProps = {
      title: title,
      post_content: post_content,
      post_category_id: post_category,
      status: status,
      featured: featured,
      user_created: user_created
    }
    console.log(data_form)
    create_post(data_form)
  }

  return (
    <div>
      <form>
        <input
          type="text"
          name="title"
          id="title"
          onChange={handleTitle}
        />

        <Editor
          apiKey='fc9aat9ro2lep3hy0l0ki7e966qid3egw1ypfflj7dz98n32'
          init={{
            plugins: 'image code',
            toolbar: 'undo redo | link image | code',
            automatic_uploads: true,
            file_picker_types: 'image',
            file_picker_callback: (cb, value, meta) => {
              const input = document.createElement('input')
              input.setAttribute('type', 'file')
              input.setAttribute('accept', 'image/*')
              input.onchange = (e: HTMLInputEvent) => {
                const file = e.target.files[0]
                const reader: any = new FileReader()
                reader.onload = () => {
                  const id = `blobid ${(new Date()).getTime()}`
                  const blobCache = tinymce.activeEditor.editorUpload.blobCache
                  const base64 = reader.result.split(',')[1]
                  const blobInfo = blobCache.create(id, file, base64)
                  blobCache.add(blobInfo)
                  cb(blobInfo.blobUri(), { title: file.name })
                }
                reader.readAsDataURL(file)
              }

              input.click()
            }

          }}
          onEditorChange={handlePostContent}
        />

        <PostCategoryDropDown handlePostCategory={handlePostCategory}/>

        <input
          type="checkbox"
          name="status"
          id="status"
          value="1"
          onChange={handleStatus}/>

        <input
          type="checkbox"
          name="featured"
          id="featured" value="1"
          onChange={handleFeatured} />

        <button
          type="submit"
          onClick={handleSubmit}
        >
            Enviar
        </button>
      </form>
    </div>
  )
}
export default PostCreate
