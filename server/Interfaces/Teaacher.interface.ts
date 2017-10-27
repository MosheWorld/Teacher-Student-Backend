import { TeachesAt } from '../Enums/TeachesAt.Enum';
import { TeachesSubjects } from '../Enums/TeachesSubjects.Enum';

export interface TeacherInterface {
    firstName: string;
    lastName: string;
    age: number;
    email: string;
    priceFrom: number;
    priceTo: number;
    phone: string;
    personalMessage: string;
    teachesAt: TeachesAt;
    teachesSubjects: TeachesSubjects[];
}