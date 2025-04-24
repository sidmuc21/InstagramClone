<script>
	import { enhance } from '$app/forms';
	import { slide } from 'svelte/transition';

	let { data } = $props();
</script>

<a href="/">Back</a>

<div>
	{#each data.articles as article (article.id)}
		<div transition:slide>
            <img src={article.image} alt="articleImage">
            <p>{article.author}: {article.description}</p>
			<p>Votes: {article.votes}</p>
                <form action="?/upvotePhoto" method="POST" use:enhance>
                    <input type="hidden" name="id" value={article.id} />
                    <button type="submit" aria-label="likePhoto">
                        <img src="https://uhxn3r42f8ubxtek.public.blob.vercel-storage.com/Projekt/like-LN0T5Ev7SxqPYVwPm4WVh786qQO64H.png" alt="likePhoto">
                    </button>
                </form>
		</div>
        <div>
            <h4>Comments</h4>
    
            <div>
                {#each data.comments as comment}
                    <p>
                        <span>{comment.name}:</span>
                        {comment.text}
                    </p>
                {/each}
            </div>
    
            <form action="?/commentPhoto" method="POST" use:enhance>
                <input type="hidden" name="article_id" value={article.id} />
    
                <div>
                    <label for="name">Your Name</label>
                    <input type="text" name="name" required />
                </div>
    
                <div>
                    <label for="text">Your Comment</label>
                    <textarea name="text" required></textarea>
                </div>
    
                <button type="submit">Add Comment</button>
            </form>
        </div>
	{/each}
</div>