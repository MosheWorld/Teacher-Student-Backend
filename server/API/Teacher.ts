import { Router, Request, Response } from 'express';
import { TeacherLogic } from './../Logic/TeacherLogic';
import { TeachesSubjects } from '../Enums/TeachesSubjects.Enum';
import { TeacherInterface } from './../Interfaces/Teaacher.interface';

// Assign router to the express.Router() instance
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

router.post('/create', (req: Request, res: Response) => {

    if (req.body == null || !IsModelValid(req.body)) {
        return res.status(400).send("Model is not valid.");
    }

    let tManager = new TeacherLogic();
    let teacherData: TeacherInterface = {
        firstName: req.body.firstName, lastName: req.body.lastName,
        age: req.body.age, email: req.body.email, priceFrom: req.body.priceFrom, priceTo: req.body.priceTo,
        phone: req.body.phone, personalMessage: req.body.personalMessage, teachesAt: req.body.teachesAt,
        teachesSubjects: req.body.teachesSubjects, gender: req.body.gender
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

function IsModelValid(model) {
    if (model == null ||
        model.age == null || model.age < 0 || model.age > 120 ||
        model.priceFrom == null || model.priceFrom < 0 ||
        model.priceTo == null || model.priceTo > 1000 ||
        model.priceFrom > model.priceTo ||
        model.teachesAt == null || model.teachesAt < 0 ||
        model.teachesSubjects == null || model.teachesSubjects.length === 0 ||
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

function IsStringNullOrEmpty(str) {
    if (str == null || str === "") {
        return true;
    } else {
        return false;
    }
}

export const TeacherController: Router = router;