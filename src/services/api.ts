import axios from 'axios';

const API_KEY = import.meta.env.VITE_SPOONACULAR_API_KEY;

const spoonacular = axios.create({
	baseURL: 'https://api.spoonacular.com',
	params: {
		apiKey: API_KEY,
	},
});

export const api = {
	searchIngredients: async (query: string) => {
		const response = await spoonacular.get('/food/ingredients/search', {
			params: { query, number: 5 },
		});

		return response.data;
	},

	searchRecipeByIngredients: async (ingredients: string[]) => {
		const response = await spoonacular.get('/recipes/findByIngredients', {
			params: {
				ingredients: ingredients.join(','),
				number: 12,
				ranking: 1,
			},
		});

		return response.data;
	},
};
