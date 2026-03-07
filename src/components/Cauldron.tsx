import { useAlchemistStore } from '../store/useAlchemistStore';

export function Cauldron() {
	const cauldron = useAlchemistStore((state) => state.cauldron);

	const removeIngredient = useAlchemistStore((state) => state.removeIngredient);

	if (cauldron.length === 0) {
		return (
			<div className="w-full max-w-md mx-auto mt-8 p-8 border-2 border-dashed border-slate-700 rounded-xl text-center text-slate 500">
				Your cauldron is empty. Toss some ingredients above! 🧪
			</div>
		);
	}

	return (
		<div className="w-full max-w-md mx-auto mt-8 p-6 bg-slate-800 rounded-xl shadow-lg border border-slate-700">
			<h2 className="text-xl font-bold text-emerald-400 mb-4 flex items-center gap-2">
				🧪 Inside the Cauldron
			</h2>

			<div className="flex flex-wrap gap-2">
				{cauldron.map((item) => (
					<span key={item.id}
                        className='flex items-center gap-2 px-3 py-1.5 bg-slate-900 text-slate-200 rounded-full text-sm capitalize border border-slate-700'
                    >
                        {item.name}
                        <button type='button'
                            onClick={() => removeIngredient(item.id)}
                            className='text-slate-500 hover:text-red-400 transition-colors font-bold px-1'
                            title='Remove Ingredient'
                        >
                            &times;
                        </button>
                    </span>
				))}
			</div>
		</div>
	);
}
