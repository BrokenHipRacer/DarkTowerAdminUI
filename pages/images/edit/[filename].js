import { Component } from "react"
import Head from "next/head"

import Header from "../../../components/header.js"
import Sidebar from "../../../components/sidebar.js"
import DeleteImageModal from "../../../components/modals/deleteImage.js"

import getImageByFilename from "../../../api/images/getImageByFilename.js"
import checkIfImageFilenameExists from "../../../api/images/checkIfImageFilenameExists.js"
import updateImageFilename from "../../../api/images/updateImageFilename.js"
import deleteImage from "../../../api/images/deleteImage.js"

export default class extends Component {
  static async getInitialProps ({req, res, query}) {
    const apiResult = await getImageByFilename(query.filename, req)

    if (!apiResult.authSuccess) {
      res.writeHead(302, { Location: "/login" })
      res.end()
    }

    return {
      notFoundError: apiResult && apiResult.notFoundError,
      fileSize: apiResult && apiResult.fileSize,
      fileCreated: apiResult && apiResult.fileCreated,
      filename: apiResult && apiResult.filename
    }
  }

  constructor(props) {
    super(props)
    this.state = {
      //update filename
      filenameInputValue: this.props.filename,
      updateLoading: false,
      updateSubmitError: false,
      filenameAlreadyExistsError: false,
      updateSuccess: false,
      //delete image
      showDeleteImageModal: false,
      deleteLoading: false,
      deleteError: false
    }
  }

  updateFilenameInputValue = (event) => {
    this.setState({filenameInputValue: event.target.value})
  }

  submitUpdateRequest = () => {
    if (!this.state.filenameInputValue) {
      this.setState({updateSubmitError: true, updateSuccess: false})
    } else {
      this.setState({updateLoading: true, updateSuccess: false})

      const self = this

      checkIfImageFilenameExists(this.state.filenameInputValue, function(existsResponse) {
        if (!existsResponse.success) {
          self.setState({updateSubmitError: false, filenameAlreadyExistsError: true, updateSuccess: false, updateLoading: false})
        } else {
          updateImageFilename(self.props.filename, self.state.filenameInputValue, function(response) {
            if (response.submitError) {
              self.setState({updateSubmitError: true, filenameAlreadyExistsError: false, updateSuccess: false, updateLoading: false})
            } else if (!response.authSuccess) {
              window.location.href = "/login"
            } else if (!response.success) {
              self.setState({updateSubmitError: true, filenameAlreadyExistsError: false, updateSuccess: false, updateLoading: false})
            } else {
              self.setState({updateLoading: false})
              window.location.href = `/images/edit/${self.state.filenameInputValue}`
            }
          })
        }
      })
    }
  }

  hideDeleteImageModal = () => {
    this.setState({showDeleteImageModal: false, deleteLoading: false, deleteError: false})
  }

  showDeleteImageModal = () => {
    this.setState({showDeleteImageModal: true})
  }

  deleteImageRequest = () => {
    this.setState({deleteLoading: true, deleteError: false})

    const self = this

    deleteImage(this.props.filename, function(response) {
      if (response.submitError) {
        self.setState({deleteLoading: false, deleteError: true})
      } else if (!response.authSuccess) {
        window.location.href = "/login"
      } else if (!response.success) {
        self.setState({deleteLoading: false, deleteError: true})
      } else {
        window.location.href = "/images"
      }
    })
  }

  render () {
    return (
      <div className="layout-wrapper">
        <Header />
        <Sidebar page="images" />
        <div className="layout-content-container">
          {
            !this.props.notFoundError ?
            <div className="images-edit-content">
              <div className="images-edit-header">
                <span>Image Details</span>
              </div>
              <div className="images-edit-metadata-container">
                <div className="images-edit-metadata-title">
                  <span>Metadata</span>
                </div>
                <div className="images-edit-metadata-items">
                  <div className="images-edit-metadata-item">
                    <div className="images-edit-metadata-item-label">
                      <span>Filename:</span>
                    </div>
                    <div className="images-edit-metadata-item-data">
                      <span>{this.props.filename}</span>
                    </div>
                  </div>
                  <div className="images-edit-metadata-item">
                    <div className="images-edit-metadata-item-label">
                      <span>File size:</span>
                    </div>
                    <div className="images-edit-metadata-item-data">
                      <span>{this.props.fileSize}</span>
                    </div>
                  </div>
                  <div className="images-edit-metadata-item">
                    <div className="images-edit-metadata-item-label">
                      <span>Created:</span>
                    </div>
                    <div className="images-edit-metadata-item-data">
                      <span>{this.props.fileCreated}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="images-edit-form-container">
                <div className="images-edit-form-title">
                  <span>Edit Filename</span>
                </div>
                <div className="images-edit-form-section">
                  <div className="images-edit-form-section-label">
                    <span>Filename</span>
                  </div>
                  <div className="images-edit-form-section-input">
                    <input
                      type="text"
                      value={this.state.filenameInputValue}
                      onChange={this.updateFilenameInputValue}
                    />
                  </div>
                </div>
                <div className="images-edit-page-submit-btn-section">
                  <div className="images-edit-form-btn-container">
                    {
                      !this.state.updateLoading ?
                      <div onClick={this.submitUpdateRequest} className="images-edit-form-btn">
                        <span>Update</span>
                      </div> :
                      <div className="images-edit-form-btn loading">
                        <span>Loading</span>
                      </div>
                    }
                  </div>
                  {
                    this.state.updateSubmitError ?
                    <div className="images-edit-submit-error-msg">
                      <span>An error occurred.</span>
                    </div> : null
                  }
                  {
                    this.state.filenameAlreadyExistsError ?
                    <div className="images-edit-submit-error-msg">
                      <span>Filename already exists!</span>
                    </div> : null
                  }
                  {
                    this.state.updateSuccess ?
                    <div className="images-edit-submit-success-msg">
                      <span>Success!</span>
                    </div> : null
                  }
                </div>
              </div>
              <div className="images-edit-delete-container">
                <div className="images-edit-delete-title">
                  <span>Delete Image</span>
                </div>
                <div className="images-edit-delete-subtitle">
                  <span>This will remove the image from the server. Before deleting, ensure this image is not being used anywhere.</span>
                </div>
                <div className="images-edit-delete-btn-container">
                  <div onClick={this.showDeleteImageModal} className="images-edit-delete-btn">
                    <span>Delete</span>
                  </div>
                </div>
              </div>
            </div> :
            <div className="images-edit-get-data-error-msg">
              <span>Image not found.</span>
            </div>
          }
        </div>
        <DeleteImageModal
          error={this.state.deleteError}
          loading={this.state.deleteLoading}
          show={this.state.showDeleteImageModal}
          hideRequest={this.hideDeleteImageModal}
          deleteRequest={this.deleteImageRequest}
        />
      </div>
    )
  }
}
