import React from 'react'

const BlogForm = ({ onSubmit, title, author, url, handleFieldChange }) => {
  return (
    <div>
    <h2>create new blog</h2>
    <form onSubmit={onSubmit}>
    title: <input type="text" name="title" value={title} onChange={handleFieldChange}/><br />
    author: <input type="text" name="author" value={author} onChange={handleFieldChange}/><br />
    url: <input type="text" name="url" value={url} onChange={handleFieldChange}/><br />
    <button type="submit">add blog</button>
    </form>
  </div>
  )
}

export default BlogForm