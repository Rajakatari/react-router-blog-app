import {Component} from 'react'

import Loader from 'react-loader-spinner'

import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'

import './index.css'

class BlogItemDetails extends Component {
  state = {
    blogDataState: {},
    isLoading: true,
  }

  componentDidMount() {
    this.getBlogItemDetails()
  }

  getBlogItemDetails = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    const response = await fetch(`https://apis.ccbp.in/blogs/${id}`)
    const blogData = await response.json()
    const blogDataCamelCase = {
      author: blogData.author,
      title: blogData.title,
      id: blogData.id,
      topic: blogData.topic,
      avatarUrl: blogData.avatar_url,
      imageUrl: blogData.image_url,
    }

    this.setState({blogDataState: blogDataCamelCase, isLoading: false})
  }

  renderBlogItemDetails = () => {
    const {blogDataState} = this.state
    console.log(blogDataState)
    const {author, title, topic, avatarUrl, imageUrl} = blogDataState

    return (
      <div className="blog-info">
        <h2 className="blog-details-title">{title}</h2>

        <div className="author-details">
          <img className="author-pic" src={avatarUrl} alt={author} />
          <p className="details-author-name">{author}</p>
        </div>

        <img className="blog-image" src={imageUrl} alt={title} />
        <p className="blog-content">{topic}</p>
      </div>
    )
  }

  render() {
    const {isLoading} = this.state

    return isLoading ? (
      <Loader type="TailSpin" width={50} height={50} color="blue" />
    ) : (
      <div className="blog-container">{this.renderBlogItemDetails()}</div>
    )
  }
}

export default BlogItemDetails
