import { TeachesAtEnum } from './../Enums/TeachesAt.Enum';
import { TeachesSubjectsEnum } from './../Enums/TeachesSubjects.Enum';
import { TeachesInstitutionsEnum } from './../Enums/TeachesInstitutions.Enum';

export interface SearchTeacherInterface {
    gender: number;
    toPrice: number;
    fromPrice: number;
    teachesAt: TeachesAtEnum;
    teachesSubjects: TeachesSubjectsEnum;
    teachesInstitutions: TeachesInstitutionsEnum;
}