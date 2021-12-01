module.exports = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next()
    }
    req.flash('error', 'Por favor realize o login!')
    res.redirect('/login')
}