function getPostList() {
    fetch('api/blog')
        .then(res => res.json())
        .then(data => {
            mapPosts(data)
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

function renderPost(post){
    const root = document.getElementById('root');
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