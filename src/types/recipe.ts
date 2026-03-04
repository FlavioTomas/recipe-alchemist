

export interface Ingredient {
    id: number;
    name: string;
    image: string;
    description?: string;
}


export interface Recipe {
    id: number;
    title: string;
    image: string;
    missedIngredientCount?: number;
    usedIngredientCount?: number;
    youtubeUrl?: string;
}


export interface RecipeDetails extends Recipe {
    summary: string;
    instructions: string;
    readyInMinutes: number;
    servings: number;
}