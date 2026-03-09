import { create } from 'zustand';
import type { Ingredient } from '../types/recipe';

export interface Recipe {
	id: number;
	title: string;
	image: string;
	usedIngredientCount: number;
	missedIngredientCount: number;
}

interface AlchemistState {
	cauldron: Ingredient[];
	recipes: Recipe[];
	addIngredient: (ingredient: Ingredient) => void;
	removeIngredient: (id: number) => void;
	clearCauldron: () => void;
	setRecipes: (recipes: Recipe[]) => void;
}

export const useAlchemistStore = create<AlchemistState>((set) => ({
	cauldron: [],
	recipes: [],

	addIngredient: (ingredient) =>
		set((state) => {
			const isAlreadyInCauldron = state.cauldron.some(
				(item) => item.id === ingredient.id,
			);
			if (isAlreadyInCauldron) return state;
			return { cauldron: [...state.cauldron, ingredient] };
		}),

	removeIngredient: (id) =>
		set((state) => ({
			cauldron: state.cauldron.filter((item) => item.id !== id),
		})),

	clearCauldron: () => set({ cauldron: [], recipes: [] }),

	setRecipes: (recipes) => set({ recipes }),
}));
