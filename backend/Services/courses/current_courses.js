const  client  =  require("../../config");

exports.current_courses = async (req, res) => {
    try {
        // Checking if user already exists
        const data  =  await client.query(`SELECT course.course_id, course.title, section.sec_id FROM course JOIN section ON course.course_id=section.course_id WHERE section.semester='Fall' and section.year='2010';`);
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