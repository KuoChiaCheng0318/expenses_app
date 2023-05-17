import {
    setExpenses, newExpense, editExpense, deleteExpense, 
    setExpensesError, editExpenseError, newExpenseError, deleteExpenseError
} from '../app/expensesSlice';

import axios from 'axios';


const axiosInstance = axios.create({    
    baseURL: 'https://localhost:44332/Expenses',
})

export const GetExpenses = async (dispatch) => {
    try {
        // api call
        const { data } = await axiosInstance.get();
        dispatch(setExpenses(data));
    } catch (error) {
        console.log("Error:", error);
        dispatch(setExpensesError());
    }
}

export const NewExpense = async (dispatch, expense) => {
    try {
        // api call
        const { data } = await axiosInstance.post('', expense);
        dispatch(newExpense(data));
    } catch (error) {
        console.log("Error:", error);
        dispatch(newExpenseError());
    }
}

export const EditExpense = async (dispatch, expense) => {
    try {
        // api call
        await axiosInstance.put('', expense);
        dispatch(editExpense(expense));
    } catch (error){
        console.log("Error:", error);
        dispatch(editExpenseError());
    }
}

export const DeleteExpense = async (dispatch, expense) => {
    try {
        // api call
        await axiosInstance.delete('', { data: { ...expense } });
        dispatch(deleteExpense(expense));
    } catch (error) {
        console.log("Error:", error);
        dispatch(deleteExpenseError());
    }
}


