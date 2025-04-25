<script>
	import { enhance } from '$app/forms';
	import { slide } from 'svelte/transition';

	let { data } = $props();
</script>

<div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-4 max-w-6xl mx-auto">
	{#each data.articles as article (article.id)}
		<div transition:slide class="rounded-2xl shadow-lg bg-white hover:shadow-xl transition-all duration-300">
			<a href={`/articles/${article.id}`} class="block overflow-hidden rounded-t-lg">
				<img src={article.image} alt="articleImage" class="w-full h-80 object-cover hover:scale-105 transition-transform duration-300" />
			</a>
			<div class="p-4 text-center">
				<p class="text-sm font-semibold text-gray-600">Votes: {article.votes}</p>
			</div>
		</div>
	{/each}
</div>