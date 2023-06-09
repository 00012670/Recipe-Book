import { Action } from "@ngrx/store";
import { Recipe } from "../recipe.model";
import * as RecipesActions from './recipe.actions'

export interface State {
    recipes: Recipe[];
}

const initialState: State = {
    recipes: []
}

export function recipeReducer(
    state = initialState, 
    action: RecipesActions.RecipesActions | Action
    ): State {
    switch (action.type) {
        case RecipesActions.SET_RECIPES:
            return {
                ...state,
                recipes: [...(action as RecipesActions.SetRecipes).payload]
            }
        default:
            return state;
    }
}