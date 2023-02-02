import './index.css'

const CheckBoxItem = props => {
  const {CheckDetails, employmentChecked} = props
  const {employmentTypeId, label} = CheckDetails
  const onChangeEmployment = () => {
    employmentChecked(employmentTypeId)
  }
  return (
    <li className="item-1">
      <input
        type="checkbox"
        id={employmentTypeId}
        // checked={employmentTypeId}
        onChange={onChangeEmployment}
      />
      <label htmlFor={employmentTypeId} className="check-label">
        {label}
      </label>
    </li>
  )
}
export default CheckBoxItem
