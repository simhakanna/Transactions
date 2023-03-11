import './index.css'

const TransactionItem = props => {
  const {details} = props
  const {displayText} = details

  return <option value={displayText}>{displayText}</option>
}

export default TransactionItem
