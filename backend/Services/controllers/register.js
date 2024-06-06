const  bcrypt  =  require("bcrypt");

const  client  =  require("../../config");

exports.register  =  async (req, res) => {
    const { ID, password } =  req.body;
    try {
        // Checking if user already exists
        const  data  =  await client.query(`SELECT * FROM user_password WHERE ID=$1;`, [ID]); 
        const  arr  =  data.rows;
        if (arr.length  !=  0) {
            return  res.status(400).json({
                error: "ID already there, No need to register again.",
            });
        }
        else {
            bcrypt.hash(password, 10, (err, hash) => {
                if (err)
                    res.status(err).json({
                        error: "Server error",
                    });
                const  user  = {
                    ID,
                    password: hash,
                };

                // Inserting data into the database
                client.query(`INSERT INTO user_password (ID, hashed_password) VALUES ($1, $2);`, [user.ID, user.password], (err) => {
                    if (err) {
                        console.error(err);
                        return  res.status(500).json({
                            error: "Database error"
                        })
                    }
                    else {
                        // res.status(200).send({ message: 'User added to database, not verified' });
                        return res.redirect('/user/login');
                    }
                })
            });
        }
    }
    // Database connection error
    catch (err) {
        console.log(err);
        res.status(500).json({
            error: "Database error while registring user!", 
        });
    };
}