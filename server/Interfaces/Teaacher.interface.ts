import { TeachesAt } from '../Enums/TeachesAt.Enum';
import { TeachesSubjects } from '../Enums/TeachesSubjects.Enum';

export interface TeacherInterface {
    age: number;
    priceTo: number;
    priceFrom: number;
    phone: string;
    email: string;
    gender: string;
    lastName: string;
    firstName: string;
    personalMessage: string;
    teachesAt: TeachesAt;
    teachesSubjects: TeachesSubjects[];
}