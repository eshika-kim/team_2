// import { createConnection } from 'typeorm'
// import { User } from './user.entity';
// import { Board } from './board.entity';
// import { Member } from './momner.entity';
// import { Column } from './column.entity';
// import { Card } from './card.entity';
// import { Comment } from './comment.entity';



// //user
// User.hasMany(Board)
// User.hasMany(Member)
// User.hasMany(Waiting)
// User.hasMany(Comment)
// //board
// Board.hasMany(Member)
// Board.hasMany(column)
// //member
// Member.belongsTo(User)
// Member.belongsto(Board)
// //column
// column.belongTo(Board)
// column.hasMany(Card)
// //card
// Card.belongsTo(column)
// Card.hasMany(Comment)
// //Waiting
// Waiting.belongsTo(User)
// Waiting.belongsTo(Board)
// //comment
// Comment.belongsTo(User)
// Comment.belongsTo(Card)

// export {
//   User,
//   Board,
//   Member,
//   Column,
//   Card,
//   Comment,
//   Waiting
// };

