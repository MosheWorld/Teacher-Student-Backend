import { Router, Request, Response } from 'express';

import { TeacherLogic } from './../Logic/TeacherLogic';
import { TeachesSubjects } from '../Enums/TeachesSubjects.Enum';
import { TeacherInterface } from './../Interfaces/Teaacher.interface';

const router: Router = Router();

router.get('/getall', (req: Request, res: Response) => {
    let tManager = new TeacherLogic();

    tManager.GetAll()
        .then((teachers) => {
            res.json(teachers);
        }).catch((error) => {
            res.status(400).send(error.message);
        });
});

router.get('/getbyid/:id', (req: Request, res: Response) => {
    let id = req.params.id;

    if (id == null) { res.status(400).send("Model is not valid."); }

    let tManager = new TeacherLogic();

    tManager.GetByID(id)
        .then((teacher) => {
            res.json(teacher);
        }).catch((error) => {
            res.status(400).send(error.message);
        });
});

// router.get('/search/:fromprice/:toprice/:teachesat/:teachesinstitutions/:gender', (req: Request, res: Response) => {
//     console.log(req.query.fromprice);
//     console.log(req.query.toprice);
//     console.log(req.query.teachesat);
//     console.log(req.query.teachesinstitutions);
//     console.log(req.query.gender);
//     res.send("a");
// });

router.post('/search', (req: Request, res: Response) => {

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
});

router.post('/create', (req: Request, res: Response) => {

    if (req.body == null || !IsModelCreateValid(req.body)) {
        return res.status(400).send("Model is not valid.");
    }

    let tManager = new TeacherLogic();
    let teacherData: TeacherInterface = {
        firstName: req.body.firstName, lastName: req.body.lastName,
        age: req.body.age, email: req.body.email, priceFrom: req.body.priceFrom, priceTo: req.body.priceTo,
        phone: req.body.phone, personalMessage: req.body.personalMessage, teachesAt: req.body.teachesAt,
        teachesInstitutions: req.body.teachesInstitutions, gender: req.body.gender
    }

    tManager.Create(teacherData)
        .then((success) => {
            res.send(success);
        })
        .catch((error) => {
            res.status(400).send(error.message);
        });
});

router.delete('/delete/:id', (req: Request, res: Response) => {
    let id = req.params.id;

    if (id == null) { res.status(400).send("Model is not valid."); }

    let tManager = new TeacherLogic();

    tManager.Delete(id)
        .then((response) => {
            res.json(response);
        }).catch((error) => {
            res.status(400).send(error.message);
        });
});

function IsModelCreateValid(model: any) {
    if (model == null ||
        model.age == null || model.age < 0 || model.age > 120 ||
        model.priceFrom == null || model.priceFrom < 0 ||
        model.priceTo == null || model.priceTo > 1000 ||
        model.priceFrom > model.priceTo ||
        model.teachesAt == null || model.teachesAt < 0 ||
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

function IsStringNullOrEmpty(str: string) {
    if (str == null || str === "") {
        return true;
    } else {
        return false;
    }
}

export const TeacherController: Router = router;