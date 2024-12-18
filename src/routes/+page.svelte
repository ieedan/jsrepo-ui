<script>
	import { StarButton } from "$lib/components/ui/star-button";
	import { LightSwitch } from "$lib/components/ui/light-switch";
</script>

<main class="h-svh flex place-items-center justify-center relative">
    <div class="absolute top-2 right-2">
        <LightSwitch />
    </div>
    
    <StarButton repoUrl="https://github.com/ieedan/jsrepo" stars={164}/>
</main>