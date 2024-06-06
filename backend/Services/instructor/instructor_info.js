const  client  =  require("../../config");

exports.instructor_info = async (req, res) => {
    var tID = req.params.instructor_id
    try {
        // Checking if user already exists
        const data  =  await client.query(`SELECT name, dept_name FROM instructor WHERE ID=$1;`, [tID]);
        const current_courses = await client.query("SELECT teaches.course_id, course.title FROM teaches JOIN course ON teaches.course_id=course.course_id WHERE teaches.ID=$1 and teaches.semester='Fall' and teaches.year='2010' ORDER BY teaches.course_id;", [tID]);
        const previous_courses = await client.query("SELECT teaches.course_id, course.title FROM teaches JOIN course ON teaches.course_id=course.course_id WHERE teaches.ID=$1 and ((teaches.semester='Fall' and teaches.year!='2010') or (teaches.semester!='Fall' and teaches.year='2010') or (teaches.semester!='Fall' and teaches.year!='2010')) ORDER BY teaches.year DESC, teaches.semester DESC;", [tID]);
        const arr  =  data.rows;
        const current_course_list = current_courses.rows;
        const previous_course_list = previous_courses.rows;
        if (arr.length  ===  0) {
            return  res.status(400).json({
                error: "ID not present. Please try again",
            });
        }
        else {
            return res.status(200).json({"InstructorInfo" : arr, "CurrentCourses" : current_course_list, "PreviousCourses" : previous_course_list});
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
