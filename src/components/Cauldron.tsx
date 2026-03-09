import { useState } from 'react';
import { api } from '../services/api';
import { useAlchemistStore } from '../store/useAlchemistStore';

export function Cauldron() {
	const cauldron = useAlchemistStore((state) => state.cauldron);
	const removeIngredient = useAlchemistStore((state) => state.removeIngredient);
	const [isBrewing, SetIsBrewing] = useState(false);
	const setRecipes = useAlchemistStore((state) => state.setRecipes);

	const handleBrewPotion = async () => {
		SetIsBrewing(true);

		try {
			const ingredientsNames = cauldron.map((ingredient) => ingredient.name);

			const recipesData = await api.searchRecipeByIngredients(ingredientsNames);

			setRecipes(recipesData);
		} catch (error) {
			console.error('Erro ao fazer a poção:', error);
		} finally {
			SetIsBrewing(false);
		}
	};

	if (cauldron.length === 0) {
		return (
			<div className="w-full max-w-md mx-auto mt-8 p-8 border-2 border-dashed border-slate-700 rounded-xl text-center text-slate 500">
				Your cauldron is empty. Toss some ingredients above! 🧪
			</div>
		);
	}

	return (
		<div className="w-full max-w-md mx-auto mt-8 p-6 bg-slate-800 rounded-xl shadow-lg border border-slate-700">
			<h2 className="text-xl font-bold text-emerald-400 mb-4 flex items-center justify-center gap-2">
				🧪 Inside the Cauldron
			</h2>

			<div className="flex flex-wrap gap-2 justify-center">
				{cauldron.map((item) => (
					<span
						key={item.id}
						className="flex items-center gap-2 px-3 py-1.5 bg-slate-900 text-slate-200 rounded-full text-sm capitalize border border-slate-700"
					>
						{item.name}
						<button
							type="button"
							onClick={() => removeIngredient(item.id)}
							className="text-slate-500 hover:text-red-400 transition-colors duration-300 font-bold px-1"
							title="Remove Ingredient"
						>
							&times;
						</button>
					</span>
				))}
			</div>

			<div className="mt-6 flex justify-end border-t border-slate-700 pt-4">
				<button
					type="button"
					onClick={handleBrewPotion}
					disabled={isBrewing}
					className="px-6 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-bold transitions-colors duration-300 shadow-lg shadow-emerald-900/50 disabled:opacity-50 disabled:cursor-not-allowed flex items-center mx-auto gap-2"
				>
					{isBrewing ? 'Brewing...' : 'Brew Potion 🪄'}
				</button>
			</div>
		</div>
	);
}
