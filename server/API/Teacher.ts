import { Router, Request, Response } from 'express';

import { TeacherLogic } from './../Logic/TeacherLogic';
import { TeacherInterface } from './../Interfaces/Teacher.interface';
import { RecommendationsInterface } from './../Interfaces/Recommendations.interface';

const router: Router = Router();

router.get('/getall', (req: Request, res: Response) => {
    try {
        let tManager = new TeacherLogic();

        tManager.GetAll()
            .then((teachers) => {
                res.json(teachers);
            }).catch((error) => {
                res.status(400).send(error.message);
            });
    } catch (ex) {
        res.status(400).send(ex.message);
    }
});

router.get('/getbyid/:id', (req: Request, res: Response) => {
    try {
        let id = req.params.id;

        if (id == null) { res.status(400).send("Model is not valid."); }

        let tManager = new TeacherLogic();

        tManager.GetByID(id)
            .then((teacher) => {
                res.json(teacher);
            }).catch((error) => {
                res.status(400).send(error.message);
            });
    } catch (ex) {
        res.status(400).send(ex.message);
    }
});

router.post('/getlistofteachersbyid', (req: Request, res: Response) => {
    try {
        if (req.body == null || req.body.listOfTeacherID == null || !IsListOfIDValid(req.body.listOfTeacherID)) {
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

    } catch (ex) {
        res.status(400).send(ex.message);
    }
});

router.post('/search', (req: Request, res: Response) => {
    try {
        if (req.body == null || !IsModelSearchValid(req.body)) {
            return res.status(400).send("Model is not valid.");
        }

        let tManager = new TeacherLogic();
        let searchData = {
            fromPrice: req.body.fromPrice,
            toPrice: req.body.toPrice,
            teachesAt: req.body.teachesAt,
            teachesInstitutions: req.body.teachesInstitutions,
            gender: req.body.gender
        };

        tManager.SearchTeacher(searchData)
            .then((success) => {
                res.send(success);
            })
            .catch((error) => {
                res.status(400).send(error.message);
            });
    } catch (ex) {
        res.status(400).send(ex.message);
    }
});

router.post('/create', (req: Request, res: Response) => {
    try {
        if (req.body == null || !IsModelCreateValid(req.body)) {
            return res.status(400).send("Model is not valid.");
        }

        let tManager = new TeacherLogic();
        let teacherData: TeacherInterface = {
            firstName: req.body.firstName, lastName: req.body.lastName,
            age: req.body.age, email: req.body.email, priceFrom: req.body.priceFrom, priceTo: req.body.priceTo,
            phone: req.body.phone, personalMessage: req.body.personalMessage, teachesAt: req.body.teachesAt,
            teachesInstitutions: req.body.teachesInstitutions, gender: req.body.gender, recommendations: [],
            rate: req.body.rate, image: req.body.image
        }

        tManager.Create(teacherData)
            .then((success) => {
                res.send(success);
            })
            .catch((error) => {
                res.status(400).send(error.message);
            });
    } catch (ex) {
        res.status(400).send(ex.message);
    }

});

router.post('/addrecommend', (req: Request, res: Response) => {
    try {
        if (req.body == null || IsStringNullOrEmpty(req.body.id) || !IsRecommendValid(req.body.recommendData)) {
            return res.status(400).send("Model is not valid.");
        }

        let tManager = new TeacherLogic();
        let recommendData: RecommendationsInterface = {
            fullName: req.body.recommendData.fullName, email: req.body.recommendData.email,
            message: req.body.recommendData.message, rate: req.body.recommendData.rate
        };

        tManager.AddRecommendToExistingTeacher(req.body.id, req.body.recommendData)
            .then((success) => {
                res.send(success);
            })
            .catch((error) => {
                res.status(400).send(error.message);
            });
    } catch (ex) {
        res.status(400).send(ex);
    }
});

router.delete('/delete/:id', (req: Request, res: Response) => {
    try {
        let id = req.params.id;

        if (id == null) { res.status(400).send("Model is not valid."); }

        let tManager = new TeacherLogic();

        tManager.Delete(id)
            .then((response) => {
                res.json(response);
            }).catch((error) => {
                res.status(400).send(error.message);
            });
    } catch (ex) {
        res.status(400).send(ex.message);
    }
});

function IsModelCreateValid(model: any) {

    if (model == null ||
        model.age == null || model.age < 0 || model.age > 120 ||
        model.rate == null || model.rate < 0 || model.rate > 5 ||
        model.priceFrom == null || model.priceFrom < 0 ||
        model.priceTo == null || model.priceTo > 200 ||
        model.priceFrom > model.priceTo ||
        model.teachesAt == null || model.teachesAt < 1 ||
        model.teachesInstitutions == null || model.teachesInstitutions.length === 0 ||
        IsStringNullOrEmpty(model.email) ||
        IsStringNullOrEmpty(model.phone) ||
        IsStringNullOrEmpty(model.gender) ||
        IsStringNullOrEmpty(model.lastName) ||
        IsStringNullOrEmpty(model.firstName) ||
        IsStringNullOrEmpty(model.personalMessage)) {
        return false;
    } else {
        return true;
    }
}

function IsModelSearchValid(model: any) {
    // We allow model.gender to be empty, in this case we search for both genders.
    if (model == null ||
        model.fromPrice == null || model.fromPrice < 0 ||
        model.toPrice == null || model.toPrice < 0 ||
        model.teachesAt == null || model.teachesAt < 0 ||
        model.teachesInstitutions == null || model.teachesInstitutions < 0 ||
        model.gender == null
    ) {
        return false;
    }
    else {
        return true;
    }
}

function IsRecommendValid(model: any) {
    if (model == null ||
        model.rate == null || model.rate < 0 || model.rate > 5 ||
        IsStringNullOrEmpty(model.email) ||
        IsStringNullOrEmpty(model.fullName) ||
        IsStringNullOrEmpty(model.message)) {
        return false;
    } else {
        return true;
    }
}

function IsStringNullOrEmpty(str: string) {
    if (str == null || str === "") {
        return true;
    } else {
        return false;
    }
}

function IsListOfIDValid(listOfTeacherID) {
    if (listOfTeacherID == null || listOfTeacherID.length === 0) {
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

export const TeacherController: Router = router;