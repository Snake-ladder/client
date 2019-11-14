import db from '../config/firebase'

const User = db.collection('User')
const Room = db.collection('Room')

export default { User, Room }