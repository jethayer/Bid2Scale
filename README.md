# App Walkthrough
https://youtu.be/zh2QTYzhn5s

# Bid2Scale
A collaborative web-based/App service that enables identified businesses to submit a bid response in real time in a safe and effective manner.

## Features
This project has several components, but best description is a “real time bidding” solution utilizing mobile technology to encourage participation from vendors to answer smaller dollar value (under $150,000) bids without the need to tackle cumbersome documents that may not yield the desired end result

## User Stories
* Guests: 
  * Can view available/open RFPs 
  * Can view the document required to bid
  * Can see when the RFPs closes
  * Can bid
* Users:
  * All things guests can do 
  * Can be bidders or suppliers
    * Bidders
      * Can make bids and edit their bids
      * Can save unfinished/ unsubmitted bids
    * Suppliers
      * Can post an RFPs
      * Can see all bids for their RFPs
      * Can accept bids and/or decline bids

## Frontend Routes
* /login
* /register
* /home 

## Backend Routes
BREAD
Auth
* /register
* /login

Users
* BROWSE - GET /users
* READ - GET /users/:id
* ADD - POST /users
* EDIT - PUT /users/:id
* DELETE - DELETE /users/:id

RFPs
* BROWSE - GET /bids
* READ - GET /bids/:id
* ADD - POST /bids/
* EDIT - PUT /bids/:id
* DELETE - DELETE /bids/:id 


## Stack
* React Native  
* Firebase  
* Javascript  
=======  
# Bid2Scale
