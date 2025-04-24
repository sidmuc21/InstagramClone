<script>
	const { message } = $props();
</script>

{#if message}
	<div class="bg-red-100 text-red-700 px-4 py-3 rounded-md border border-red-300">
		<p>{message}</p>
	</div>
{/if}