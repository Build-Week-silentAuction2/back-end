# back-end
Unit 4 Repository


Authentication
    -- Use JWT and Tokens -- Done

USERS Router/models
 * Login -- Done
 * Register -- Gui


Auction Router/models
 * CRUD Auction
 -- Def: One auction that holds multiple items for buyers to bid on. Only Seller can start an Auction and only 1 auction can be active at a time.

-- Kirsten

Bids Router/models
 * Create/Delete Bid

-- Kirsten

Items Router/models
 * CRUD items

-- Gui

Middleware
 * restrict roles
    - only sellers can update auctions
-- Together

Seed
 -- Kirsten

9/20/20 NOTE: 
 -- Image column in Items table needs to be updated to store images - remigrate or new migration
 -- Items seed file needs to be updated with images


 ---- END-Points ----

URL: https://silent-auction-september.herokuapp.com/users
POST: "/login" 
   Body: { "username": "testuser7", "password": "123" }
POST: "/register"
  Body: { "role_id": INTEGER, "username": STRING, "password": STRING }
GET: "/" 
  This gets all users

URL: https://silent-auction-september.herokuapp.com/auction
GET: "/"
  Gets all auctions
GET: "/:id"
  Gets auction by id
POST: "/"
  Creates new auction
  BODY: { "user_id": INTEGER, "name": STRING, "exp_date": STRING (mm-dd-yyyy) }
DELETE: "/:id"
PUT: "/:id"
  BODY: { "user_id": INTEGER, "name": STRING, "exp_date": STRING (mm-dd-yyyy) }