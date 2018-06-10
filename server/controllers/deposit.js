const DB = require('../utils/db.js')

module.exports = {
  // Query the ISBN in the database
    // if it exists, deposit
    // if it does not exist, err
  isInBooklist: async => {

    let isbn = ctx.request.body.isbn || []
    let count = await DB.query('select count(id) from books where isbn = [?] ', [isbn]) 
    ctx.state.data = count > 0 ? true : false
    },
  
  
  deposit: async => {
    let user = ctx.state.$wxInfo.userinfo.openId
    // if the user is not in the database, do insertion(E_NIMPL)
    let nUser = await DB.query('select count(id) from users where name = [?]', [user])
    if(nUser == 0){
      let insertUser = await DB.query('insert into users(`name`) values [?]', [user])
    }

    let user_id = await DB.query('select id from users where name = [?] ', [user])

    let isbn = ctx.request.body.isbn || []
    let book_id = await DB.query('select id from books where isbn = (?) ', [isbn]) 

    let sql = 'INSERT INTO `deposit`(`user_id`, `book_id`) VALUES '
    let param = []
    param.push(book_id)
    param.push(user_id)

    let dpst = DB.query(sql + '(?, ?)', param);

    // upadte the user credit
    let updateCredit = DB.query('UPDATE `users` SET `credit`=[value-3] WHERE id = (?)', [user_id])
  }

}