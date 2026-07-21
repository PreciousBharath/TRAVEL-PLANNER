
import React from 'react'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from 'recharts'

const data = [
  { month: 'Jan', expense: 33200 },
  { month: 'Feb', expense: 58100 },
  { month: 'Mar', expense: 41500 },
  { month: 'Apr', expense: 74700 }
]

const formatRupees = (value) => `₹${Number(value).toLocaleString('en-IN')}`

const ExpenseChart = () => {
  return (
    <div className="chart-box">
      <h2>Travel Expenses</h2>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <XAxis dataKey="month" />
          <YAxis tickFormatter={formatRupees} width={82} />
          <Tooltip formatter={(value) => [formatRupees(value), 'Expense']} />
          <Line typeI="monotone" dataKey="expense" stroke="#38bdf8" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

export default ExpenseChart
