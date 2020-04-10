const Circle = require("../models/circle");

function indexRoute(req, res, next) {
  return Circle.find()
    .then(circles => res.json(circles))
    .catch(next);
}
// console.log("req.c", req.currentUser);
// console.log("req.body", req.body);
// req.body.user = req.currentUser;

function createRoute(req, res, next) {
  Circle.create(req.body)
    .then(() => res.redirect(`/circles/:id`))
    .catch(next);
}

// if(req.body.user=== )
function showRoute(req, res, next) {
  return Circle.findById(req.params.id)
    .then(circle => res.json(circle))
    .catch(next);
}

// function showRoute(req, res, next) {
//   return Circle.findById(req.params.id)
//     .then(circle => {
//       // if(circle.user === )
//       res.json(circle);
//     })
//     .catch(next);
// }

function updateRoute(req, res, next) {
  return Circle.findById(req.params.id)
    .then(circle => Object.assign(circle, req.body))
    .then(circle => circle.save())
    .then(circle => res.json(circle))
    .catch(next);
}

function deleteRoute(req, res, next) {
  return Circle.findById(req.params.id)
    .then(circle => circle.remove())
    .then(() => res.sendStatus(204))
    .catch(next);
}

module.exports = {
  index: indexRoute,
  create: createRoute,
  show: showRoute,
  update: updateRoute,
  delete: deleteRoute
};
