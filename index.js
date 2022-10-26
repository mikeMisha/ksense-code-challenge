class App {
  constructor() {
    this.usersList = document.getElementById('users-list');
    this.postsList = document.getElementById('posts-list');
    this.postsBackBtn = document.getElementById('back-btn');
    this.headerTitle = document.getElementById('header-title');
    this.events();
    this.onLoad();
  }

  events() {
    this.postsBackBtn.addEventListener('click', this.onGoBackClick.bind(this));
  }

  onLoad() {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then((response) => response.json())
      .then((json) => {
        console.log(json);
        this.renderList(json);
      });
  }

  renderList(users) {
    users.forEach((user) => {
      this.renderListItem(user, 'users');
    });
  }

  renderListItem(item, listType) {
    let li = document.createElement('LI');
    li.setAttribute('class', 'list-item');

    let container = document.createElement('div');
    container.setAttribute('class', 'item-container');

    let title = document.createElement('div');
    title.setAttribute('class', 'title');

    let body = document.createElement('div');
    body.setAttribute('class', 'body');

    container.appendChild(title);
    container.appendChild(body);
    li.appendChild(container);

    if (listType === 'users') {
      title.appendChild(document.createTextNode(`${item.name}`));
      body.appendChild(document.createTextNode(`username: ${item.username}`));
      li.classList.add('user-item');
      li.setAttribute('data-post-id', item.id);
      li.addEventListener('click', (e) => {
        const event = this.onUserPostsClick.bind(this, e, item.name);
        event();
      });

      this.usersList.appendChild(li);
    }

    if (listType === 'posts') {
      title.appendChild(document.createTextNode(`${item.title}`));
      body.appendChild(document.createTextNode(`${item.body}`));
      this.postsList.appendChild(li);
    }
  }

  onUserPostsClick(e, name) {
    this.usersList.setAttribute('style', 'display:none;');
    this.postsList.setAttribute('style', 'display:block;');
    this.headerTitle.innerHTML = `Posts by ${name}`;
    this.postsBackBtn.setAttribute('style', 'display:block;');
    const userId = e.currentTarget.getAttribute('data-post-id');
    this.fetchPosts(userId);
  }
  async fetchPosts(userId) {
    const res = await fetch(
      `https://jsonplaceholder.typicode.com/users/${userId}/posts`
    );
    const data = await res.json();

    this.renderPostList(data);
  }

  renderPostList(posts) {
    posts.forEach((post) => {
      this.renderListItem(post, 'posts');
    });
  }
  onGoBackClick() {
    const posts = Array.from(
      this.postsList.getElementsByClassName('list-item')
    );
    posts.forEach((box) => {
      box.remove();
    });
    this.headerTitle.innerHTML = 'Users';
    this.postsBackBtn.setAttribute('style', 'display:none;');
    this.usersList.setAttribute('style', 'display:block;');
    this.postsList.setAttribute('style', 'display:none;');
  }
}

new App();
