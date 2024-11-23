import React, { useState, useEffect } from 'react';
import { supabase } from '../supabase';

const ExpenseTracker = () => {
  const [expenses, setExpenses] = useState([]);
  const [newExpense, setNewExpense] = useState({ description: '', amount: 0 });

  const fetchExpenses = async () => {
    const { data, error } = await supabase.from('expenses').select('*');
    if (error) console.error(error);
    else setExpenses(data);
  };

  const addExpense = async () => {
    if (!newExpense.description || !newExpense.amount) return;
    const { error } = await supabase.from('expenses').insert([newExpense]);
    if (error) console.error(error);
    else {
      setNewExpense({ description: '', amount: 0 });
      fetchExpenses();
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Your Expenses</h2>
      <ul className="mb-4">
        {expenses.map((expense) => (
          <li key={expense.id} className="flex justify-between border-b py-2">
            <span>{expense.description}</span>
            <span>${expense.amount}</span>
          </li>
        ))}
      </ul>
      <div className="space-y-2">
        <input
          type="text"
          placeholder="Expense Description"
          value={newExpense.description}
          onChange={(e) => setNewExpense({ ...newExpense, description: e.target.value })}
          className="w-full p-2 border border-gray-300 rounded"
        />
        <input
          type="number"
          placeholder="Amount"
          value={newExpense.amount}
          onChange={(e) => setNewExpense({ ...newExpense, amount: Number(e.target.value) })}
          className="w-full p-2 border border-gray-300 rounded"
        />
        <button
          onClick={addExpense}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Add Expense
        </button>
      </div>
    </div>
  );
};

export default ExpenseTracker;
