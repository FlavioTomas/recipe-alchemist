import { useState } from 'react';
import { useAlchemistStore } from '../store/useAlchemistStore';
import { RecipeModal } from './RecipeModal';

export const RecipeGrid = () => {
	const recipes = useAlchemistStore((state) => state.recipes);

	const [selectedRecipeId, setSelectedRecipeId] = useState<number | null>(null);

	if (recipes.length === 0) return null;

	return (
		<div className="w-full max-w-5xl mx-auto mt-12 mb-20">
			<h2 className="text-3xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400 mb-8">
				✨ Magical Concoctions Discovered
			</h2>

			<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
				{recipes.map((recipe) => (
					// biome-ignore lint/a11y/useKeyWithClickEvents: O clique no fundo (backdrop) é um padrão aceito
					// biome-ignore lint/a11y/noStaticElementInteractions: O clique no fundo (backdrop) é um padrão aceito
					<div
						key={recipe.id}
						onClick={() => setSelectedRecipeId(recipe.id)}
						className="bg-slate-800 border border-slate-700 rounded-xl overflow-hidden hover:shadow-xl hover:shadow-emerald-900/20 transition-all duration-300 group cursor-pointer"
					>
						<div className="relative h-48 overflow-hidden">
							<img
								src={recipe.image.replace('312x312', '636x393')}
								alt={recipe.title}
								className="w-full max-w-300 h-full object-cover group-hover:scale-110 transition-transform duration-500"
							/>
							<div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-80 " />
						</div>

						<div className="p-5">
							<h3 className="text-xl font-bold text-slate-100 mb-2 line-clamp-2">
								{recipe.title}
							</h3>
							<div className="flex justify-between items-center text-sm">
								<span className="text-emerald-400 font-medium">
									{recipe.usedIngredientCount} used
								</span>
								<span className="text-orange-400 font-medium">
									{recipe.missedIngredientCount} missing
								</span>
							</div>
						</div>
					</div>
				))}
			</div>
			{selectedRecipeId !== null && (
				<RecipeModal
					recipeId={selectedRecipeId}
					onClose={() => setSelectedRecipeId(null)}
				/>
			)}
		</div>
	);
};
