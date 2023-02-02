import {Component} from 'react'

import Header from '../Header'

import ProfileContainer from '../ProfileContainer'
import JobsContainer from '../JobsContainer'

import './index.css'

class Jobs extends Component {
  state = {employTypeList: []}

  employTypeCheckbox = list => {
    this.setState({employTypeList: list})
  }

  render() {
    const {employTypeList} = this.state
    // console.log(employTypeList)
    return (
      <>
        <Header />
        <div className="bottom-container">
          <ProfileContainer employTypeCheckbox={this.employTypeCheckbox} />
          <JobsContainer listType={employTypeList} />
        </div>
      </>
    )
  }
}

export default Jobs
