<script>
	import { enhance } from "$app/forms";
	import Warning from "$lib/components/Warning.svelte";
	export let form;
</script>

<div class="flex items-center justify-center min-h-screen bg-gray-50 px-4">
	<form
		action="?/login"
		method="POST"
		use:enhance
		class="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md space-y-6"
	>
		<h2 class="text-2xl font-bold text-center text-gray-800">Login</h2>

		<div>
			<label for="email" class="block text-sm font-medium text-gray-700">E-Mail</label>
			<input
				type="text"
				name="email"
				id="email"
				required
				class="mt-1 w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
			/>
		</div>

		<div>
			<label for="password" class="block text-sm font-medium text-gray-700">Password</label>
			<input
				type="password"
				name="password"
				id="password"
				required
				class="mt-1 w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
			/>
		</div>

		<button
			type="submit"
			class="w-full bg-blue-600 text-white font-semibold py-2 rounded-xl hover:bg-blue-700 transition-colors"
		>
			Login
		</button>

		{#if form}
			<Warning message={form.message} />
		{/if}
	</form>
</div>