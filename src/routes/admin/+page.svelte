<script>
	import { enhance } from '$app/forms';
	import { slide } from 'svelte/transition';

	let { data } = $props();
</script>

<h1>ADMIN DASHBOARD - ARTICLES</h1>

<a href="/admin/new">CREATE A NEW ARTICLE</a>

<form action="/logout?/logout" method="POST">
    <button class="logout" type="submit">Logout</button>
</form>

<div>
	{#each data.articles as article (article.id)}
		<div transition:slide>
			<p>{article.id} - {article.author} - {article.description} - {article.votes}</p>

			<form action="?/deleteArticle" method="POST" use:enhance>
				<input type="hidden" name="id" value={article.id} />
				<button type="submit">Delete</button>
			</form>
		</div>
	{/each}
</div>