const handleProfile = (req, res, db) => {
  const { id } = req.params;
  console.log(id);

  db("users")
    .select("*")
    .where({ id })
    .then((user) => {
      user.length
        ? res.json(user[0])
        : res.status("400").json("user not found");
    })

    .catch((err) => res.status("400").json(err));
};

const handleProfileUpdate = (req, res, db) => {
  const { id } = req.params;
  const { name, age, pet } = req.body.formInput;

  var ageInt = parseInt(age);
  console.log("handling profile update", id, name, age, pet, ageInt);

  db("users")
    .update({ name: name, pet: pet, age: ageInt })
    //.values(name, pet, ageInt)
    //.update({ name, age, pet })
    .where({ id })
    .then((resp) => {
      resp
        ? res.json("update success")
        : res.status("400").json("update failed");
    })

    .catch((err) => res.status("400").json(err));
};

module.exports = {
  handleProfile: handleProfile,
  handleProfileUpdate: handleProfileUpdate,
};
