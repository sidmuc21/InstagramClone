<script>
	import { enhance } from '$app/forms';
	import { slide } from 'svelte/transition';

	let { data } = $props();
</script>

<div class="min-h-screen bg-gray-50 px-6 py-10 space-y-8">
	<h1 class="text-3xl font-bold text-gray-800 text-center">Admin Dashboard – Articles</h1>

	<div class="flex justify-center gap-6 flex-wrap text-sm font-medium">
        <a href="/" class="text-gray-700 hover:underline">← Back to Homepage</a>

		<a href="/admin/new" class="text-[#5279bf] hover:underline">+ Create New Article</a>

		<form action="/logout?/logout" method="POST">
			<button type="submit" class="text-[#bf5650] hover:underline">Logout</button>
		</form>
	</div>

	<div class="grid gap-6 max-w-6xl mx-auto">
		{#each data.articles as article (article.id)}
			<div
				transition:slide
				class="bg-white p-5 rounded-xl shadow-md flex flex-col md:flex-row gap-5 items-start"
			>
				<img
					src={article.image}
					alt="articleImage"
					class="w-full md:w-48 h-32 object-cover rounded-md"
				/>

				<div class="flex-1 space-y-2">
					<p class="text-gray-800">
						<strong>ID:</strong> {article.id} <br />
						<strong>Author:</strong> {article.author} <br />
						<strong>Description:</strong> {article.description} <br />
						<strong>Votes:</strong> {article.votes}
					</p>

					<form action="?/deleteArticle" method="POST" use:enhance>
						<input type="hidden" name="id" value={article.id} />
						<button
							type="submit"
							class="mt-2 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
						>
							Delete
						</button>
					</form>
				</div>
			</div>
		{/each}
	</div>
</div>