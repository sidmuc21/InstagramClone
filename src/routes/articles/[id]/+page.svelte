<script>
	import { enhance } from '$app/forms';
	import { slide } from 'svelte/transition';

	let { data } = $props();
</script>

<a href="/">Back</a>

<div>
	{#each data.articles as article (article.id)}
		<div transition:slide>
            <img src={article.image} alt="articleImage">
            <p>{article.author}: {article.description}</p>
			<p>Votes: {article.votes}</p>
		</div>
	{/each}
</div>