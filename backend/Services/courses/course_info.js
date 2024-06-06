const  client  =  require("../../config");

exports.course_info = async (req, res) => {
    var cID = req.params.course_id
    try {
        // Checking if user already exists
        const data  =  await client.query(`SELECT course.course_id, course.title, course.credits FROM course WHERE course.course_id=$1;`, [cID]);
        const prereqs = await client.query('WITH a(id) AS (SELECT prereq.prereq_id FROM course JOIN prereq ON course.course_id=prereq.course_id WHERE course.course_id=$1) SELECT course.title, course.course_id FROM a JOIN course ON course.course_id=a.id;', [cID]);
        const instructor = await client.query('SELECT instructor.name, instructor.ID FROM teaches JOIN instructor ON teaches.ID=instructor.ID WHERE teaches.course_id=$1;', [cID])
        const arr  =  data.rows;
        const prereq_arr = prereqs.rows;
        const instructor_arr = instructor.rows;
        if (arr.length  ===  0) {
            return  res.status(400).json({
                error: "ID not present. Please try again",
            });
        }
        else {
            return res.status(200).json({"course" : arr, "prereq" : prereq_arr, "instructor" : instructor_arr});
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