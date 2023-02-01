import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'

import './index.css'

import CheckBoxItem from '../CheckBoxItem'
import RadioItem from '../RadioItem'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  // inProgress: 'IN_PROGRESS',
}

class ProfileContainer extends Component {
  state = {
    profileName: '',
    profileImage: '',
    bio: '',
    userApiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getProfileData()
  }

  getProfileData = async () => {
    this.setState({
      userApiStatus: apiStatusConstants.inProgress,
    })
    const jwtToken = Cookies.get('jwt_token')

    const userUrl = 'https://apis.ccbp.in/profile'
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(userUrl, options)
    if (response.ok === true) {
      const fetchedData = await response.json()
      const userDetails = fetchedData.profile_details
      this.setState({
        profileName: userDetails.name,
        profileImage: userDetails.profile_image_url,
        bio: userDetails.short_bio,
        userApiStatus: apiStatusConstants.success,
      })
    }
    if (response.status === 401) {
      this.setState({
        userApiStatus: apiStatusConstants.failure,
      })
    }
  }

  renderLoadingView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderProfileView = () => {
    const {profileName, profileImage, bio} = this.state
    return (
      <>
        <div className="profile">
          <img src={profileImage} className="pic" alt="profile" />
          <h1 className="name">{profileName}</h1>
          <p className="role">{bio}</p>
        </div>
      </>
    )
  }

  renderProfileFailureView = () => (
    <>
      <button className="retry" type="button">
        Retry
      </button>
    </>
  )

  getProfileJsx = () => {
    const {userApiStatus} = this.state
    switch (userApiStatus) {
      case apiStatusConstants.success:
        return this.renderProfileView()
      case apiStatusConstants.failure:
        return this.renderProfileFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    // console.log(profileName, profileImage, bio)
    return (
      <div className="profile-container">
        {this.getProfileJsx()}
        <hr />
        <h1 className="heading-2">Type of Employment</h1>
        <ul className="check-list">
          {employmentTypesList.map(item => (
            <CheckBoxItem key={item.employmentTypeId} CheckDetails={item} />
          ))}
        </ul>

        <hr />

        <h1 className="heading-2">Salary Range</h1>
        <ul className="check-list">
          {salaryRangesList.map(item => (
            <RadioItem key={item.salaryRangeId} salaryDetails={item} />
          ))}
        </ul>
      </div>
    )
  }
}
export default ProfileContainer
