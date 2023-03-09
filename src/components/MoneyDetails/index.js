import './index.css'

const MoneyDetails = props => {
  const {details, deleteHistory} = props
  const {id, title, amount, type} = details

  const deeteItem = () => {
    deleteHistory(id, type, amount)
  }
  return (
    <li className="his-item">
      <p className="point">{title}</p>
      <p className="point">Rs {amount}</p>
      <p className="sp">{type}</p>
      <button
        data-testid="delete"
        onClick={deeteItem}
        type="button"
        className="img-but"
      >
        <img
          className="img"
          src="https://assets.ccbp.in/frontend/react-js/money-manager/delete.png"
          alt="delete"
        />
      </button>
    </li>
  )
}

export default MoneyDetails
