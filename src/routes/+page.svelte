<script>
	import { enhance } from '$app/forms';
	import { slide } from 'svelte/transition';

	let { data } = $props();
</script>

<h1 class="text-3xl font-bold text-center my-6 text-gray-800">InstagramClone</h1>

<div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-4 max-w-6xl mx-auto">
	{#each data.articles as article (article.id)}
		<div transition:slide class="rounded-2xl shadow-lg bg-white hover:shadow-xl transition-all duration-300">
			<a href={`/articles/${article.id}`} class="block overflow-hidden rounded-t-2xl">
				<img src={article.image} alt="articleImage" class="w-full h-60 object-cover hover:scale-105 transition-transform duration-300" />
			</a>
			<div class="p-4 text-center">
				<p class="text-sm font-semibold text-gray-600">Votes: {article.votes}</p>
			</div>
		</div>
	{/each}
</div>