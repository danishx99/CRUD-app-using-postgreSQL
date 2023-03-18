const pool = require("../../db");
const queries = require("./queries");

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const getAllStudents = async (req, res) => {
  const students = await prisma.students
    .findMany()
    .catch((err) => console.log(err.message));
  res.status(200).json(students);
};

const getStudentById = async (req, res) => {
  const id = parseInt(req.params.id);
  const student = await prisma.students
    .findUnique({
      where: {
        id: id,
      },
    })
    .catch((err) => console.log(err.message));
  res.status(200).json(student);
};

const addStudent = async (req, res) => {
  const { name, email, age, dob } = req.body;

  const createStudent = await prisma.students
    .create({
      data: {
        name,
        email,
        age,
        dob: new Date(dob),
      },
    })
    .catch((err) => console.log(err.message))
    .then(res.status(200).send("User successfully created."));
};

const deleteStudent = async (req, res) => {
  const id = parseInt(req.params.id);

  const deleteStudent = await prisma.students
    .delete({
      where: {
        id: id,
      },
    })
    .catch((err) => console.log(err.message))
    .then(res.status(200).send("User sucessfully deleted"));
};

const updateStudent = async (req, res) => {
  const id = parseInt(req.params.id);
  const { email } = req.body;

  const updateStudent = await prisma.students
    .update({
      where: {
        id,
      },
      data: {
        email,
      },
    })
    .catch((err) => console.log(err.message))
    .finally(res.send("User sucessfully updated."));
};

async function main() {
  // ... you will write your Prisma Client queries here
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });

// const getStudents = (req, res) => {
//   pool.query(queries.getStudents, (err, result) => {
//     if (err) throw err;
//     res.status(200).json(result.rows);
//   });
// };

// const getStudentById = (req, res) => {
//   const id = parseInt(req.params.id);
//   pool.query(queries.getStudentById, [id], (err, result) => {
//     if (err) throw err;
//     res.status(200).json(result.rows);
//   });
// };

// const addStudent = (req, res) => {
//   const { name, email, age, dob } = req.body;
//   //validate email
//   pool.query(queries.checkEmailExists, [email], (err, results) => {
//     if (err) throw err.message;
//     if (results.rows.length) {
//       res.send("Email already exists.");
//     }
//     //add student
//     pool.query(queries.addStudent, [name, email, age, dob], (err, result) => {
//       if (err) throw err;
//       res.status(201).send("Student sucessfully added.");
//     });
//   });
// };

// const deleteStudent = (req, res) => {
//   const id = parseInt(req.params.id);

//   pool.query(queries.getStudentById, [id], (err, result) => {
//     const noStudentFound = !result.rows.length;
//     if (noStudentFound) res.send("Student does not exist.");

//     pool.query(queries.removeStudent, [id], (err, result) => {
//       if (err) throw err;
//       res.status(200).send("Student successfully deleted.");
//     });
//   });
// };

// const updateStudent = (req, res) => {
//   const id = parseInt(req.params.id);
//   const { name } = req.body;

//   pool.query(queries.getStudentById, [id], (err, result) => {
//     const noStudentFound = !result.rows.length;
//     if (noStudentFound) res.send("Student does not exist.");

//     pool.query(queries.updateStudent, [name, id], (err, result) => {
//       if (err) throw err;
//       res.status(200).send("Student updated successfully.");
//     });
//   });
// };

module.exports = {
  getAllStudents,
  getStudentById,
  addStudent,
  deleteStudent,
  updateStudent,
};
