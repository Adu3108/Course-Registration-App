const  client  =  require("../../config");

exports.drop_course = async (req, res) => {
    const {ID, cID} = req.body;
    try {
        const delete_course = await client.query(`DELETE FROM takes WHERE takes.semester='Fall' and takes.year='2010' and takes.course_id=$1 and takes.id=$2;`, [cID, ID]);
        res.status(200).json({
            message: "You have succesfully dropped this course",
        });
    }
    // Database connection error
    catch (err) {
        console.log(err);
        res.status(500).json({
            error: "Database error while registring user!", 
        });
    };
}