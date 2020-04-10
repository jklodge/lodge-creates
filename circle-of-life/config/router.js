const router = require("express").Router();
const circles = require("../controllers/circles");
const authFuncs = require("../lib/Auth");

// router.post("/auth/signup", createUser);
router
  .route("/circles")
  .get(circles.index)
  .post(authFuncs.checkIfAuthenticated, circles.create);

router
  .route("/circles/:id")
  .get(circles.show)
  .put(authFuncs.checkIfAuthenticated, circles.update)
  .delete(authFuncs.checkIfAuthenticated, circles.delete);

router.route("/*").all((req, res) =>
  res.status(404).json({
    message: "Not found"
  })
);

module.exports = router;
