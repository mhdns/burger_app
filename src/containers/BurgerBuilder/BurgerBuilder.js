import React, { Component } from 'react';
import Aux from "../../hoc/Aux";
import Burger from '../../components/Burger/Burger';
import BurgerControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';

const INGREDIENT_PRICE = {
    "salad": 0.5,
    "meat": 1.3,
    "cheese": 0.6,
    "bacon": 0.7
};

class BurgerBuilder extends Component {
    state = {
        ingredients : {
            salad: 1,
            cheese: 1,
            bacon: 1,
            meat: 1
        },
        totalPrice: 7.1,
        purchasable: true,
        purchasing: false
    }

    updatePurchaseState = (ingredients) => {
        const sum = Object.keys(ingredients).map(
             igKey => {
                return ingredients[igKey];
            }).reduce((sum, el) => {
                return sum + el;
            }, 0);
        this.setState({purchasable: sum > 0}); 
    };

    addIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount + 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount;
        const ingredientPrice = INGREDIENT_PRICE[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + ingredientPrice;
        
        this.setState({totalPrice: newPrice, ingredients: updatedIngredients});
        this.updatePurchaseState(updatedIngredients);
    };

    removeIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        if (oldCount === 0) {
            return
        };
        const newCount = oldCount - 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = newCount;

        const newPrice = this.state.totalPrice - INGREDIENT_PRICE[type];

        this.setState({totalPrice: newPrice, ingredients: updatedIngredients});
        this.updatePurchaseState(updatedIngredients);
    };

    purchaseHandler = () => {
        this.setState({purchasing: true});
    };

    purchaseCancelled = () => {
        this.setState({purchasing: false});
    };

    purchaseContinued = () => {
        alert('You Continued!');
    }
        

    render () {
        const disabledInfo = {
            ...this.state.ingredients
        };

        for (let key in disabledInfo){
            disabledInfo[key]= disabledInfo[key] <= 0;
        };

        return (
            <Aux>
                <Modal show={ this.state.purchasing } cancelled = { this.purchaseCancelled }>
                    <OrderSummary 
                    price = {this.state.totalPrice}
                    purchaseCancelled = { this.purchaseCancelled }
                    purchaseContinued = { this.purchaseContinued }
                    ingredients = { this.state.ingredients }/>
                </Modal>
                <Burger ingredients= { this.state.ingredients } />
                <BurgerControls 
                price = { this.state.totalPrice }
                ingredientAdded = { this.addIngredientHandler }
                ingredientRemoved = { this.removeIngredientHandler }
                disabled = { disabledInfo }
                purchasable = { this.state.purchasable }
                ordered = { this.purchaseHandler }/>
            </Aux>
        );
    }
}

export default  BurgerBuilder;