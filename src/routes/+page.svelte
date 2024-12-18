<script>
	import { StarButton } from '$lib/components/ui/star-button';
	import { LightSwitch } from '$lib/components/ui/light-switch';
</script>

<main class="relative flex h-svh place-items-center justify-center">
	<div class="absolute right-2 top-2">
		<LightSwitch />
	</div>

	<StarButton repoUrl="https://github.com/ieedan/jsrepo" stars={164} />
</main>
