/******************************************
       List Filter and Pagination
******************************************/
   
let activePage = 1; //Page that's active
const parentDiv = document.querySelector('.page'); //Parent of heading, search bar, lists &c.
const list = document.querySelectorAll('.student-list li'); //List of all students
const num = 10; //Number of students to be displayed per page

/**** Initial display of search bar, page numbers and first page and ****/
createSearchBar(list);
appendPageLinks (list);
showPage (list, 1);

/**** Shows only num(10) list items per page ****/
function showPage (list, page)
    {
    const startInd = (page * num) - num;
    const endInd = page * num;
    for (let i =0; i < list.length; i++)
        {
        if ((i >= startInd) && (i < endInd))    //Display list items between start index and end index.
            list[i].style.display = 'inherit';
        else                                    //Hide the rest.
            list[i].style.display = 'none';
        }
    }

/**** Creates clickable page numbers, calls showPage() for page number clicked ****/
function appendPageLinks (list)
{
    //Creating elements for page numbers
    const div = document.createElement('div');
    const ul = document.createElement('ul');
    const li = document.createElement('li');
    const a = document.createElement('a');
    
    div.className = 'pagination';
    a.href = '#';
    
    //Appending the elements
    parentDiv.appendChild(div);
    div.appendChild(ul);
    li.appendChild(a);
    
    for (let i = 0; i<Math.floor(list.length/10) + 1; i++)
        {   
            const liClone = li.cloneNode(true);
            (liClone.querySelector('a')).textContent = i+1;
            ul.appendChild(liClone);
        }
    
    // Make the page number active when clicked
    ul.firstChild.firstChild.className = 'active'; //Make first 'li a' active.

    const listPagin = ul.querySelectorAll('li'); //List of all list items in Pagination ul
    for (let i = 0; i < listPagin.length; i++) //Creates multiples event listeners
        {   
        listPagin[i].addEventListener('click', (event) => 
            {
            for (let j = 0; j < listPagin.length; j++)
                {   
                if (listPagin[j].firstChild.textContent === event.target.textContent) //When a page number is clicked
                    {
                        listPagin[j].firstChild.className = 'active'; //Make a page number active
                        activePage = parseInt(event.target.textContent); //Converting page number into integer
                        showPage (list, activePage);
                    }
 
                else
                    listPagin[j].firstChild.className = ''; //Make other pages inactive
                }
            });
        }
}

/**** Creates search bar, updates the page with search results and page number links ****/
function createSearchBar (list)
{
    //Creating elements for search bar
    const form = document.createElement('form');
    const input = document.createElement('input');
    const button = document.createElement('button');
    
    //Creating error message - displayed when search results are null
    //Toggled visibility later
    const h3 = document.createElement('h3');
    h3.textContent = 'Sorry! No matches found.';
    parentDiv.appendChild(h3);
    h3.style.display = 'none';
    
    //Setting attributes
    form.className = 'student-search';
    input.placeholder = 'Search for students...';
    button.textContent = 'Search';
    button.type = 'submit';
    
    //Appending the elements to header
    form.appendChild(input);
    form.appendChild(button);
    (document.querySelector('.page-header')).appendChild(form); //Search bar appended to .page-header
    
    form.addEventListener('submit', (event) => { //When submitted (Clicking submit/hitting return key)
        event.preventDefault(); //Prevents reloading
        const searched = (input.value).toLowerCase(); //To make sure the search feature isn't case-sensitive
        
        /* Retrieves every single list item from .student-item and matches the name with the search query. If search query matches, list item is displayed, if not, it isn't displayed.*/
        for (let i = 0; i < list.length; i++)
            {   
                let currentListItem = document.querySelectorAll('.student-item')[i];
                let currentName = (currentListItem.querySelector('div h3').textContent).toLowerCase();
                let counter = 0;
                
                for (let i = 0; i < currentName.length; i++)
                    {
                        if (currentName[i] === searched[i])
                            counter++;
                    }
                if (counter === searched.length)
                    currentListItem.style.display = 'inherit';
                else
                    currentListItem.style.display = 'none';
            }
        
        const resultList = document.querySelectorAll('.student-item:not([style*="display:none"]):not([style*="display: none"])');  //NodeList of all the matched list items
        if (h3.style.display !== 'block') //No pagination on Error message --> Don't try to remove pagination again
            {
                (document.querySelector('.page')).removeChild(document.querySelector('.pagination'));
            }
        
        if (resultList.length === list.length) //When searched with empty input field
            {
                appendPageLinks (resultList);
                showPage (resultList, 1);
                h3.style.display = 'none'; //Hide error message
            }
        else if (resultList.length === 0) //When no name matches. Error message is diplayed.
            {
                h3.style.display = 'block'; //Show error message
            }
        else //At least one successful match
            {
                appendPageLinks(resultList);
                showPage (resultList, 1);
                h3.style.display = 'none'; //Hide error message
            }
            
    });
}