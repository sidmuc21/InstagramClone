<script>
	import { enhance } from '$app/forms';
	import { slide } from 'svelte/transition';

	let { data } = $props();
</script>

<h1>InstagramClone</h1>

<div>
	{#each data.articles as article (article.id)}
		<div transition:slide>
            <img src={article.image} alt="articleImage">
			<p>Votes: {article.votes}</p>
		</div>
	{/each}
</div>