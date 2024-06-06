const  client  =  require("../../config");

exports.department_course_list = async (req, res) => {
    var dept_name = req.params.dept_name;
    try {
        // Checking if user already exists
        const data  =  await client.query(`SELECT title, course_id FROM course WHERE dept_name=$1;`, [dept_name]);
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