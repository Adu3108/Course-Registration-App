const client = require("../../config");

//Login Function
exports.course_reg = async (req, res) => {
    const {ID, cID, section} = req.body;
    try {
        const query1 = await client.query("SELECT takes.course_id FROM takes WHERE takes.ID=$1;",[ID]);
        const query2 = await client.query('SELECT prereq.prereq_id FROM prereq WHERE prereq.course_id=$1;', [cID]);

        const r1 = query1.rows;
        var courses_done = [];
        for (let i = 0; i < r1.length; i++) {
            courses_done.push(r1[i].course_id);
        }

        const r2 = query2.rows;
        var prereqs = [];
        for (let i = 0; i < r2.length; i++) {
            prereqs.push(r2[i].course_id);
        }

        const already_done = courses_done.includes(cID);

        const prereqs_satisfied = prereqs.every(val => courses_done.includes(val));

        if (already_done) {
            res.status(200).json({
                message: "This course has already been completed by you",
            });
        }
        else{
            if(prereqs_satisfied){
                const entry = await client.query(`insert into takes values($1, $2, $3, 'Fall', '2010', '');`, [ID, cID, section]);
                res.status(200).json({
                    message: "You have succesfully registered for this course",
                });
            }
            else{
                res.status(200).json({
                    message: "You don't satisfy the prerequisites for this course",
                });
            }
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({
            error: "Database error occurred while registering!", 
        });
    };
};