const AsyncErrorHandler = require('../middlewares/asyncHandler');
const ErrorHandler = require('../middlewares/Errors');

const Topic = require('../models/Topic.model');


// Create Article route 
exports.createTopic = AsyncErrorHandler(async (req, res, next) => {
    const { topic, description } = req.body;
    let descarr = [];
    let separators = [',', '.', '-', "'", '"', '(', ")", '[', ']', '{', '}', '/', ':', '?', '|', ';', '\n', " "];
    const catgry = ['Understood', 'Somewhat Understood', 'Not clear', 'What rubbish'];

    let temp = "";
    for (let i = 0; i < description.length; i++) {
        if (separators.includes(description[i])) {
            if (temp.length > 0) {
                let data = {
                    category: catgry[Math.floor(Math.random() * 4)],
                    content: temp,
                }
                descarr.push(data);
                temp = "";
            }
        } else {
            temp += description[i];
        }
    }
    if (temp.length > 0) {
        let data = {
            category: catgry[Math.floor(Math.random() * 4)],
            content: temp,
        }
        descarr.push(data);
        temp = "";
    }
    let points = 0;
    for (let i = 0; i < descarr.length; i++) {
        if (descarr[i].category == "Understood") {
            points += 4;
        } else if (descarr[i].category == "Somewhat Understood") {
            points += 3;
        } else if (descarr[i].category == "Not clear") {
            points += 2;
        } else {
            points += 1;
        }
    }
    let score = (points / (descarr.length * 4) * 100).toFixed(2);
    let article = await Topic.create({
        userId: req.user.id,
        topic,
        description: descarr,
        score: score,
    });
    return res.status(200).send({ success: true, article })
});


// Get Article Details Route
exports.getTopic = AsyncErrorHandler(async (req, res, next) => {
    const topic = await Topic.find({ _id: req.params.id });
    if (!topic) {
        return next(new ErrorHandler("Article not Found", 404));
    }
    return res.status(201).send({ success: true, topic });
});

// Get all Article of LoggedIn User route
exports.getAllTopics = AsyncErrorHandler(async (req, res, next) => {
    const topics = await Topic.find({ userId: req.user.id });
    return res.status(200).send({ success: true, topics });
});

// Update Article of LoggedIn User route
exports.UpdateTopic = AsyncErrorHandler(async (req, res, next) => {
    const topic = await Topic.findById(req.params.id);
    if (!topic) {
        return next(new ErrorHandler("Article Not Found", 404));
    }
    let score = topic.score;
    if (req.body?.description) {
        let descarr = req.body?.description;
        let points = 0;
        for (let i = 0; i < descarr.length; i++) {
            if (descarr[i].category == "Understood") {
                points += 4;
            } else if (descarr[i].category == "Somewhat Understood") {
                points += 3;
            } else if (descarr[i].category == "Not clear") {
                points += 2;
            } else {
                points += 1;
            }
        }
        score = (points / (descarr.length * 4) * 100).toFixed(2);
    }
    const uptopic = await Topic.findByIdAndUpdate(req.params.id, { ...req.body, score }, { new: true });
    return res.status(300).send({ success: true, topic: uptopic });
});

// Delete Article of LoggedIn User route
exports.DeleteTopic = AsyncErrorHandler(async (req, res, next) => {
    const topic = await Topic.findById(req.params.id);
    if (!topic) {
        return next(new ErrorHandler("Article Not Found", 404));
    }
    await Topic.findByIdAndDelete(req.params.id);
    return res.status(200).send({ success: true, message: "Topic Deleted Successfully" });
})