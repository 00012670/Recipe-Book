import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect} from '@ngrx/effects';
import { HttpClient } from '@angular/common/http';
import { switchMap, map, withLatestFrom } from 'rxjs/operators';
import { Store } from '@ngrx/store';

import * as RecipesActions from './recipe.actions';
import { Recipe } from '../recipe.model';
import * as fromApp from '../../store/app.reducer'

@Injectable()
export class RecipeEffects {

    fetchRecipes = createEffect(() =>
    this.actions$.pipe(
    ofType(RecipesActions.FETCH_RECIPES),
    switchMap(() => {
      return this.http.get<Recipe[]>(
        'https://recipe-book-efd44-default-rtdb.europe-west1.firebasedatabase.app/recipes.json',
      )
    }),
    map(recipes => {
      if( recipes === null) {
        return [];
      }
      return recipes.map(recipe => {
        return {
          ...recipe,
          ingredients: recipe.ingredients ? recipe.ingredients : []
        };
      });
    }),
    map(recipes => {
      return new RecipesActions.SetRecipes(recipes);
    })
  ));

  storeRecipes = createEffect(() => 
    this.actions$.pipe(
      ofType(RecipesActions.STORE_RECIPES),
      withLatestFrom(this.store.select('recipes')),
      switchMap(([actionData, recipesState])=> {
      return this.http
      .put(
        'https://recipe-book-efd44-default-rtdb.europe-west1.firebasedatabase.app/recipes.json',
         recipesState.recipes
      );    
    })),
    {dispatch: false}
  );

  constructor(
    private actions$: Actions, 
    private http: HttpClient, 
    private store: Store<fromApp.AppState>) {}
}
