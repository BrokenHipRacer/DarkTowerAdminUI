import { Component } from "react"
import Head from "next/head"

import Header from "../../components/header.js"
import Sidebar from "../../components/sidebar.js"

import getAllImages from "../../api/images/getAllImages.js"

export default class extends Component {
  static async getInitialProps ({req, res}) {
    const apiResult = await getAllImages(req)

    if (!apiResult.authSuccess) {
      res.writeHead(302, { Location: "/login" })
      res.end()
    }

    return {
      images: apiResult && apiResult.files,
      getDataError: apiResult && apiResult.getDataError
    }
  }

  render () {
    return (
      <div className="layout-wrapper">
        <Head>
          <title>All Images | Admin</title>
        </Head>
        <Header />
        <Sidebar page="images" />
        <div className="layout-content-container">
          {
            !this.props.getDataError ?
            <div className="images-content">
              <div className="images-top-header">
                <div className="images-page-header-label">
                  <span>All Images</span>
                </div>
                <div className="images-add-new-btn-container">
                  <a href="/images/upload">
                    <div className="images-add-new-btn">
                      <span>+ Upload</span>
                    </div>
                  </a>
                </div>
              </div>
              <div className="images-list-container">
                <div className="images-list-items-table">
                  <div className="images-list-items-table-header">
                    <div className="images-list-items-table-header-item filename">
                      <span>Filename</span>
                    </div>
                    <div className="images-list-items-table-header-item link">
                      <span>Link</span>
                    </div>
                    <div className="images-list-items-table-header-item edit">
                      <span></span>
                    </div>
                  </div>
                  {
                    this.props.images.map((image, index) => {
                      return (
                        <div key={index} className="images-list-items-table-item">
                          <div className="images-list-items-table-item-data filename">
                            <span>{image}</span>
                          </div>
                          <div className="images-list-items-table-item-data link">
                            {
                              process.env.NODE_ENV === "development" ?
                              <a href={`${process.env.DEV_FRONTEND_API_URL}/assets/${image}`}>
                                <span>Link</span>
                              </a> :
                              <a href={`${process.env.PRODUCTION_FRONTEND_API_URL}/assets/${image}`}>
                                <span>Link</span>
                              </a>
                            }
                          </div>
                          <div className="images-list-items-table-item-data edit">
                            <a href={`/images/edit/${image}`}>
                              <span>Edit</span>
                            </a>
                            <span> &gt;</span>
                          </div>
                        </div>
                      )
                    })
                  }
                </div>
              </div>
            </div> :
            <div className="images-get-data-error">
              <span>An error occurred.</span>
            </div>
          }
        </div>
      </div>
    )
  }
}
