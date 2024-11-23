import { useState, useEffect } from 'react';
import { supabase } from '../supabase';

const ExpenseTracker = () => {
  const [expenses, setExpenses] = useState([]);
  const [income, setIncome] = useState(0);

  useEffect(() => {
    fetchExpenses();
  }, []);

  const fetchExpenses = async () => {
    const { data, error } = await supabase.from('expenses').select('*');
    if (error) console.error(error);
    else setExpenses(data);
  };

  const addExpense = async (description, amount) => {
    const { data, error } = await supabase
      .from('expenses')
      .insert([{ description, amount }]);
    if (error) console.error(error);
    else setExpenses([...expenses, data[0]]);
  };

  return (
    <div>
      <h1>Expense Tracker</h1>
      <p>Income: ${income}</p>
      <p>Total Expenses: ${expenses.reduce((sum, e) => sum + e.amount, 0)}</p>
      {/* Render Expenses and Input Form */}
    </div>
  );
};

export default ExpenseTracker;
