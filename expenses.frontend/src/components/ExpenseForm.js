import { React, useState, useEffect } from 'react';
import { Form, Row, Col, Button } from "react-bootstrap";
import { EditExpense, NewExpense, DeleteExpense } from '../services/expenses';
import { useDispatch } from 'react-redux';

export default ({ expense, setIsEditing }) => {
    const descriptions = ['Groceries', 'Credit Card', 'Student Loans', 'Eating out', 'Gas'];
    const [amount, setAmount] = useState(0);
    const [description, setDescription] = useState(descriptions[0]);
    const [isNewExpense, setIsNewExpense] = useState(true);
    const dispatch = useDispatch();

    useEffect(() => {
        if(expense !== undefined) {
            setIsNewExpense(false);
            setAmount(expense.amount);
        }
        else {
            setIsNewExpense(true);
        }
    }, [expense]);

    return <Form
        onSubmit={event => {
            event.preventDefault();
            if(isNewExpense) {
                // create new expense
                NewExpense(dispatch, {description: description, amount: amount});
            }
            else {
                // edit expense
                EditExpense(dispatch, {id: expense.id, description: description, amount: amount});
                setIsEditing(false);

            }
        }}
    >
        <Row>
            <div className="d-flex flex-row bd-highlight mb-3">
                <Col>
                    <Form.Label>Description</Form.Label>
                    <Form.Control as='select'
                        onChange={event => setDescription(event.target.value)}>
                        {descriptions.map(d => <option>{d}</option>)}
                    </Form.Control>
                </Col>
                <Col>
                    <Form.Label>Amount</Form.Label>
                    <Form.Control type='number' step='0.01'
                        placeholder={amount}
                        onChange={event => setAmount(event.target.value)} />

                </Col>
                
                <div class="d-flex align-items-end">
                    {isNewExpense
                        ? (<Button style={{ marginRight: '2px'}} className="p-2 bd-highlight" variant='primary' type='submit'>Add</Button>)
                        : (<div>
                            <Button style={{ marginRight: '2px'}} className="p-2 bd-highlight" variant='danger' onClick={() => DeleteExpense(dispatch, expense)}>Delete</Button>
                            <Button style={{ marginRight: '2px'}} className="p-2 bd-highlight" variant='success' type='submit'>Save</Button>
                            <Button style={{ marginRight: '2px'}} className="p-2 bd-highlight" variant='default' onClick={() => setIsEditing(false)}>Cancel</Button>
                        </div>)}
                </div>
            </div>
        </Row>
    </Form>
}