import './index.css'

const CheckBoxItem = props => {
  const {CheckDetails} = props
  const {employmentTypeId, label} = CheckDetails
  return (
    <li className="item-1">
      <input type="checkbox" id={employmentTypeId} />
      <label htmlFor={employmentTypeId} className="check-label">
        {label}
      </label>
    </li>
  )
}
export default CheckBoxItem
