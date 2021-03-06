const fs = require("fs");
const data = require("../data.json");
const { age, date } = require("../utils");

exports.index = function (req, res) {
  return res.render("instructors/index", { instructors: data.instructor });
};

//show

exports.show = function (req, res) {
  const { id } = req.params;

  const foundInstructor = data.instructor.find(function (instructor) {
    return instructor.id == id;
  });

  if (!foundInstructor) return res.send("Instrutor Não Encontrado!");

  const instructor = {
    ...foundInstructor,
    age: age(foundInstructor.birth),
    services: foundInstructor.services.split(","),
    created_at: new Intl.DateTimeFormat("pt-br").format(
      foundInstructor.created_at
    ),
  };

  return res.render("instructors/show", { instructor });
};

//create
exports.create = function (req, res) {
  return res.render("instructors/create");
};

//post
exports.post = function (req, res) {
  const keys = Object.keys(req.body);

  for (key of keys) {
    if (req.body[key] == "") {
      return res.send("Por favor, preencha todos os campos do formulário!");
    }
  }

  let { avatar_url, birth, name, services, gender } = req.body;

  birth = Date.parse(birth);
  const created_at = Date.now();
  const id = Number(data.instructor.length + 1);

  data.instructor.push({
    id,
    avatar_url,
    name,
    birth,
    gender,
    services,
    created_at,
  });

  fs.writeFile("data.json", JSON.stringify(data, null, 2), function (err) {
    if (err) return res.send("Write File ERROR!");

    return res.redirect("/instructors");
  });
};

//edit

exports.edit = function (req, res) {
  const { id } = req.params;

  const foundInstructor = data.instructor.find(function (instructor) {
    return instructor.id == id;
  });

  if (!foundInstructor) return res.send("Instrutor Não Encontrado!");

  const instructor = {
    ...foundInstructor,
    birth: date(foundInstructor.birth).iso,
  };

  date(foundInstructor.birth);

  return res.render("instructors/edit", { instructor: instructor });
};
//put
exports.put = function (req, res) {
  const { id } = req.body;
  let = index = 0;

  const foundInstructor = data.instructor.find(function (
    instructor,
    foundIndex
  ) {
    if (instructor.id == id);
    index = foundIndex;
    return true;
  });

  if (!foundInstructor) return res.send("Instrutor Não Encontrado!");

  const instructor = {
    ...foundInstructor,
    ...req.body,
    birth: Date.parse(req.body.birth),
    id: Number(req.body.id),
  };

  data.instructor[index] = instructor;

  fs.writeFile("data.json", JSON.stringify(data, null, 2), function (err) {
    if (err) return res.send("Write Error!");

    return res.redirect(`/instructors/${id}`);
  });
};
//delete
exports.delete = function (req, res) {
  const { id } = req.body;

  const filteredInstructors = data.instructor.filter(function (instructor) {
    return id != instructor.id;
  });

  data.instructor = filteredInstructors;

  fs.writeFile("data.json", JSON.stringify(data, null, 2), function (err) {
    if (err) return res.send("Write File error!");

    return res.redirect("/instructors");
  });
};
