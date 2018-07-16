import { Router, Request, Response } from 'express';

import { Logger } from './../LogService/logger';
import { TeacherLogic } from './../Logic/TeacherLogic';
import { UserMiddleware } from '../Common/Middleware';
import { TeacherInterface } from './../Interfaces/Teacher.interface';
import { SearchTeacherInterface } from '../Interfaces/SearchTeacher.interface';
import { TeacherUpdateInterface } from './../Interfaces/TeacherUpdate.interface';
import { IsObjectNullOrUndefined, IsStringNullOrEmpty } from '../Abstracts/ValidationAbstract';

//#region Members
const router: Router = Router();
const logger: Logger = new Logger();
//#endregion

//#region Routers
/**
 * Returns all teachers that exists.
 */
router.get('/getall', (req: Request, res: Response) => {
    try {
        logger.debug("Enter Teacher", "Router teacher/getall");

        let tManager = new TeacherLogic();

        tManager.GetAll()
            .then((teachers) => {
                res.json(teachers);
            }).catch((error) => {
                res.status(400).send(error.message);
            });

        logger.info("Out", "teacher/getall");
    } catch (ex) {
        logger.error("Out", "teacher/getall", ex.message);
        res.status(400).send(ex.message);
    }
});

/**
 * Returns specific teacher by his ID at database.
 */
router.get('/getbyid/:id', (req: Request, res: Response) => {
    try {
        logger.debug("Enter Teacher", "Router teacher/getbyid " + req.params.id);

        let id = req.params.id;

        if (IsObjectNullOrUndefined(id)) {
            logger.error("Model is not valid.", "teacher/getbyid/");
            res.status(400).send("Model is not valid.");
        }

        let tManager = new TeacherLogic();

        tManager.GetByID(id)
            .then((teacher) => {
                res.json(teacher);
            }).catch((error) => {
                res.status(400).send(error.message);
            });

        logger.info("Out", "teacher/getbyid" + req.params.id);
    } catch (ex) {
        logger.error("Out", "teacher/getbyid/" + req.params.id, ex.message);
        res.status(400).send(ex.message);
    }
});

/**
 * Returns teacher by given token at headers.
 */
router.get('/getteacherbytoken', UserMiddleware, (req: Request, res: Response) => {
    try {
        logger.debug("Enter Teacher", "Router teacher/getteacherbytoken");

        let userInfo = process["currentUser"];

        if (IsObjectNullOrUndefined(userInfo) || IsObjectNullOrUndefined(userInfo.id)) {
            logger.error("Model is not valid.", "teacher/getteacherbytoken");
            res.status(400).send("Model is not valid.");
        }

        let id = userInfo.id;

        let tManager = new TeacherLogic();

        tManager.GetTeacherByUserID(id)
            .then((teacher) => {
                res.json(teacher);
            }).catch((error) => {
                res.status(400).send(error.message);
            });

        logger.info("Out", "teacher/getteacherbytoken");
    } catch (ex) {
        logger.error("Out", "teacher/getteacherbytoken", ex.message);
        res.status(400).send(ex.message);
    }
});

/**
 * Returns list of teachers according to their IDs.
 */
router.post('/getlistofteachersbyid', (req: Request, res: Response) => {
    try {
        logger.debug("Enter Teacher", "Router teacher/getlistofteachersbyid");

        if (!IsListOfIDValid(req.body.listOfTeacherID)) {
            logger.error("Model is not valid.", "teacher/getlistofteachersbyid", req.body);
            return res.status(400).send("Model is not valid.");
        }

        let tManager = new TeacherLogic();
        let arrayOfTeacherID = req.body.listOfTeacherID;

        tManager.GetListOfTeachersByID(arrayOfTeacherID)
            .then((teacherList) => {
                res.send(teacherList);
            }).catch((error) => {
                res.status(400).send(error);
            });

        logger.info("Out", "teacher/getlistofteachersbyid");
    } catch (ex) {
        logger.error("Out", "teacher/getlistofteachersbyid", ex.message);
        res.status(400).send(ex.message);
    }
});

