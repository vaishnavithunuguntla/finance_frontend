import React, { useState, useEffect } from 'react';
import api from './api';
import './App.css';

const App = () => {
  const [transactions, setTransactions] = useState([]);
  const [formData, setFormData] = useState({
    amount: '',
    category: '',
    description: '',
    is_income: false,
    date: ''
  });

  const fetchTransactions = async () => {
    const response = await api.get('/transactions/');
    setTransactions(response.data);
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  const handleInputChange = (event) => {
    const value =
      event.target.type === 'checkbox'
        ? event.target.checked
        : event.target.value;
    setFormData({
      ...formData,
      [event.target.name]: value
    });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    await api.post('/transactions/', formData);
    fetchTransactions();
    setFormData({
      amount: '',
      category: '',
      description: '',
      is_income: false,
      date: ''
    });
  };

  return (
    <div>
      <nav className="navbar navbar-dark bg-primary">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            Finance App
          </a>
        </div>
      </nav>

      {/* Form box with glow */}
      <div className="container my-4">
        <div className="p-4 rounded shadow-sm form-box">
          <form onSubmit={handleFormSubmit}>
            <div className="mb-3">
              <label htmlFor="amount" className="form-label">Amount</label>
              <input
                type="text"
                className="form-control"
                id="amount"
                name="amount"
                onChange={handleInputChange}
                value={formData.amount}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="category" className="form-label">Category</label>
              <input
                type="text"
                className="form-control"
                id="category"
                name="category"
                onChange={handleInputChange}
                value={formData.category}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="description" className="form-label">Description</label>
              <input
                type="text"
                className="form-control"
                id="description"
                name="description"
                onChange={handleInputChange}
                value={formData.description}
              />
            </div>

            <div className="mb-3 form-check">
              <input
                type="checkbox"
                className="form-check-input"
                id="is_income"
                name="is_income"
                onChange={handleInputChange}
                checked={formData.is_income}
              />
              <label htmlFor="is_income" className="form-check-label">Income?</label>
            </div>

            <div className="mb-3">
              <label htmlFor="date" className="form-label">Date</label>
              <input
                type="date"
                className="form-control"
                id="date"
                name="date"
                onChange={handleInputChange}
                value={formData.date}
              />
            </div>

            <button type="submit" className="btn btn-primary">Submit</button>
          </form>
        </div>
      </div>

      {/* Table with spacing above */}
      <div className="container my-5">
        <table className="table table-striped table-bordered table-hover">
          <thead className="table-primary">
            <tr>
              <th>Amount</th>
              <th>Category</th>
              <th>Description</th>
              <th>Income?</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction) => (
              <tr key={transaction.id}>
                <td>{transaction.amount}</td>
                <td>{transaction.category}</td>
                <td>{transaction.description}</td>
                <td>{transaction.is_income ? 'Yes' : 'No'}</td>
                <td>{transaction.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default App;

