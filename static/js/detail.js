const root = document.getElementById('root');

const title = document.getElementById('title');
const content = document.getElementById('content');
const author = document.getElementById('author');


//To Extract blog post ID from url
const pathname = window.location.pathname;
const pathnameParts = pathname.split('/')
const pathID = pathnameParts[pathnameParts.length - 1]

//GET / Fetch Post
function getPostList(pathID) {
    fetch(`/api/blog/${pathID}`)
        .then(res => res.json())
        .then(data => {
            clearChildren(root);
            // Get POST Method
            renderPost(data);
            // to get author name
            getAuthor(data.author);
            //Prepopulate Form
            prepopulateForm(data)
        })
        .catch(err =>{
            console.log(err);
        })

}


function createNode(tag) {
    return document.createElement(tag)
}

function appendTag(parent, element){
    return parent.appendChild(element)
}

function clearChildren(node) {
    while (node.firstChild){
        node.removeChild(node.firstChild);
    }
}

function renderPost(post){
    const div =  createNode('div')
    div.className = 'post-item'
    const title = createNode('h2')
    title.innerText = post.title
    const content =  createNode('p')
    content.innerText = post.content;
    const publishDate = createNode('span')
    publishDate.innerText = `Published: ${new Date(post.publish_date).toDateString()}`
    const lastUpdated = createNode('span')
    lastUpdated.innerText = `Last Updated: ${new Date(post.updated).toDateString()}`


    appendTag(div, title);
    appendTag(div, content)
    appendTag(div, publishDate)
    appendTag(div, lastUpdated)
    appendTag(root, div);

    //call to append delete button function
    appendDeletebtn(post)
}

getPostList(pathID)


// Pre-Populate Form for Updating
function prepopulateForm(data) {
    title.value = data.title;
    content.value= data.content;
    author.value = data.author;
}

//Onclick Form event
document.querySelector('#postForm').addEventListener('submit', e => {
    e.preventDefault();
    updatePost(title.value, content.value,author.value);
    title.value = '';
    content.value= '';
    author.value = '';
})



// Update Method

function updatePost(title, content,author) {
    const data = {
        method: "PUT",
        headers:{
          'content-type': "application/json"
        },
        body: JSON.stringify({
            title, content,author
        })
    }
    fetch(`/api/blog/${pathID}/update`,data)
    .then(() => {
        getPostList(pathID);
    })
    .catch(err => {
        console.error(err);
    })

}

// To get Author name i.e username
function getAuthor(authorID) {

    fetch(`/api/blog/author/${authorID}`)
        .then(res => res.json())
        .then(data => {
             renderAuthor(data);
        })
        .catch(err =>{
            console.log(err);
        })

}

//Render Author
function renderAuthor(data) {
    const postDiv = document.querySelector('.post-item');
    const divs =  createNode('div')
    const authorname =  createNode('h4')
    authorname.innerText = `Written By ${data.username}`
    appendTag(divs, authorname);
    appendTag(postDiv, divs);
}


//DELETE Blog Post

function deletePost(postID) {
    const data = {
        method: "DELETE",
        headers:{
          'content-type': "application/json"
        },
    }
    // fetch(`/api/blog/${pathID}/delete`,data) this method is right too getting blog post id from global const pathID
    fetch(`/api/blog/${postID}/delete`,data)
    .then(() => {
        window.location = ('/')
    })
    .catch(err => {
        console.error(err);
    })

}


//append delete button to post item div

function appendDeletebtn(post) {
    const postDiv = document.querySelector('.post-item');
    const deletebtn =  createNode('button')
    deletebtn.innerText = 'delete';
    deletebtn.className = 'delete-btn'
    deletebtn.addEventListener('click', e => {
        deletePost(post.id)
    });
    appendTag(postDiv, deletebtn);
}