/**
 * Searches for teachers according to search model.
 * @prop {SearchTeacherInterface} Model The model of the search.
 */
router.post('/search', (req: Request, res: Response) => {
    try {
        logger.debug("Enter Teacher", "Router teacher/search", req.body);

        if (!IsTeacherSearchModelValid(req.body)) {
            logger.error("Model is not valid.", "teacher/search", req.body);
            return res.status(400).send("Model is not valid.");
        }

        let tManager = new TeacherLogic();
        let searchTeacherModel: SearchTeacherInterface = GetSearchDataModel(req.body);

        tManager.SearchTeacher(searchTeacherModel)
            .then((success) => {
                res.send(success);
            })
            .catch((error) => {
                res.status(400).send(error.message);
            });

        logger.info("Out", "teacher/search");
    } catch (ex) {
        logger.error("Out", "teacher/search", ex.message);
        res.status(400).send(ex.message);
    }
});

/**
 * Creates new teacher according to create model.
 * @prop {TeacherInterface} Model The create model.
 */
router.post('/create', (req: Request, res: Response) => {
    try {
        logger.debug("Enter Teacher", "Router teacher/create");

        if (!IsCreateModelValid(req.body)) {
            logger.error("Model is not valid.", "teacher/create", req.body);
            return res.status(400).send("Model is not valid.");
        }

        let tManager = new TeacherLogic();
        let teacherData: TeacherInterface = ConvertCreateModelToTeacherInterface(req.body);

        tManager.Create(teacherData)
            .then((success) => {
                res.send(success);
            })
            .catch((error) => {
                res.status(400).send(error.message);
            });

        logger.info("Out", "teacher/create");
    } catch (ex) {
        logger.error("Out", "teacher/create", ex.message);
        res.status(400).send(ex.message);
    }
});

/**
 * Updates teacher model at database.
 */
router.put('/update', UserMiddleware, (req: Request, res: Response) => {
    try {
        logger.debug("Enter Teacher", "Router teacher/update");

        if (!IsTeacherUpdateModelValid(req.body)) {
            logger.error("Model is not valid.", "teacher/update", req.body);
            return res.status(400).send("Model is not valid.");
        }

        let tManager = new TeacherLogic();
        let teacherUpdateModel: TeacherUpdateInterface = ConvertUpdateModelToTeacherInterface(req.body);

        tManager.UpdateTeacherByUserID(teacherUpdateModel)
            .then((success) => {
                res.send(success);
            })
            .catch((error) => {
                res.status(400).send(error.message);
            });

        logger.info("Out", "teacher/update");
    } catch (ex) {
        logger.error("Out", "teacher/update", ex.message);
        res.status(400).send(ex.message);
    }
});
//#endregion

//#region Functions
/**
 * Validates whether the new request to create teacher is valid.
 * @param model New teacher model.
 * @returns {boolean}
 */
function IsCreateModelValid(model: any): boolean {
    if (IsObjectNullOrUndefined(model)
        || IsObjectNullOrUndefined(model.age)
        || model.age < 0
        || model.age > 120
        || IsObjectNullOrUndefined(model.rate)
        || model.rate < 0
        || model.rate > 5
        || IsObjectNullOrUndefined(model.priceFrom)
        || model.priceFrom < 0
        || IsObjectNullOrUndefined(model.priceTo)
        || model.priceTo > 200
        || model.priceFrom > model.priceTo
        || IsObjectNullOrUndefined(model.teachesAt)
        || model.teachesAt < 1
        || IsObjectNullOrUndefined(model.gender)
        || model.gender < 0
        || IsObjectNullOrUndefined(model.teachesInstitutions)
        || model.teachesInstitutions.length === 0
        || IsObjectNullOrUndefined(model.teachesSubjects)
        || model.teachesSubjects.length === 0
        || IsStringNullOrEmpty(model.email)
        || IsStringNullOrEmpty(model.phone)
        || IsStringNullOrEmpty(model.lastName)
        || IsStringNullOrEmpty(model.firstName)
        || IsStringNullOrEmpty(model.personalMessage)
        || IsStringNullOrEmpty(model.userID)) {
        return false;
    } else {
        return true;
    }
}

