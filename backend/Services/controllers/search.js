const  client  =  require("../../config");

exports.search = async (req, res) => {
    const {search_term} = req.body;
    try {
        // Checking if user already exists
        let text = `%${search_term}%`;
        const query1  =  await client.query("SELECT course.course_id, course.title, section.sec_id FROM course JOIN section ON course.course_id=section.course_id WHERE section.semester='Fall' and section.year='2010' and course.course_id ilike $1;", [text]);
        const query2  =  await client.query("SELECT course.course_id, course.title, section.sec_id FROM course JOIN section ON course.course_id=section.course_id WHERE section.semester='Fall' and section.year='2010' and course.title ilike $1;", [text]);
        const arr1  =  query1.rows;
        const arr2 =  query2.rows;
        
        var similar_courses = [];
        for (let i = 0; i < arr1.length; i++) {
            similar_courses.push(arr1[i]);
        }
        for (let i = 0; i < arr2.length; i++) {
            similar_courses.push(arr2[i]);
        }

        if (similar_courses.length  ===  0) {
            return  res.status(400).json({
                error: "No similar courses for this search. Please try again",
            });
        }
        else {
            return res.status(200).json(similar_courses); 
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