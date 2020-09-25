exports.seed = async function (knex) {
  return knex("Items").del().then(function () {
    return knex("Items").insert([
      { name: "grandma's rocking chair", image: "https://unsplash.com/photos/LzKc4LNqDGM", description: "A solid rocking chair, at least 50 years old", price: 250.00, seller_user_id: 2, auction_id: 1 },
      { name: "grandfather's favorite spoon", image: "https://unsplash.com/photos/zITJdTt5aLc", description: "A rusty old spoon", price: 10.00, seller_user_id: 2, auction_id: 1 },
      { name: "antique hardwood table", image: "https://unsplash.com/photos/QgxbZu69KTg", description: "it's mahogany", price: 750.00, seller_user_id: 2, auction_id: 1 }

    ])
  })
}
