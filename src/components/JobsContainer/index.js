import {Component} from 'react'
import {BsSearch} from 'react-icons/bs'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'

import JobItem from '../JobItem'

import './index.css'
/* API: https://apis.ccbp.in/jobs
Example: https://apis.ccbp.in/jobs?employment_type=FULLTIME,PARTTIME&minimum_package=1000000&search=
Method: GET */

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}
class JobsContainer extends Component {
  state = {
    jobsList: [],
    josApiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getRequiredJobs()
  }

  getRequiredJobs = async () => {
    const {listType} = this.props
    console.log(listType)
    this.setState({
      josApiStatus: apiStatusConstants.inProgress,
    })
    const jwtToken = Cookies.get('jwt_token')
    const jobsUrl = 'https://apis.ccbp.in/jobs'
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(jobsUrl, options)

    if (response.ok) {
      const fetchedData = await response.json()
      const updatedData = fetchedData.jobs.map(job => ({
        companyLogo: job.company_logo_url,
        jobType: job.employment_type,
        jobId: job.id,
        description: job.job_description,
        location: job.location,
        salPackage: job.package_per_annum,
        rating: job.rating,
        jobTitle: job.title,
      }))
      this.setState({
        jobsList: updatedData,
        josApiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({
        josApiStatus: apiStatusConstants.failure,
      })
    }
  }

  renderListOfJobs = () => {
    const {jobsList} = this.state
    return (
      <>
        <ul className="job-list-items">
          {jobsList.map(item => (
            <JobItem key={item.id} JobDetails={item} />
          ))}
        </ul>
      </>
    )
  }

  renderFailure = () => (
    <>
      <div className="failure-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
          alt="failure view"
          className="failure-image"
        />
        <h1 className="failure-heading">Oops! Something Went Wrong</h1>
        <p className="failure-para">
          We cannot seem to find the page you are looking for
        </p>
        <button className="retry" type="button">
          Retry
        </button>
      </div>
    </>
  )

  renderJobsLoadingView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderJobsList = () => {
    const {josApiStatus} = this.state
    switch (josApiStatus) {
      case apiStatusConstants.success:
        return this.renderListOfJobs()
      case apiStatusConstants.failure:
        return this.renderFailure()
      case apiStatusConstants.inProgress:
        return this.renderJobsLoadingView()
      default:
        return null
    }
  }

  render() {
    //  const {josApiStatus, jobsList} = this.state

    return (
      <div className="jobs-container">
        <div className="search-input-container">
          <input type="search" className="search-input" placeholder="Search" />
          <button
            type="button"
            data-testid="searchButton"
            className="search-button"
          >
            <BsSearch className="search-icon" />
          </button>
        </div>
        {this.renderJobsList()}
      </div>
    )
  }
}
export default JobsContainer
