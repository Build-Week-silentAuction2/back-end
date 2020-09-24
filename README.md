# back-end
Unit 4 Repository


Authentication
    -- Use JWT and Tokens -- DONE

USERS Router/models
 * Login -- DONE
 * Register -- Gui -- DONE


Auction Router/models
 * CRUD Auction
 -- Def: One auction that holds multiple items for buyers to bid on. Only Seller can start an Auction and only 1 auction can be active at a time.

-- Kirsten -- DONE

Bids Router/models
 * Create/Delete Bid

-- Kirsten 

Items Router/models
 * CRUD items

-- Gui 

Middleware
 * restrict roles
    - only sellers can update auctions
-- Together -- DONE

Seed
 -- Kirsten -- DONE




 ---- END-Points ----

  -- Users --

URL: https://silent-auction-september.herokuapp.com/users
POST: "/login" 
   Body: { "username": "testuser7", "password": "123" }
POST: "/register"
  Body: { "role_id": INTEGER, "username": STRING, "password": STRING }
GET: "/" 
  This gets all users

 -- Auction --

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

 -- Items --

URL: https://silent-auction-september.herokuapp.com/items
GET: "/"
  Gets all info about Auction
GET: "/:id" 
  Gets item by ID
GET: "/seller/:id"
  Gets all items under a seller
GET: "/auction/:id"
  Gets items in the auction
POST: "/"
  Posts new items

-- Bids -- 
URL: https://silent-auction-september.herokuapp.com
GET: "/bids"
  gets all bids
GET: "/bids/:id"
  Gets specific bid
GET: "/items/:item_id/bids"
  Gets all bids for specific item
POST: "/items/:item_id/bids"
  Posts new bid for specific item
DELETE: "/items/:item_id/bids/:id"
  Delete specific bid
PUT: "/items/:item_id/bids/:id"
  Edits specific bid

