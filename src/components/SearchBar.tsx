


export function SearchBar() {


    return (
            <div className="w-full max-w-md mx-auto">
                <form className="flex gap-2">
                    <input type="text" placeholder="Type an ingredient..." className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-slate-100" />
                    <button type="submit" className="px-6 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-medium">
                        Search
                    </button>
                </form>
            </div>
    )
}