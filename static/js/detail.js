const root = document.getElementById('root');

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
            renderPost(data);
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


getPostList(pathID)