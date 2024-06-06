const  client  =  require("../../config");

exports.course_list = async (req, res) => {
    try {
        // Checking if user already exists
        const data  =  await client.query(`SELECT title FROM course;`);
        const arr  =  data.rows;
        if (arr.length  ===  0) {
            return  res.status(400).json({
                error: "ID not present. Please try again",
            });
        }
        else {
            return res.status(200).json(arr);
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