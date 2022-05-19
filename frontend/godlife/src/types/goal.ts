export interface GoalType {
  seq: number;
  content: string;
  category: string;
}

export interface FavoriteGoalType extends GoalType {
  favoriteSeq: string;
}
