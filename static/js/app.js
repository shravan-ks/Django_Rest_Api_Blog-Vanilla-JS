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


    appendTag(div, title);
    appendTag(div, content)
    appendTag(div, publishDate)
    appendTag(div, lastUpdated)
    appendTag(root, div);
}


getPostList()