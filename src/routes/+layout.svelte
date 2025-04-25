<script>
	import '../app.css';

	let { children } = $props();
</script>

<nav class="flex justify-evenly p-4 text-[#cedcf5]">
	<a href="/" class="border-1 border-solid p-3 rounded-xl">Home</a>
	<a href="/admin" class="border-1 border-solid p-3 rounded-xl">Admin</a>
	<a href="/login" class="border-1 border-solid p-3 rounded-xl">Log in</a>
</nav>

<h1 class="text-3xl text-center my-6 text-[#abbfe0]">InstagramClone</h1>

{@render children()}
