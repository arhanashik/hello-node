module.exports = {
    getHomePage: getHomePage
}

function getHomePage(req, res) {
    let query = "SELECT * FROM `players` ORDERED BY id ASC"

    db.query(query, (err, result) =>{
        if(err) {
            res.redirect('/')
        }

        res.render('index.ejs', {
            title: 'Hello Noder | View Players',
            players: result
        })
    })
}