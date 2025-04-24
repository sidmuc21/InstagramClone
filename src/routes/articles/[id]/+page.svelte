<script>
	import { enhance } from '$app/forms';
	import { slide } from 'svelte/transition';

	let { data } = $props();
</script>

<div class="min-h-screen bg-gray-100 py-10 px-4">
	<a href="/" class="text-blue-600 hover:underline mb-6 inline-block">← Back</a>

	<div class="space-y-10 max-w-6xl mx-auto">
		{#each data.articles as article (article.id)}
			<div
				transition:slide
				class="bg-white rounded-2xl shadow-md p-6 grid md:grid-cols-2 gap-6 items-start"
			>
				<img
					src={article.image}
					alt="articleImage"
					class="w-full h-72 object-cover rounded-lg"
				/>

				<div class="space-y-4">
					<p class="text-gray-800 font-medium">{article.author}: {article.description}</p>
					<p class="text-sm text-gray-600">Votes: {article.votes}</p>

					<form action="?/upvotePhoto" method="POST" use:enhance>
						<input type="hidden" name="id" value={article.id} />
						<button type="submit" aria-label="likePhoto" class="hover:scale-105 transition">
							<img
								src="https://uhxn3r42f8ubxtek.public.blob.vercel-storage.com/Projekt/like-LN0T5Ev7SxqPYVwPm4WVh786qQO64H.png"
								alt="like"
								class="w-8 h-8"
							/>
						</button>
					</form>

					<div>
						<h4 class="font-semibold text-gray-700 mb-2">Comments</h4>
						<div class="space-y-1 text-sm text-gray-700">
							{#each data.comments as comment}
								<p><span class="font-semibold">{comment.name}:</span> {comment.text}</p>
							{/each}
						</div>

						<form action="?/commentPhoto" method="POST" use:enhance class="mt-4 space-y-3">
							<input type="hidden" name="article_id" value={article.id} />

							<div>
								<label class="block text-sm font-medium" for="name">Name</label>
								<input
									type="text"
									name="name"
									required
									class="w-full rounded-lg border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-500"
								/>
							</div>

							<div>
								<label class="block text-sm font-medium" for="text">Comment</label>
								<textarea
									name="text"
									required
									class="w-full rounded-lg border border-gray-300 px-3 py-2 h-24 resize-none focus:ring-2 focus:ring-blue-500"
								></textarea>
							</div>

							<button
								type="submit"
								class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
							>
								Add Comment
							</button>
						</form>
					</div>
				</div>
			</div>
		{/each}
	</div>
</div>