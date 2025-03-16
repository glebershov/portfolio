'use strict';

let posts = [];
let currentPost = 0;
let totalPosts = 100;
const limit = 12;
let showOnlyLikes = false;

const container = document.getElementById('postsContainer');

container.addEventListener('click', (e) => {
    if (e.target.classList.contains('like-btn')) {
        const postId = parseInt(e.target.dataset.postId);
        const post = posts.find(p => p.id === postId);
        if (post) {
            post.likes = !post.likes;
            e.target.classList.toggle('active', post.likes);
            e.target.textContent = post.likes ? 'Liked ♥' : 'Like ♡';
        }
    }
});

function createPostCard(post) {
    return `
        <article class="post-card">
            <h3 class="post-title">${post.title}</h3>
            <p class="post-body">${post.body}</p>
            <div class="post-meta">
                Post ID: ${post.id} | User ID: ${post.userId}
                <button class="like-btn ${post.likes ? 'active' : ''}" 
                        data-post-id="${post.id}"
                        style="margin-left: 10px; cursor: pointer;">
                    ${post.likes ? 'Liked ♥' : 'Like ♡'}
                </button>
            </div>
        </article>
    `;
}

async function loadPosts(containerPosts) {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts');
        if (!response.ok) throw new Error('Ошибка загрузки');

        posts = await response.json();
        posts = posts.map(post => ({
            ...post,
            likes: false
        }));
        containerPosts.innerHTML = '';
        showPostCard();
    } catch (error) {
        containerPosts.innerHTML = `
            <div class="error" style="color: red; text-align: center;">
                Ошибка: ${error.message}
            </div>
        `;
    }
}

function renderPosts() {
    container.innerHTML = '';
    const postsToShow = showOnlyLikes ?
        posts.filter(post => post.likes) :
        posts.slice(0, currentPost);

    postsToShow.forEach(post => {
        container.insertAdjacentHTML('beforeend', createPostCard(post));
    });
}

function showPostCard() {
    if (showOnlyLikes) return;

    const nextPost = currentPost + limit;
    currentPost = Math.min(nextPost, totalPosts);
    renderPosts();
}


document.getElementById('showLikes').addEventListener('click', function () {
    showOnlyLikes = !showOnlyLikes;
    this.textContent = showOnlyLikes ? 'Show All Posts' : 'Show Liked Posts';
    renderPosts();
});

document.getElementById('loadPost').addEventListener('click', showPostCard);
window.onload = () => loadPosts(container);