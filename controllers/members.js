const fs = require("fs");
const data = require("../data.json");
const { date } = require("../utils");

exports.index = function (req, res) {
  return res.render("members/index", { members: data.member });
};

//show

exports.show = function (req, res) {
  const { id } = req.params;

  const foundMember = data.member.find(function (member) {
    return member.id == id;
  });

  if (!foundMember) return res.send("Instrutor Não Encontrado!");

  const member = {
    ...foundMember,
    birth: date(foundMember.birth).birthDay,
  };

  return res.render("members/show", { member });
};
//create

exports.create = function (req, res) {
  return res.render("members/create");
};

//post
exports.post = function (req, res) {
  const keys = Object.keys(req.body);

  for (key of keys) {
    if (req.body[key] == "") {
      return res.send("Por favor, preencha todos os campos do formulário!");
    }
  }

  birth = Date.parse(req.body.birth);

  let id = 1;
  const lastMember = data.member[data.member.length - 1];

  if (lastMember) {
    id = lastMember.id + 1;
  }

  data.member.push({
    id,
    ...req.body,
    birth,
  });

  fs.writeFile("data.json", JSON.stringify(data, null, 2), function (err) {
    if (err) return res.send("Write File ERROR!");

    return res.redirect("/members");
  });
};

//edit

exports.edit = function (req, res) {
  const { id } = req.params;

  const foundMember = data.member.find(function (member) {
    return member.id == id;
  });

  if (!foundMember) return res.send("Instrutor Não Encontrado!");

  const member = {
    ...foundMember,
    birth: date(foundMember.birth).iso,
  };

  date(foundMember.birth);

  return res.render("members/edit", { member: member });
};
//put
exports.put = function (req, res) {
  const { id } = req.body;
  let = index = 0;

  const foundMember = data.member.find(function (member, foundIndex) {
    if (member.id == id);
    index = foundIndex;
    return true;
  });

  if (!foundMember) return res.send("Instrutor Não Encontrado!");

  const member = {
    ...foundMember,
    ...req.body,
    birth: Date.parse(req.body.birth),
    id: Number(req.body.id),
  };

  data.member[index] = member;

  fs.writeFile("data.json", JSON.stringify(data, null, 2), function (err) {
    if (err) return res.send("Write Error!");

    return res.redirect(`/members/${id}`);
  });
};
//delete
exports.delete = function (req, res) {
  const { id } = req.body;

  const filteredMembers = data.member.filter(function (member) {
    return id != member.id;
  });

  data.member = filteredMembers;

  fs.writeFile("data.json", JSON.stringify(data, null, 2), function (err) {
    if (err) return res.send("Write File error!");

    return res.redirect("/members");
  });
};
