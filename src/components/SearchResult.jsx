import React, { useEffect, useState } from 'react'
import blogService from '../services/blogService'
import { BlogCard, Container, BlogCardSkeleton } from '../components'
import { useSelector, useDispatch } from 'react-redux'
import { clearSearchQuery } from '../features/searchSlice'
import { useLocation } from 'react-router-dom'

const SearchResult = () => {
  const dispatch = useDispatch()
  const location = useLocation()
  const query = useSelector((state) => state.search.query)

  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(false)


  useEffect(() => {
    const fetch = async () => {
      setLoading(true)
      try {
        const response = await blogService.getAllBlog()
        const blogs = response?.documents || []

        const filtered = blogs.filter(blog =>
          blog.title.toLowerCase().includes(query.toLowerCase())
        )

        setResults(filtered)
      } catch (err) {
        console.error("Search error:", err)
      } finally {
        setLoading(false)
      }
    }

    if (query.trim()) {
      fetch()
    } else {
      setResults([])
    }
  }, [query])

  if (loading) {
    return (
      <Container className="py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, index) => (
            <BlogCardSkeleton key={index} />
          ))}
        </div>
      </Container>
    )
  }

  if (!results.length) {
    return (
      <p className="text-center mt-10 text-gray-500 text-xl">
        No blog found for "<span className="font-semibold">{query}</span>"
      </p>
    )
  }

  return (
    <Container className="py-12">
      <div className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {results.map(blog => (
          <BlogCard key={blog.$id} {...blog} />
        ))}
      </div>
    </Container>
  )
}

export default SearchResult
