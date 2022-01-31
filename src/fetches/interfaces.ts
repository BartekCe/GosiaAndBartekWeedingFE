export interface User {
    id: number;
    name: string;
    startingWeight: number;
    currentWeight: number;
    goalWeight: number;
    weeklyCaloriesIntake: number;
    dailyCaloriesIntake: number;
    dailyProtein: number;
    dailyFat: number;
    dailyCarbohydrate: number
}

export interface DayOfEating {
    id: number;
    date: string;
    meals: Array<MealInterface>
    calories: number;
    dayTag: DayTag
}

export interface MealInterface {
    id: number;
    ingredients: Array<IngredientSimple>;
    calories?: number;
    protein?: number;
    fat?: number;
    carbohydrate?: number;
    mealTag?: MealTag
}

export interface IngredientSimple {
    id?: number;
    grams: number;
    name: string
    number: number
}

export interface Recipe {
    id: number
    name: string
    ingredients: Array<IngredientSimple>;
    calories? : number
    protein?: number
    fat?: number
    carbohydrate?: number
}

export interface ShearedMeal {
    ingredients: IngredientSimple[],
    mealTag: MealTag,
    userId?: number
}

export interface DayStats {
    calories: number,
    protein: number,
    fat: number,
    carbohydrate: number
}

export enum MealTag {
    BREAKFAST,
    LUNCH,
    DINNER,
    OTHERS
}

export enum DayTag {
    MONDAY,
    TUESDAY,
    WEDNESDAY,
    THURSDAY,
    FRIDAY,
    SATURDAY,
    SUNDAY

}

