import type { HTMLAttributes } from 'svelte/elements';
import GitHub from './github.svelte';
import Star from './star.svelte';

export interface Props extends HTMLAttributes<SVGElement> {
	class?: string;
	width?: number;
	height?: number;
}

export { GitHub, Star };
