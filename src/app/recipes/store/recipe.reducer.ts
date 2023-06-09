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
            };
        case RecipesActions.ADD_RECIPE:
            return {
                ...state,
                recipes: [...state.recipes, (action as RecipesActions.AddRecipe).payload]
            };
        case RecipesActions.UPDATE_RECIPE:
            const updateAction = action as RecipesActions.UpdateRecipe;
            const updatedRecipes = [...state.recipes];
            updatedRecipes[updateAction.payload.index] = updateAction.payload.newRecipe;

            return {
                ...state,
                recipes: updatedRecipes
            };
            case RecipesActions.DELETE_RECIPE:
                return {
                    ...state,
                    recipes: state.recipes.filter((recipe, index) => {
                        return index !== (action as RecipesActions.DeleteRecipe).payload;
                    })
                };
        default:
            return state;
    }
}