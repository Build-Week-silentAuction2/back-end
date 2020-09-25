const hashedPassword = "$2a$14$xz/BltA3hw.xkURJkHrUier3tPyeN636gnkqqoNKW1DO2zoPiMloW"

exports.seed = async function (knex) {
  return knex("Users").del().then(function () {
    return knex("Users").insert([
      { role_id: 1, username: "buyer1", password: hashedPassword },
      { role_id: 2, username: "seller1", password: hashedPassword },
      { role_id: 1, username: "buyer2", password: hashedPassword },
    ])
  })
}
