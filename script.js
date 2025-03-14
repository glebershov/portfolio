'use strict';

let currentPage = 1;
const limit = 12;
let totalPosts = 0;

function createPostCard(post) {
    return `
            <article class="post-card">
                <h3 class="post-title">${post.title}</h3>
                <p class="post-body">${post.body}</p>
                <div class="post-meta">
                    Post ID: ${post.id} | User ID: ${post.userId}
                </div>
            </article>
            `;
}

async function loadPosts() {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts');
        if (!response.ok) throw new Error('Ошибка загрузки');

        const posts = await response.json();
        const container = document.getElementById('postsContainer');

        container.innerHTML = '';

        posts.slice(0, 12).forEach(post => { 
            container.insertAdjacentHTML('beforeend', createPostCard(post));
        });

    } catch (error) {
        document.getElementById('postsContainer').innerHTML = `
                    <div class="error" style="color: red; text-align: center;">
                        Ошибка: ${error.message}
                    </div>
                `;
    }
}

window.onload = loadPosts;