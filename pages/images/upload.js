import { Component } from "react"
import Head from "next/head"

import Header from "../../components/header.js"
import Sidebar from "../../components/sidebar.js"

import authUser from "../../api/admin-user/auth.js"
import checkIfImageFilenameExists from "../../api/images/checkIfImageFilenameExists.js"
import uploadImage from "../../api/images/uploadImage.js"

export default class extends Component {
  static async getInitialProps ({req, res}) {
    const authResult = await authUser(req)

    if (!authResult.success) {
      res.writeHead(302, {Location: "/login"})
      res.end()
    }

    return {}
  }

  constructor(props) {
    super(props)
    this.state = {
      selectedFile: null,
      loading: false,
      submitError: false,
      noFileError: false,
      filenameExistsError: false,
      filenameSpacesError: false,
      success: false
    }
  }

  handleInputChange = (event) => {
    this.setState({selectedFile: event.target.files[0]})
  }

  uploadImageRequest = (event) => {
    event.preventDefault()

    let formData = new FormData()
    formData.append("selectedFile", this.state.selectedFile)

    if (!this.state.selectedFile) {
      this.setState({
        loading: false,
        submitError: false,
        filenameExistsError: false,
        noFileError: true,
        filenameSpacesError: false,
        success: false
      })
    } else if (this.state.selectedFile.name.indexOf(" ") !== -1) {
      this.setState({
        loading: false,
        submitError: false,
        filenameExistsError: false,
        noFileError: false,
        filenameSpacesError: true,
        success: false
      })
    } else {
      this.setState({
        loading: true,
        submitError: false,
        filenameExistsError: false,
        noFileError: false,
        filenameSpacesError: false,
        success: false
      })

      const self = this

      checkIfImageFilenameExists(this.state.selectedFile.name, function(existsResponse) {
        if (!existsResponse.success) {
          self.setState({
            loading: false,
            submitError: false,
            filenameExistsError: true,
            noFileError: false,
            filenameSpacesError: false,
            success: false
          })
        } else {
          uploadImage(formData, function(apiResponse) {
            if (apiResponse.submitError) {
              self.setState({
                loading: false,
                submitError: true,
                filenameExistsError: false,
                noFileError: false,
                filenameSpacesError: false,
                success: false
              })
            } else if (!apiResponse.authSuccess) {
              window.location.href = "/login"
            } else if (apiResponse.noFileError) {
              self.setState({
                loading: false,
                submitError: false,
                filenameExistsError: false,
                noFileError: true,
                filenameSpacesError: false,
                success: false
              })
            } else if (!apiResponse.success) {
              self.setState({
                loading: false,
                submitError: true,
                filenameExistsError: false,
                noFileError: false,
                filenameSpacesError: false,
                success: false
              })
            } else {
              self.setState({
                loading: false,
                submitError: false,
                filenameExistsError: false,
                noFileError: false,
                filenameSpacesError: false,
                success: true
              })
            }
          })
        }
      })
    }
  }

  render () {
    return (
      <div className="layout-wrapper">
        <Head>
          <title>Upload Image | Admin</title>
        </Head>
        <Header />
        <Sidebar page="images" />
        <div className="layout-content-container">
          <div className="images-upload-content">
            <div className="images-upload-header">
              <span>Upload Image</span>
            </div>
            <div className="images-upload-form-container">
              <form onSubmit={this.uploadImageRequest}>
                <div className="images-upload-form-label">
                  <span>Choose a file:</span>
                </div>
                <input
                  type="file"
                  name="selectedFile"
                  onChange={this.handleInputChange}
                />
                <div className="images-upload-form-submit-btn-container">
                  {
                    !this.state.loading ?
                    <button className="images-upload-form-submit-btn" type="submit">Submit</button> :
                    <button className="images-upload-form-submit-btn loading">Loading</button>
                  }
                </div>
              </form>
            </div>
            {
              this.state.success ?
              <div className="images-upload-success-msg">
                <span>Success!</span>
              </div> : null
            }
            {
              this.state.submitError ?
              <div className="images-upload-error-msg">
                <span>An error occurred.</span>
              </div> : null
            }
            {
              this.state.filenameExistsError ?
              <div className="images-upload-error-msg">
                <span>Filename already exists.</span>
              </div> : null
            }
            {
              this.state.filenameSpacesError ?
              <div className="images-upload-error-msg">
                <span>Spaces need to be removed from the filename before uploading.</span>
              </div> : null
            }
            {
              this.state.noFileError ?
              <div className="images-upload-error-msg">
                <span>No file was detected.</span>
              </div> : null
            }
          </div>
        </div>
      </div>
    )
  }
}
