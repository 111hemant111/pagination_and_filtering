/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/
   

function showPage (list, page)
    {
    const startInd = (page * num) - num;
    const endInd = page * num;
    for (let i =0; i < list.length; i++)
        {
        if ((i >= startInd) && (i < endInd))
            {
            list[i].style.display = 'inherit';
            }
        else
            list[i].style.display = 'none';
        }
    }

function appendPageLinks (list)
{
    
    const div = document.createElement('div');
    const ul = document.createElement('ul');
    const li = document.createElement('li');
    const a = document.createElement('a');
    
    div.className = 'pagination';
    a.href = '#';
    
    parentDiv.appendChild(div);
    div.appendChild(ul);
    li.appendChild(a);
    
    for (let i = 0; i<Math.floor(list.length/10) + 1; i++)
        {   
            const liClone = li.cloneNode(true);
            (liClone.querySelector('a')).textContent = i+1;
            ul.appendChild(liClone);
        }
    
    /**** Make the page number active when clicked ****/
    ul.firstChild.firstChild.className = 'active'; //Make first 'li a' active.

    const listPagin = ul.querySelectorAll('li'); //List of all list items in Pagination ul
    for (let i = 0; i < listPagin.length; i++) //Creates multiples event listeners
        {   
        listPagin[i].addEventListener('click', (event) => 
            {
            for (let j = 0; j < listPagin.length; j++)
                {   
                if (listPagin[j].firstChild.textContent === event.target.textContent)
                    {
                    listPagin[j].firstChild.className = 'active';
                    activePage = parseInt(event.target.textContent);
                    console.log(activePage);
                    showPage (list, activePage);
                    }
 
                else
                    listPagin[j].firstChild.className = '';
                }
            });
        }
    
    console.log(div.querySelector('ul'));
}

function createSearchBar (list)
{
    const form = document.createElement('form');
    const input = document.createElement('input');
    const button = document.createElement('button');
    
    form.className = 'student-search';
    input.placeholder = 'Search for students...';
    button.textContent = 'Search';
    button.type = 'submit';
    
    form.appendChild(input);
    form.appendChild(button);
    (document.querySelector('.page-header')).appendChild(form);
    
    form.addEventListener('submit', (event) => {
        event.preventDefault();
        const searched = (input.value).toLowerCase();
        const searchResultUl = document.createElement('ul');
        console.log(searched);
        //searchResultUl.className = 'student-list';
        
        for (let i = 0; i < list.length; i++)
            {   
                let currentListItem = document.querySelectorAll('.student-item ')[i];
                let currentName = (currentListItem.querySelector('div h3').textContent).toLowerCase();
                let counter = 0;
                
                for (let i = 0; i < currentName.length; i++)
                    {
                        if (currentName[i] == searched[i])
                            counter++;
                    }
                console.log(counter);
                if (counter === searched.length)
                    {
                        currentListItem.style.display = 'inherit';
                        //searchResultUl.appendChild(currentListItem);
                    }
                else
                        currentListItem.style.display = 'none';
            }
        parentDiv.appendChild(searchResultUl);
    });
}

let activePage = 1;
const parentDiv = document.querySelector('.page');
const list = document.querySelectorAll('.student-list li');
console.log(list);
const num = 10;
createSearchBar(list);
appendPageLinks (list);
showPage (list, 1);