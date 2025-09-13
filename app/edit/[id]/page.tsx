'use client'

import React, { use, useEffect, useState } from 'react'
import axios from 'axios'
import { useRouter } from 'next/navigation'

type Params = Promise<{ id: string }>

const Edit = ({ params }: { params: Params }) => {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [categoryId, setCategoryId] = useState('')
  const [categories, setCategories] = useState([])
  const [imageUrl, setImageUrl] = useState('')
  const [file, setFile] = useState<File | null>(null)

  const router = useRouter()
  const { id } = use(params)

  const fetchPost = async (id: string) => {
    try {
      const response = await axios.get(`/api/posts/${id}`)
      setTitle(response.data.title)
      setContent(response.data.content)
      setCategoryId(response.data.categoryId)
      setImageUrl(response.data.imageUrl)
    } catch (error) {
      console.error('error', error)
      alert('Failed to fetch post')
    }
  }

  const fetchCategories = async () => {
    try {
      const response = await axios.get(`/api/categories`)
      setCategories(response.data)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    if (id) {
      fetchPost(id)
    }
    fetchCategories()

  }, [])

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    formData.append("categoryId", categoryId.toString());
    if (file) {
      formData.append('file', file)
    }
    try {
      await axios.put(`/api/posts/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      router.push('/')
    } catch (error) {
      console.error('error', error)
      alert('Failed to create post')
    }
    console.log({ title, content })
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-semibold mb-6">Edit Post {id}</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700"
          >
            Title
          </label>
          <input
            type="text"
            name="title"
            id="title"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>
        <div>
          <label
            htmlFor="content"
            className="block text-sm font-medium text-gray-700"
          >
            Content
          </label>
          <textarea
            name="content"
            id="content"
            required
            rows={4}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          ></textarea>
        </div>
        <div>
          <label>Category</label>
          <select
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
          >
            <option value="">Select a category</option>
            {/* Example static categories, replace or populate dynamically */}
            {categories.map((cat: any) => (
              <option key={cat.id} value={cat.id}>{cat.name}</option>
            ))}
          </select>
        </div>
        <div>
          <div>Current Image:</div>
          {imageUrl && <img src={imageUrl} alt="Current" className="w-32 h-32 object-cover mb-2" />}
          <label
            htmlFor="file"
            className="block text-sm font-medium text-gray-700"
          >
            Upload New Image
          </label>
          <input
            type="file"
            name="file"
            accept="image/*"
            required
            onChange={(e) => setFile(e.target.files?.[0] || null)}
          />
        </div>
        <div>
          <button
            type="submit"
            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Update
          </button>
        </div>
      </form>
    </div>
  )
}

export default Edit