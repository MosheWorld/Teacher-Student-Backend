import { TeachesAt } from './../Enums/TeachesAt.Enum';
import { TeachesSubjects } from './../Enums/TeachesSubjects.Enum';
import { TeachesInstitutions } from './../Enums/TeachesInstitutions.Enum';

export interface SearchTeacherInterface {
    gender: number;
    toPrice: number;
    fromPrice: number;
    teachesAt: TeachesAt;
    teachesSubjects: TeachesSubjects;
    teachesInstitutions: TeachesInstitutions;
}