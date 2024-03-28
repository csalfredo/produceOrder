# Produce App Requirements

## Overview

This is a web app (single-page application) which will have a few main screens:

1.  Create Purchase Order
2.  Confirm Order
3.  Thank You

The app will be built using Next.js, NextUI and TailwindCSS.

## Create Purchase Order

On this screen, we want users to be able to use a search box to find items to add to the purchase order.

The search box will show autocomplete listings as the user types what they want. For example, if the user types "Ap", autocomplete entries for "Apples", "Apricots", etc will appear. When a user clicks on an autocomplete entry, the item will be added to the list section.

Each row in the list section represents an item to be purchased, and will include:

- Title
- Image
- Product code
- Quantity
- Price per case
- Case size
- Promo price
- Delete button
- In Stock / Out of Stock

Below the list section, there will be a Subtotal. The subtotal will take into account the prices and quantities of the items on the purchase order.

There should be a Next button, which the user will click after they are done.

## Confirm Order

This page will present much of the same information that was on the Create Purchase Order page. However, the Confirm Order page will not have the ability to edit items. Instead, the list items will be more compact so that the user can easily see more items at a time. This page will show all the items to be ordered, as well as the total cost of all items (taking into account the item quantities).

This Confirm Order page will also have a field for the user's email address, and a button that says "Place Order". Before the user is allowed to place an order, it is required for them to provide an email address. The email address can be weakly validated (e.g. it has an at-sign and a domain name, but typos are not checked for).

The email will be sent using Formspree.io. If the API indicates a successful submission, the user will be shown the Thank You page. If the API response does not indicate success, the user should be shown an error message (instead of being navigated to the Thank You page).

## Thank You

The Thank You page will inform the user that their submission was successfully received. It should include the user's email address, order total, and the date and time (that the order was placed).

The user will have the option to press a "Create Another Purchase Order" button to start the process over again (from the first screen) with an empty list.
