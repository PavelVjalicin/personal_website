import bcrypt from 'bcryptjs'
import readline from 'readline'

const saltRounds = 10

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question("Enter password \n", (password) => {
    console.log(password)
    bcrypt.hash(password, saltRounds, function (err, hash) {
        console.log(hash)
        bcrypt.compare(password, hash, function(err, result) {
            if (err) { throw (err); }
            console.log(result);
        });
    });
})

