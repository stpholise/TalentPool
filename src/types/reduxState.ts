// types/reduxState.ts
interface Skill {
  id: string;
  name: string;
  proficiency: number;
 
}

interface UsersState {
  user: User | null;
  skills: Skill[];
  loading: boolean;
  error: string | null;
}

interface RootState {
  users: UsersState; 
}
