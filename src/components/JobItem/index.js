import './index.css'
import {AiFillStar} from 'react-icons/ai'
import {MdLocationOn} from 'react-icons/md'
import {BsFillBriefcaseFill} from 'react-icons/bs'

const JobItem = props => {
  const {JobDetails} = props
  const {
    companyLogo,
    jobType,
    description,
    location,
    salPackage,
    rating,
    jobTitle,
  } = JobDetails
  return (
    <li className="job-item">
      <div className="job-logo-container">
        <img src={companyLogo} alt="company logo" className="company-logo" />
        <div className="role-container">
          <h1 className="job-title">{jobTitle}</h1>
          <div className="rating-container">
            <AiFillStar className="rating-icon" />
            <p className="rating">{rating}</p>
          </div>
        </div>
      </div>
      <div className="sal-container">
        <div className="second-container">
          <div className="second-container">
            <MdLocationOn className="location-icon" />
            <p className="location">{location}</p>
          </div>
          <div className="second-container-2">
            <BsFillBriefcaseFill className="location-icon" />
            <p className="location">{jobType}</p>
          </div>
        </div>
        <p className="salary-pack">{salPackage}</p>
      </div>
      <hr />
      <div className="bio-contain">
        <h1 className="description-head">Description</h1>
        <p className="description">{description}</p>
      </div>
    </li>
  )
}
export default JobItem
