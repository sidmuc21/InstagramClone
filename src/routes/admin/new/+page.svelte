<script>
	let { data } = $props();
</script>

<div class="min-h-screen bg-gray-50 py-10 px-6">
	<h1 class="text-3xl font-bold text-center text-gray-800 mb-6">Create a New Article</h1>

	<div class="text-center mb-10">
		<a href="/admin" class="text-blue-600 hover:underline">← Back to Admin Dashboard</a>
	</div>

	<form method="POST" action="?/createArticle" enctype="multipart/form-data" use:enhance
		class="max-w-xl mx-auto bg-white p-8 rounded-xl shadow space-y-6"
	>
		<div>
			<label for="image" class="block text-sm font-medium text-gray-700 mb-1">Image</label>
			<input
				type="file"
				name="image"
				class="w-full border border-gray-300 rounded px-3 py-2"
				required
			/>
		</div>

		<div>
			<label for="description" class="block text-sm font-medium text-gray-700 mb-1">Description</label>
			<textarea
				name="description"
				rows="4"
				class="w-full border border-gray-300 rounded px-3 py-2"
				required
			></textarea>
		</div>

		<div>
			<label for="author" class="block text-sm font-medium text-gray-700 mb-1">Author</label>
			<input
				type="text"
				name="author"
				class="w-full border border-gray-300 rounded px-3 py-2"
				required
			/>
		</div>

		<button
			type="submit"
			class="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
		>
			Create Article
		</button>
	</form>
</div>