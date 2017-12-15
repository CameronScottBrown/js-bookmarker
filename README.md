# js-bookmarker
A simple JS app that can save/delete bookmark objects to/from local storage.

index.html
=============
- uses a jumbotron bootstrap 4 template
- contains a form to enter Site Name and Site URL
- contains an empty div (id = "bookmarksResults") that is filled with bookmarks when they are added


main.js
=============
- contains an event listener for the bookmark form submission, triggers 'saveBookmark()' function
- saveBookmark() calls validateForm, which uses conditionals and regex to validate proper entries
- saveBookmark() puts valid form inputs into a bookmark object, then saves it to localStorage
- saveBookmark() clears the form, calls fetchBookmarks() to refresh the bookmarks div, and prevents default form action (POST)
- fetchBookmarks() gets local storage bookmarks, fills the bookmarksResults div with sites and buttons (visit, delete) using innerHTML
- the buttons created by fetchBookmarks include a delete button which passes the site's URL to a deleteBookmark() function
- deleteBookmark() is triggered by the delete button; it fetches localStorage bookmarks, loops through them, checks for the URL parameter within the bookmarks, and deletes a match
- after deleting the bookmark, deleteBookmark() replaces the current bookmarks into localStorage and calls fetchBookmarks() to refresh the div


style.css
=============
- this is a stock stylesheet from the bootstrap 4 narrow jumbotron example template


bootstrap.min.js , bootstrap.min.css
=======================================
- minified script and stylesheet from bootstrap 4
