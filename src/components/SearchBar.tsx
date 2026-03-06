import { useState } from 'react';
import { api } from '../services/api';
import { useAlchemistStore } from '../store/useAlchemistStore';
import type { Ingredient } from '../types/recipe';

export function SearchBar() {
	const [query, SetQuery] = useState('');
	const [results, SetResults] = useState<Ingredient[]>([]);
	const [isLoading, SetisLoading] = useState(false);

	const addIngredient = useAlchemistStore((state) => state.addIngredient);

	const handleSearch = async (e: React.FormEvent) => {
		e.preventDefault();

		if (!query.trim()) return;

		SetisLoading(true);

		try {
			const data = await api.searchIngredients(query);

			SetResults(data.results || []);

			console.log('Resultados da API:', data.results);
		} catch (error) {
			console.log('Erro na busca:', error);
		} finally {
			SetisLoading(false);
		}
	};

	const handleAdd = (ingredient: Ingredient) => {
		addIngredient(ingredient);
		SetQuery('');
		SetResults([]);
	};

	return (
		<div className="w-full max-w-md mx-auto relative">
			<form className="flex gap-2" onSubmit={handleSearch}>
				<input
					type="text"
					placeholder="Type an ingredient..."
					className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-slate-100"
					value={query}
					onChange={(e) => SetQuery(e.target.value)}
				/>
				<button
					type="submit"
					className="px-6 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-medium"
					disabled={isLoading}
				>
					{isLoading ? '...' : 'Search'}
				</button>
			</form>
			{results.length > 0 && (
				<ul className="absolute top-full mt-2 w-full bg-slate-800 border border-slate-700 rounded-lg overflow-hidden shadow-xl z-10">
					{results.map((item) => (
						<li key={item.id}>
							<button
								type="button"
								onClick={() => handleAdd(item)}
								className="w-full text-left px-4 py-3 hover:bg-slate-700 text-slate-200 transition-colors flex items-center justify-between cursor-grab"
							>
								<span className="capitalize">{item.name}</span>
								<span className="text-xs text-purple-400 bg-purple-900/30 px-2 py-1 rounded">
									Add +
								</span>
							</button>
						</li>
					))}
				</ul>
			)}
		</div>
	);
}
