module.exports = function(req, res, next) {
    if (req.session.username !== undefined) {
        next();
    } else res.redirect("/login");
}
