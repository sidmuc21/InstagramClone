<script>
	let { data } = $props();
</script>

<h1>CREATE A NEW ARTICLE</h1>

<form method="POST" action="?/createArticle" enctype="multipart/form-data" use:enhance>
	<label for="image">IMAGE</label>
	<input type="file" placeholder="Image" name="image" />

	<label for="description">DESCRIPTION</label>
	<textarea placeholder="Description" name="description"></textarea>

	<label for="author">AUTHOR</label>
	<input type="author" placeholder="Author" name="author" />

	<button type="submit">Create Event</button>
</form>