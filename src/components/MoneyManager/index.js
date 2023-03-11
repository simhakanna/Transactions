import {v4 as uuid} from 'uuid'

import {Component} from 'react'

import TransactionItem from '../TransactionItem'
import MoneyDetails from '../MoneyDetails'
import './index.css'

const transactionTypeOptions = [
  {
    optionId: 'INCOME',
    displayText: 'Income',
  },
  {
    optionId: 'EXPENSES',
    displayText: 'Expenses',
  },
]

class MoneyManager extends Component {
  state = {
    historyList: [],
    bal: 0,
    income: 0,
    exp: 0,
    textI: '',
    amountI: '',
    typeI: 'Income',
  }

  textChange = e => {
    this.setState({textI: e.target.value})
  }

  amountChange = e => {
    this.setState({amountI: parseInt(e.target.value)})
  }

  typeChange = e => {
    this.setState({
      typeI: e.target.value,
    })
    console.log(e.target.value)
  }

  addToHistory = e => {
    e.preventDefault()
    const {textI, typeI, amountI} = this.state
    const newItem = {
      id: uuid(),
      unique: uuid(),
      title: textI,
      amount: amountI,
      type: typeI,
    }

    if (textI !== '' && amountI !== '') {
      if (typeI === 'Income') {
        this.setState(prev => ({
          historyList: [...prev.historyList, newItem],
          bal: prev.bal + amountI,
          income: prev.income + amountI,
          textI: '',
          amountI: '',
        }))
      } else {
        this.setState(prev => ({
          historyList: [...prev.historyList, newItem],
          exp: prev.exp + amountI,
          bal: prev.bal - amountI,
          textI: '',
          amountI: '',
        }))
      }
    }
  }

  deleteHistory = (id, type, amount) => {
    if (type === 'Income') {
      this.setState(prev => ({
        historyList: prev.historyList.filter(each => each.id !== id),
        bal: prev.bal - amount,
        income: prev.income - amount,
        textI: '',
        amountI: '',
      }))
    } else {
      this.setState(prev => ({
        historyList: prev.historyList.filter(each => each.id !== id),
        exp: prev.exp - amount,
        bal: prev.bal + amount,
        textI: '',
        amountI: '',
      }))
    }
  }

  render() {
    const {bal, income, exp, textI, amountI, historyList} = this.state

    return (
      <div className="bg">
        <div className="name-con">
          <h1 className="u-name">Hi,Richard</h1>
          <p>
            Welcome back to your <span className="mony-m">Money Manager</span>
          </p>
        </div>
        <div className="money-bal">
          <div className="bal-con">
            <img
              className="img-b"
              src="https://assets.ccbp.in/frontend/react-js/money-manager/balance-image.png"
              alt="balance"
            />
            <div>
              <p>Your Balance</p>
              <p data-testid="balanceAmount">RS {bal}</p>
            </div>
          </div>
          <div className="bal-con inc">
            <img
              className="img-b"
              src="https://assets.ccbp.in/frontend/react-js/money-manager/income-image.png"
              alt="income"
            />
            <div>
              <p>Your Income</p>
              <p data-testid="incomeAmount">RS {income}</p>
            </div>
          </div>

          <div className="bal-con exp">
            <img
              className="img-b"
              src="https://assets.ccbp.in/frontend/react-js/money-manager/expenses-image.png"
              alt="expenses"
            />
            <div>
              <p>Your Expenses</p>
              <p data-testid="expensesAmount">RS {exp}</p>
            </div>
          </div>
        </div>

        <div className="down">
          <form onSubmit={this.addToHistory} className="transaction">
            <h3>Add Transaction</h3>
            <label className="lab" htmlFor="TITLE">
              TITLE
            </label>
            <input
              value={textI}
              onChange={this.textChange}
              className="inp"
              placeholder="TITLE"
              type="text"
              id="TITLE"
            />

            <label className="lab" htmlFor="AMOUNT">
              AMOUNT
            </label>
            <input
              value={amountI}
              onChange={this.amountChange}
              className="inp"
              placeholder="AMOUNT"
              type="number"
              id="AMOUNT"
            />

            <label className="lab" htmlFor="TYPE">
              TYPE
            </label>
            <select id="TYPE" onChange={this.typeChange} className="inp">
              {transactionTypeOptions.map(each => (
                <TransactionItem details={each} key={each.optionId} />
              ))}
            </select>
            <button type="submit" className="but">
              Add
            </button>
          </form>
          <ul className="history">
            <h3>History</h3>
            <li className="his-item">
              <p className="point m-p">Title</p>
              <p className="point m-p">Amount</p>
              <p className="sp m-p">Type</p>
            </li>
            {historyList.map(eachItem => (
              <MoneyDetails
                details={eachItem}
                key={eachItem.unique}
                deleteHistory={this.deleteHistory}
              />
            ))}
          </ul>
        </div>
      </div>
    )
  }
}

export default MoneyManager
