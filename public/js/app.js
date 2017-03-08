(function () {
  'use strict';
})();

$(document).ready( () => {

  const $results = $('.wikiResults');
  const $input = $('.searchInput');
  const $buttonSearch = $('.searchButton');
  const $clearButton = $('.removeItems');

  $input.on('keydown', (e) => {
    // e(vent).which normalizes e.keyCode and e.charCode
    if (e.which === 13) {
      searchQuery();
      clearInput();
    }
  });

  $buttonSearch.on('click', () => {
    searchQuery();
    clearInput();
  });

  // Clears (removes) all results
  $clearButton.on('click', () => {
    $('.clear').remove();
    clearInput();
  });

  function clearInput() {
    $input.focus().val('');
  }

  // Allows user to remove one item at a time
  $results.on('click', (e) => {
    if (e.target.nodeName === 'BUTTON') {
      $(e.target).parent('.itemStyle').remove();
    }
  });

  function searchQuery() {
    const searchInput = $input.val();
    const url = 'https://en.wikipedia.org/w/api.php?action=opensearch&search='+ searchInput +'&format=json&callback=?';
         
    $.ajax( {
      url: url, // Where the request is going
      type: 'GET', // HTTP method  
      dataType: 'json',
      success: (data) => { 
        for (let i = 0; i < data[1].length; i++) {
          // Store results in variables
          let data3 = data[3][i]; // href
          let data1 = data[1][i]; // <h2>
          let data2 = data[2][i]; // <p>

          // Put most recent searches first
          $results.prepend(
            // Divide results into hrefs, headings, and paragraphs
              // Also, have button with letter x, so that user can delete one item (or more)
                // target='_blank' allows user to click a link and not lose searches
            `<div class="itemStyle clear">
              <button>x</button><a href=${data3} target="_blank">
                <h2>${data1}</h2>
                <p>${data2}</p>
              </a>
            </div>`);
        }    
      }
    });
  }

}); // .ready()
