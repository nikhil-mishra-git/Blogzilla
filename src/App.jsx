import React from 'react'
import { Header, Footer, Herobanner, BlogcardSection, Signup, Signin, Blogcreate } from './Components'

const App = () => {
  return (
    <>
      <Header />
      <Herobanner />
      <BlogcardSection />
      <Signup />
      <Signin />
      <Blogcreate/>
      <Footer />
    </>
  )
}

export default App