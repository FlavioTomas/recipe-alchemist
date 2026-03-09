import { useEffect, useState } from 'react';
import { api } from '../services/api';

interface RecipeDetails {
	title: string;
	image: string;
	readyInMinutes: number;
	servings: number;
	instructions: string;
	extendedIngredients: {
		id: number;
		original: string;
	}[];
}

interface RecipeModalProps {
	recipeId: number;
	onClose: () => void;
}

export function RecipeModal({ recipeId, onClose }: RecipeModalProps) {
	const [details, setDetails] = useState<RecipeDetails | null>(null);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const fetchDetails = async () => {
			try {
				const data = await api.getRecipeInformation(recipeId);
				setDetails(data);
			} catch (error) {
				console.log('Erro ao buscar detalhes: ', error);
			} finally {
				setIsLoading(false);
			}
		};

		fetchDetails();
	}, [recipeId]);

	const handleBackdropClick = (e: React.MouseEvent) => {
		if (e.target === e.currentTarget) onClose();
	};

	return (
		// biome-ignore lint/a11y/useKeyWithClickEvents: O clique no fundo (backdrop) é um padrão aceito
		// biome-ignore lint/a11y/noStaticElementInteractions: O clique no fundo (backdrop) é um padrão aceito
		<div
			className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 backdrop-blur-sm"
			onClick={handleBackdropClick}
		>
			<div className="bg-slate-800 border border-slate-700 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl relative">
				<button
					type="button"
					onClick={onClose}
					className="absolute top-4 right-4 bg-slate-900/50 text-slate-300 hover:text-white hover:bg-red-500/80 w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-300 z-10 font-bold"
				>
					×
				</button>

				{isLoading ? (
					<div className="p-12 text-center text-emerald-400 font-bold animated-pulse">
						✨ Deciphering ancient texts... (Loading)
					</div>
				) : details ? (
					<div className="p-1 text-slate-200">
						<img
							src={details.image}
							alt={details.title}
							className="w-full h-64 object-cover rounded-t-xl"
						/>

						<div className="p-6 space-y-6">
							<h2 className="text-3xl font-bold text-emerald-400">
								{details.title}
							</h2>

							<div className="flex gap-4 text-sm text-slate-400 bg-slate-900/50 p-3 rounded-lg w-fit">
								<span>⏱️ {details.readyInMinutes} mins</span>
								<span>👥 {details.servings}</span>
							</div>

							<div>
								<h3 className="text-xl font-bold text-slate-100 mb-3 border-b border-slate-700 pb-2">
									Ingredients
								</h3>
								<ul className="list-disc list-inside space-y-1 text-slate-300">
									{details.extendedIngredients?.map((ing) => (
										<li key={ing.id}>{ing.original}</li>
									))}
								</ul>
							</div>

							<div>
								<h3 className="text-xl font-bold text-slate-100 mb-3 border-b border-slate-700 pb-2">
									Instructions
								</h3>
								<div
									className="prose prose-invert max-w-none text-slate-300"
									// biome-ignore lint/security/noDangerouslySetInnerHtml: API da Spoonacular devolve HTML formatado
									dangerouslySetInnerHTML={{
										__html: details.instructions || 'No instructions found.',
									}}
								/>
							</div>
						</div>
					</div>
				) : (
					<div className="p-8 text-center text-red-400">
						Failed to load recipe.
					</div>
				)}
			</div>
		</div>
	);
}
