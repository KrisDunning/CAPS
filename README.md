# Lab 13: CAPS

## Authors: Kris Dunning

## Contributer: Keelen Fisher - Queue structure and function.

## Project Name: CAPS

## Project Idea

- A customer places an order with a store and the store requests a delivery driver to deliver the package. The driver updates when in transit and when delivered. Store receives delivery confirmation.

## How To Run Lab

- Open 3 terminal windows.
- The Server/Hub terminal will run inside the server directory. Type "node index.js"
- The driver terminal will run inside the driver directory directory. Type "node index.js"
- The store terminal will run inside the vendor directory. Type "node index.js"

The store transmits a new order every 5 seconds. The hub will track the orders and store them into a queue. The driver will transmit a in transit and delivered message. The store will respond to delivery confirmation with a
"Thank you Customer Name" message.
