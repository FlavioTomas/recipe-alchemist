import { create } from 'zustand';
import type { Ingredient } from '../types/recipe';

interface AlchemistState {
	cauldron: Ingredient[];
	addIngredient: (ingredient: Ingredient) => void;
	removeIngredient: (id: number) => void;
	clearCauldron: () => void;
}

export const useAlchemistStore = create<AlchemistState>((set) => ({
	cauldron: [],

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

	clearCauldron: () => set({ cauldron: [] }),
}));
