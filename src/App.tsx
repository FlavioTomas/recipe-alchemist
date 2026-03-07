import { Cauldron } from './components/Cauldron';
import { SearchBar } from './components/SearchBar';

function App() {
	return (
		<div className="min-h-screen bg-alchemist-dark text-slate-100 p-8">
			<div className="max-w-4xl mx-auto space-y-8 text-center">
				<header>
					<h1 className="text-4xl font-bold text-purple-400">
						The Recipe Alchemist
					</h1>
					<p className="text-slate-400 mt-2">
						Toss ingredients into your cauldron...
					</p>
				</header>
				<section className="pt-8">
					<SearchBar />

					<Cauldron />
				</section>
			</div>
		</div>
	);
}

export default App;
