<script lang="ts">
	import * as Icons from '../icons';
	import { Button } from '$lib/components/ui/button';

	type Props = {
		repoUrl: string;
		stars: number;
	};

	let { repoUrl, stars }: Props = $props();
</script>

<Button href={repoUrl} class="flex place-items-center gap-2">
	<Icons.GitHub invert class="inline" /> Star on GitHub <Icons.Star class="text-muted-foreground" />
	<span class="font-mono">{stars}</span>
</Button>
