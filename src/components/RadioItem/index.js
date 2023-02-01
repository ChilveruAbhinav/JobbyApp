import './index.css'

const RadioItem = props => {
  const {salaryDetails} = props
  const {salaryRangeId, label} = salaryDetails
  return (
    <li className="item-2">
      <input type="radio" name="salary" id={salaryRangeId} />
      <label htmlFor={salaryRangeId} className="check-label">
        {label}
      </label>
    </li>
  )
}
export default RadioItem
