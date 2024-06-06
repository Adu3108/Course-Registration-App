const  client  =  require("../../config");

exports.student_details = async (req, res) => {
    // var ID = req.session.message;
    var ID = req.params.ID;
    try {
        // Checking if user already exists
        const query1  =  await client.query(`SELECT * FROM student WHERE ID=$1;`, [ID]); 
        const query2 = await client.query("SELECT takes.semester, takes.year, STRING_AGG(course.title,', ') AS Courses, STRING_AGG(course.course_id, ', ') AS Course_IDs FROM student JOIN takes ON student.ID=takes.ID JOIN course ON takes.course_id=course.course_id WHERE student.ID=$1 and ((takes.semester='Fall' and takes.year!='2010') or (takes.semester!='Fall' and takes.year='2010') or (takes.semester!='Fall' and takes.year!='2010')) GROUP BY (semester, year) ORDER BY year DESC;",[ID])
        const query3 = await client.query("SELECT takes.semester, takes.year, STRING_AGG(course.title,', ') AS Courses, STRING_AGG(course.course_id, ', ') AS Course_IDs FROM student JOIN takes ON student.ID=takes.ID JOIN course ON takes.course_id=course.course_id WHERE student.ID=$1 and takes.semester='Fall' and takes.year='2010' GROUP BY (semester, year);",[ID])
        const arr  =  query1.rows;
        const previous_course = query2.rows;
        const current_course = query3.rows;
        if (arr.length  ===  0) {
            return  res.status(400).json({
                error: "ID not present. Please try again",
            });
        }
        else if (arr.length === 1) {
            return res.status(200).json({"student_details" : arr, "previous_courses" : previous_course, "current_courses": current_course});
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
