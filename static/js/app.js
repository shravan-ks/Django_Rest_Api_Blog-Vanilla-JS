const root = document.getElementById('root');


//POST / Create Post
document.querySelector('#postForm').addEventListener('submit', e => {
    e.preventDefault();
    const title = document.getElementById('title');
    const content = document.getElementById('content');
    const author = document.getElementById('author');
    createPost(title.value, content.value,author.value);
    title.value = '';
    content.value= '';
    author.value = '';
})


function createPost(title, content,author) {
    const data = {
        method: "POST",
        headers:{
          'content-type': "application/json"
        },
        body: JSON.stringify({
            title, content,author
        })
    }
    fetch('api/blog/create',data)
    .then(() => {
        getPostList();
    })
    .catch(err => {
        console.error(err);
    })

}


//GET / Fetch Post
function getPostList() {
    fetch('api/blog/')
        .then(res => res.json())
        .then(data => {
            clearChildren(root);
            mapPosts(data);

        })
        .catch(err =>{
            console.log(err);
        })

}

function mapPosts(data){
    return data.map(post => {
        renderPost(post);
         getAuthor(post.author);

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
    const detailLink = createNode('a')
    detailLink.href = `/blog/${post.id}`
    const title = createNode('h2')
    appendTag(detailLink, title)
    const author = createNode('small')
    author.innerText = ` written by ${post.author}`;
    title.innerText = post.title
    appendTag(title, author)
    const content =  createNode('p')
    content.innerText = post.content;
    const publishDate = createNode('span')
    publishDate.innerText = `Published: ${new Date(post.publish_date).toDateString()}`
    const lastUpdated = createNode('span')
    lastUpdated.innerText = `Last Updated: ${new Date(post.updated).toDateString()}`
    // const div_author =  createNode('div')
    // div_author.className = 'post-author'

    appendTag(div, detailLink);
    appendTag(div, content)
    appendTag(div, publishDate)
    appendTag(div, lastUpdated)
    // appendTag(div, div_author);
    appendTag(root, div);


}


getPostList()


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
    const authorname =  createNode('h4')
    authorname.innerText = `Written By ${data.username}`
    appendTag(postDiv, authorname);
    appendTag(root, postDiv);
}