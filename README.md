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