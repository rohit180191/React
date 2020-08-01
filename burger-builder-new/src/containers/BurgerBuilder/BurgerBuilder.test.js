import React from 'react';
import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16'
import {BurgerBuilder} from './BurgerBuilder';
import BuildControls from './../../components/Burger/BuildControls/BuildControls'

configure({adapter: new Adapter()});

    describe('<BurgerBuilder/>', () =>{
        let wrapper;
        const INGREDIENT_PRICE = {
            salad:1.5,
            meat:2.3,
            cheese:2.1,
            bacon:0.9
        }
        
        const initialState = {
            ingredients : null,
            totalPrice: 0,
            ingredientPrice: INGREDIENT_PRICE,
            isBuilding: false
        }
        beforeEach(() => {
            wrapper = shallow(<BurgerBuilder burgerBuilderState={{...initialState}} loadIngredients={() => {}}/>);
        });

        it('should render BuilControls when receiving ingredients', () => {
            wrapper.setProps({burgerBuilderState: {...initialState, ingredients:{salad: 0}}});
            expect(wrapper.find(BuildControls)).toHaveLength(1);
        })
    });