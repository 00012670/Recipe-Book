import { Action } from '@ngrx/store';
import { Ingredient } from '../../shared/ingredient.model';
import * as ShoppingListActions from './shopping-list.actions';
import { retry } from 'rxjs';

export interface State {
  ingredients: Ingredient[];
  editedIngredient: Ingredient;
  editedIngredientIndex: number;
}

const initialState: State = {
  ingredients: [
    new Ingredient('Apples', 5),
    new Ingredient('Tomatoes', 10),
  ],
  editedIngredient: { name: '', amount: 0 },
  editedIngredientIndex: -1
};

export function shoppingListReducer(
  state: State = initialState,
  action: Action
): State {
  switch (action.type) {
    case ShoppingListActions.ADD_INGREDIENT:
      return {
        ...state,
        ingredients: [...state.ingredients, (action as ShoppingListActions.AddIngredient).payload],
      };
    case ShoppingListActions.ADD_INGREDIENTS:
      return {
        ...state,
        ingredients: [...state.ingredients, ...(action as ShoppingListActions.AddIngredients).payload],
      };
    case ShoppingListActions.UPDATE_INGREDIENT:
      const updatedIngredients = state.ingredients.map((ingredient, index) => {
        if (index === state.editedIngredientIndex) {
          return {
            ...ingredient,
            ...(action as ShoppingListActions.UpdateIngredient).payload,
          };
        }
        return ingredient;
      });
      return {
        ...state,
        ingredients: updatedIngredients,
        editedIngredient: { name: '', amount: 0 },
        editedIngredientIndex: -1
      };
    case ShoppingListActions.DELETE_INGREDIENT:
      return {
        ...state,
        ingredients: state.ingredients.filter((_, igIndex) => igIndex !== state.editedIngredientIndex),
      };
    case ShoppingListActions.START_EDIT:
      return {
        ...state,
        editedIngredientIndex: (action as ShoppingListActions.StartEdit).payload,
        editedIngredient: { ...state.ingredients[(action as ShoppingListActions.StartEdit).payload] }
      };
    case ShoppingListActions.STOP_EDIT:
      return {
        ...state,
        editedIngredient: { name: '', amount: 0 },
        editedIngredientIndex: -1
      };
    default:
      return state;
  }
}