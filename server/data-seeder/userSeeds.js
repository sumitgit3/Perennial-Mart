import bcrypt from 'bcryptjs'

const users = [
    {
        name:'Admin user',
        email:'admin@email.com',
        password:bcrypt.hashSync('12345678',10), //storing hashvalue of password in db
        isAdmin:true
    },
    {
        name:'sumit',
        email:'sumit@email.com',
        password:bcrypt.hashSync('12345678',10), //storing hashvalue of password in db
        isAdmin:false
    },
    {
        name:'kunal',
        email:'kunal@email.com',
        password:bcrypt.hashSync('12345678',10), //storing hashvalue of password in db
        isAdmin:false
    },
];

export default users;