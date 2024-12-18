<script lang="ts">
	import { onMount } from 'svelte';
	import { Tween } from 'svelte/motion';
	import { Button } from '$lib/components/ui/button';
	import { format } from '$lib/utils/format-number';
	import * as Icons from '../icons';

	type Props = {
		repoUrl: string;
		stars: number;
	};

	let { repoUrl, stars }: Props = $props();

	const starsTween = new Tween(0, { delay: 150, duration: 1500 });

	onMount(() => starsTween.set(stars));
</script>

<Button href={repoUrl} class="flex place-items-center gap-2">
	<Icons.GitHub invert class="inline" /> Star on GitHub <Icons.Star class="text-muted-foreground" />
	<span class="font-mono">{format(starsTween.current)}</span>
</Button>
