import React from 'react';
import Aux from '../../../hoc/Aux';
import Button from '../../UI/Button/Button'

const orderSummary = (props) => {
    const ingredientList = Object.keys(props.ingredients).map(
        igKey => { 
            return <li key={ igKey }>
                        <span style={{ textTransform: 'capitalize' }}>{ igKey }</span>: { props.ingredients[igKey] }
                    </li>; }
    );
    return ( 
        <Aux>
            <h3>Your Order</h3>
            <p>A delicious burger with the following ingredients: </p>
            <ul>
                { ingredientList }
            </ul>
            <p><strong>Total Price: { props.price.toFixed(2) }</strong></p>
            <p>Continue to Checkout?</p>
            <Button clicked={ props.purchaseCancelled } type = "Danger"><p>CANCEL</p></Button>
            <Button clicked={ props.purchaseContinued } type = "Success"><p>CONTINUE</p></Button>
        </Aux>
    )
};

export default orderSummary;