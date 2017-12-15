//listen for form submit
document.getElementById('myForm').addEventListener('submit', saveBookmark);

//save bookmark
function saveBookmark(e){
    //get form values
    var siteName = document.getElementById('siteName').value;
    var siteUrl = document.getElementById('siteUrl').value;
    
    //validate
    if(!validateForm(siteName, siteUrl)) {
        return false;
    }
    
    //prepare an object to submit to local storage
    var bookmark = {
        name: siteName,
        url: siteUrl
    }
/*  
    TESTING
    
    //local storage test
    localStorage.setItem('test','Hello World');
    localStorage.getItem('test');
    localStorage.removeItem('test');
    console.log(localStorage.getItem('test'));
*/
    
    //check if bookmarks is null
    if(localStorage.getItem('bookmarks') === null){
        
        //initialize bookmarks array
        var bookmarks = [];
        
        //add current bookmark to array
        bookmarks.push(bookmark);
        
        //sync bookmarks array to local storage
            //format is a string-formatted JSON array
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    } else {    //the bookmarks array already exists
        //fetch current bookmarks array from localStorage
            //reformat to an array using JSON parse
        var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
        
        //add current bookmark to array
        bookmarks.push(bookmark);
        
        //sync bookmarks array to local storage
            //format is a string-formatted JSON array
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
        
    }     
    
    //clear form after submitting
    document.getElementById('myForm').reset();
    
    
    //re-fetch bookmarks
    fetchBookmarks();
    
    
    //prevent form submission
    e.preventDefault();
}


//delete bookmark function
function deleteBookmark(url){
    
    //fetch current bookmarks array from localStorage
        //reformat to an array using JSON parse
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    
    //loop through them, check if url matches 
    for(var i=0; i < bookmarks.length; i++) {
        if (bookmarks[i].url == url) {
            
            //deletes by splicing at i, removes 1 object
            bookmarks.splice(i, 1);
        }
    }
    
    
    //resaving to localStorage
    //sync bookmarks array to local storage
        //format is a string-formatted JSON array
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    
    //re-fetch bookmark storage
    fetchBookmarks();
    
}









//to show the bookmarks, we need a new function to get them
function fetchBookmarks() {
    //fetch current bookmarks array from localStorage
        //reformat to an array using JSON parse
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));

    //get output ID
    var bookmarksResults = document.getElementById('bookmarksResults');
    
    //clear out the div so nothing is in it
    bookmarksResults.innerHTML='';
    
    //iterate through bookmarks, put them in div
    for(var i=0; i < bookmarks.length; i++){
        var name = bookmarks[i].name;
        var url = bookmarks[i].url;
        
        //build output
        bookmarksResults.innerHTML += '<div class="container">'+
                                        '<h3>'+name+
                                        '<a class="btn btn-success" target="_blank" '+
                                        'href="'+url+'">Visit'+'</a>'+
                                        '<a class="btn btn-danger"'+
                                        'onclick="deleteBookmark(\''+url+'\')"'+   //function link to delete, passes url
                                        'href="#">Delete'+'</a>'+
                                        '</a>'+
                                        '</h3></div>';
        
    }
}


function validateForm(siteName, siteUrl) {
    //validation of content
    if (!siteName || !siteUrl) {
        alert('Please enter a Site Name and Site URL to bookmark.');
        return false;
    }
    
    //regular expression for an http or https prefixed URL
    var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
    
    //create a regex object using the above expression
    var regex = new RegExp(expression);
    
    //checks if siteUrl fits the constraints of the regular expression object
    //via the String prototype match method
    if(!siteUrl.match(regex)){
        alert('Please enter a valid Site URL (i.e. "http://www.website.com")');
        return false;
    }
    
    return true;
}