import { $main, $skeleton } from '../selectors.js';

class UI {
	constructor(jsonPath, imagePath) {
		this.jsonPath = jsonPath;
		this.imagePath = imagePath;
	}

	createPost({ poster, title, user, photo, time, url }) {
		const $post = document.createElement('article');
		$post.classList.add('techPost');

		$post.innerHTML = `
        <a
        class="techPost-link"
        href="${url}"
        rel="noreferrer"
        target="_blank"
        title="${title}"
        aria-label="${title}"
        ></a>
        <figure class="techPost-poster">
            <img
                src="${this.imagePath + poster}"
                height="116"
                width="85"
                alt="Poster del post ${title}"
            />
        </figure>
        <div class="postDescription">
            <h2
                class="postDescription-title"
                title="${title}"
            >
                ${title}
            </h2>
            <div class="postDescription-details">
                <div class="postDescription-user" title="${user}">
                    <figure class="postDescription-avatar">
                        <img
                            src="${this.imagePath + photo}"
                            height="16"
                            width="16"
                            alt="Avatar de ${user}"
                        />
                    </figure>
                    <span> ${user} </span>
                </div>
                <div class="postDescription-dot"></div>
                <span> ${time} min read </span>
            </div>
        </div>
        `;

		return $post;
	}

	async createSection() {
		const $postSection = document.createElement('section');
		$postSection.classList.add('postSection');

		const res = await fetch(this.jsonPath);
		const { posts } = await res.json();

		for (const post of posts) {
			const $post = this.createPost(post);
			$postSection.appendChild($post);
		}

		$skeleton.remove();
		$main.appendChild($postSection);
	}
}

export default UI;
