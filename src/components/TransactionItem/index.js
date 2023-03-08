import './index.css'

const TransactionItem = props => {
  const {details} = props
  const {optionId, displayText} = details

  return <option value={optionId}>{displayText}</option>
}

export default TransactionItem
