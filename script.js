
const rootDiv = document.getElementById('root');

function renderSignUp() {
    rootDiv.innerHTML = `
        <h1>Sign Up</h1>
        <form id="signupForm">
            <div class="form-group">
                <label for="name">Name:</label>
                <input type="text" id="name" placeholder="Enter your name">
            </div>
            <div class="form-group">
                <label for="email">Email:</label>
                <input type="email" id="email" placeholder="Enter your email">
            </div>
            <div class="form-group">
                <label for="password">Password:</label>
                <input type="password" id="password" placeholder="Enter your password">
            </div>
            <button type="button" class="btn-primary" onclick="handleSignUp()">Sign Up</button>
        </form>
    `;
}

let userName = '';

function handleSignUp() {
    const nameInput = document.getElementById('name').value;
    const emailInput = document.getElementById('email').value;
    const passwordInput = document.getElementById('password').value;

    if (nameInput && emailInput && passwordInput) {
        userName = nameInput; // Store == name
        localStorage.setItem('userName', userName); //==storage
        renderHomePage(); // Render the home page
    } else {
        alert('Please fill out all fields');
    }
}

function renderHomePage() {
    userName = localStorage.getItem('userName') || userName; // local storage
    rootDiv.innerHTML = `
        <h1>Welcome, ${userName}!</h1>
        <h2>Create a Post</h2>
        <textarea id="postContent" placeholder="What's on your mind?"></textarea><br>
        <button type="button" class="btn-success" onclick="handleCreatePost()">Post</button>
        <h3>Your Posts</h3>
        <ul id="postList" class="list-group"></ul>
    `;

    // Load posts (This is with the same one))
    posts = JSON.parse(localStorage.getItem('posts')) || [];
    renderPostList(); 
}

let posts = [];

function handleCreatePost() {
    const postContent = document.getElementById('postContent').value;

    if (postContent) {
        posts.push(postContent); // new post
        localStorage.setItem('posts', JSON.stringify(posts)); // Save (same thing) storage
        renderPostList(); // list of everything 
    } else {
        alert('Post content cannot be empty');
    }
}

function renderPostList() {
    const postListElement = document.getElementById('postList');
    postListElement.innerHTML = '';

    for (let i = 0; i < posts.length; i++) {
        const postItem = document.createElement('li');
        postItem.className = 'list-group-item';
        postItem.textContent = posts[i];

        //Edit 
        const editButton = document.createElement('button');
        editButton.textContent = 'Edit';
        editButton.className = 'btn-secondary';
        editButton.onclick = (function(index) {
            return function() {
                const newContent = prompt("Edit your post:", posts[index]);
                if (newContent) {
                    posts[index] = newContent; 
                    localStorage.setItem('posts', JSON.stringify(posts)); // Save storage
                    renderPostList(); //list
                }
            };
        })(i);

        //  Delete 
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.className = 'btn-danger';
        deleteButton.onclick = (function(index) {
            return function() {
                if (confirm("Are you sure you want to delete this post?")) {
                    posts.splice(index, 1); 
                    localStorage.setItem('posts', JSON.stringify(posts)); // Save storage
                    renderPostList(); // list
                }
            };
        })(i);

        postItem.appendChild(editButton);
        postItem.appendChild(deleteButton);
        postListElement.appendChild(postItem);
    }
}

// step 
document.addEventListener("DOMContentLoaded", function() {
    renderSignUp();
});