/**
 * Validates whether the new request to search teacher is valid.
 * @param model New search model.
 * @returns {boolean}
 */
function IsTeacherSearchModelValid(model: any): boolean {
    if (IsObjectNullOrUndefined(model)
        || IsObjectNullOrUndefined(model.fromPrice)
        || IsObjectNullOrUndefined(model.toPrice)
        || model.fromPrice < 0
        || model.toPrice < 0
        || model.fromPrice > model.toPrice) {
        return false;
    }
    else {
        return true;
    }
}

/**
 * Validates whether the model is valid.
 * @param model 
 */
function IsTeacherUpdateModelValid(model: any): boolean {
    if (IsObjectNullOrUndefined(model)
        || model.age < 18
        || model.age > 120
        || model.priceTo < 0 || model.priceTo > 200
        || model.priceFrom < 0 || model.priceFrom > 200
        || model.priceFrom > model.priceTo
        || IsStringNullOrEmpty(model.email)
        || IsStringNullOrEmpty(model.userID)
        || IsStringNullOrEmpty(model.lastName)
        || IsStringNullOrEmpty(model.phone)
        || IsStringNullOrEmpty(model.firstName)
        || IsStringNullOrEmpty(model.personalMessage)) {
        return false;
    } else {
        return true;
    }
}

/**
 * Validates whether the array of IDs are valid.
 * @param listOfTeacherID Array of IDs from database.
 * @returns {boolean}
 */
function IsListOfIDValid(listOfTeacherID: any): boolean {
    if (IsObjectNullOrUndefined(listOfTeacherID) || listOfTeacherID.length === 0) {
        return false;
    } else {
        listOfTeacherID.forEach(element => {
            if (IsStringNullOrEmpty(element)) {
                throw new Error("One element is null or empty.");
            }
        });
        return true;
    }
}

/**
 * Converts update model to interface.
 * @param model 
 */
function ConvertUpdateModelToTeacherInterface(model: any): TeacherUpdateInterface {
    let teacher: TeacherUpdateInterface = {
        age: model.age,
        email: model.email,
        phone: model.phone,
        userID: model.userID,
        priceTo: model.priceTo,
        lastName: model.lastName,
        priceFrom: model.priceFrom,
        firstName: model.firstName,
        personalMessage: model.personalMessage
    };

    return teacher;
}

/**
 * Receives model and creates interface that contains the data to search.
 * @param model Search details.
 * @returns {SearchTeacherInterface} Model to return.
 */
function GetSearchDataModel(model: any): SearchTeacherInterface {
    let searchTeacherModel: SearchTeacherInterface = {
        gender: model.gender,
        toPrice: model.toPrice,
        fromPrice: model.fromPrice,
        teachesAt: model.teachesAt,
        teachesSubjects: model.teachesSubjects,
        teachesInstitutions: model.teachesInstitutions
    };

    return searchTeacherModel;
}

/**
 * Receives model and creates interface that contains the data to create new teacher.
 * @param model Teacher details.
 * @returns {TeacherInterface} Model to return.
 */
function ConvertCreateModelToTeacherInterface(model: any): TeacherInterface {
    let teacherModel: TeacherInterface = {
        age: model.age,
        rate: model.rate,
        phone: model.phone,
        email: model.email,
        image: model.image,
        userID: model.userID,
        priceTo: model.priceTo,
        lastName: model.lastName,
        firstName: model.firstName,
        priceFrom: model.priceFrom,
        teachesAt: model.teachesAt,
        teachesSubjects: model.teachesSubjects,
        personalMessage: model.personalMessage,
        gender: model.gender, recommendations: [],
        teachesInstitutions: model.teachesInstitutions
    }

    return teacherModel;
}
//#endregion

export const TeacherController: Router = router;