import { Component } from "react"

export default class extends Component {
  constructor(props) {
    super(props)
  }

  render () {
    return (
      <div className="sidebar-wrapper">
        <div className="sidebar-list">
          <ul>
            <a className={this.props.page === "blog-posts" ? "active" : null} href="/">
              <li>
                <span>Blog Posts</span>
              </li>
            </a>
            <a className={this.props.page === "images" ? "active" : null} href="/images">
              <li>
                <span>Images</span>
              </li>
            </a>
            <a className={this.props.page === "sitemap" ? "active" : null} href="/sitemap">
              <li>
                <span>Sitemap</span>
              </li>
            </a>
            <a className={this.props.page === "password" ? "active" : null} href="/change-password">
              <li>
                <span>Change Password</span>
              </li>
            </a>
          </ul>
        </div>
      </div>
    )
  }
}
