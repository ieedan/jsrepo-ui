# jsrepo-ui

A demo of how to create a UI library with jsrepo.

## Script

I am going to show you how to create a registry with jsrepo.

Here I have a project with a component `star-button` that we want to be able to share using jsrepo.

If we open it up you can see that it depends on some other components and utilities in the project as well as some remote dependencies.

If you look at our file structure all of the components are under `./components/ui` and our utils are under `./utils`.

When using jsrepo all of your `blocks` need to be placed into a `category` so in this case all of the components are in the `ui` category and the utils are under the `utils` category.

Lets go ahead and setup jsrepo so that users can install the `star-button` component from our repository.

First we need to run:

```bash
jsrepo init --registry
```

Then we go through the prompts:

```
┌   jsrepo  v1.19.4
│
◇  Where are your blocks located?
│  ./src/lib
│
◇  Add another blocks directory?
│  Yes
│
◇  Where are your blocks located?
│  ./src/lib/components
│
◇  Add another blocks directory?
│  No
│
◇  Add jsrepo as a dev dependency?
│  No
│
◇  Create a `jsrepo-build-config.json` file?
│  Yes
│
◇  Added `build:registry` to scripts in package.json
│
◇  Wrote config to `jsrepo-build-config.json`
│
├  Next Steps ────────────────────────────────────────────────┐
│                                                             │
│  1. Add categories to `./src/lib, ./src/lib/components`.    │
│  2. Run `npm run build:registry` to build the registry.     │
│                                                             │
├─────────────────────────────────────────────────────────────┘
│
└  All done!
```

So now it will tell us that we can run the `build:registry` script to build our registry. Lets go ahead and try that out:

```
┌   jsrepo  v1.19.4
│
│   WARN  Skipped `C:/Users/aidan/Documents/GitHub/jsrepo-ui/src/lib/components/ui/button` subdirectories are not currently supported!
│   WARN  Skipped `C:/Users/aidan/Documents/GitHub/jsrepo-ui/src/lib/components/ui/icons` subdirectories are not currently supported!
│   WARN  Skipped `C:/Users/aidan/Documents/GitHub/jsrepo-ui/src/lib/components/ui/light-switch` subdirectories are not currently supported!
│   WARN  Skipped `C:/Users/aidan/Documents/GitHub/jsrepo-ui/src/lib/components/ui/star-button` subdirectories are not currently supported!
◇  Built C:/Users/aidan/Documents/GitHub/jsrepo-ui/src/lib
│
◇  Built C:/Users/aidan/Documents/GitHub/jsrepo-ui/src/lib/components
│
◇  Completed checking manifest.
│
│   WARN  ui/icons depends on svelte causing it to be installed when added no-framework-dependency
│
◇  Wrote output to `C:/Users/aidan/Documents/GitHub/jsrepo-ui/jsrepo-manifest.json`
│
└  All done!
```

After doing this we get some warnings.

Starting from the top we get warnings because one of our directories `./src/lib` contains both components and utils and is treating them both as categories.

Lets go ahead and fix this by adding `components` to the `excludeCategories` key of our `jsrepo-build-config.json`:

```diff
{
	"$schema": "https://unpkg.com/jsrepo@1.19.4/schemas/registry-config.json",
	"dirs": [
		"./src/lib",
		"./src/lib/components"
	],
	"doNotListBlocks": [],
	"doNotListCategories": [],
	"excludeDeps": [],
	"includeBlocks": [],
	"includeCategories": [],
	"excludeBlocks": [],
-	"excludeCategories": []
+	"excludeCategories": ["components"]
}
```

Now run `build:registry` again and you will see that those warnings go away.

```
┌   jsrepo  v1.19.4
│
◇  Built C:/Users/aidan/Documents/GitHub/jsrepo-ui/src/lib
│
◇  Built C:/Users/aidan/Documents/GitHub/jsrepo-ui/src/lib/components
│
◇  Completed checking manifest.
│
│   WARN  ui/icons depends on svelte causing it to be installed when added no-framework-dependency
│
◇  Wrote output to `C:/Users/aidan/Documents/GitHub/jsrepo-ui/jsrepo-manifest.json`
│
└  All done!
```

We still however have a warning `no-framework-dependency` suggesting that `Svelte` will be installed when we add `ui/icons`.

This is because framework dependencies need to be explicitly ignored when they aren't inside of a `*.vue` or `*.svelte` file. So because we are importing from `svelte/elements` in the `index.ts` file jsrepo is warning us that we will also install `Svelte` when adding the icons and that it may not be what we intended.

To fix this error we are going to add `svelte` to the `excludeDeps` key of our config so that jsrepo knows to ignore it.

```diff
{
	"$schema": "https://unpkg.com/jsrepo@1.19.4/schemas/registry-config.json",
	"dirs": [
		"./src/lib",
		"./src/lib/components"
	],
	"doNotListBlocks": [],
	"doNotListCategories": [],
-	"excludeDeps": [],
+	"excludeDeps": ["svelte"],
	"includeBlocks": [],
	"includeCategories": [],
	"excludeBlocks": [],
	"excludeCategories": ["components"]
}
```

Now we can run `build:registry` one last time and see that we have no warnings or errors:

```
┌   jsrepo  v1.19.4
│
◇  Built C:/Users/aidan/Documents/GitHub/jsrepo-ui/src/lib
│
◇  Built C:/Users/aidan/Documents/GitHub/jsrepo-ui/src/lib/components
│
◇  Completed checking manifest.
│
◇  Wrote output to `C:/Users/aidan/Documents/GitHub/jsrepo-ui/jsrepo-manifest.json`
│
└  All done!
```

Now lets take a look at the produced manifest.

We can run `build:registry` again with the `preview` key enabled in your config to see what users will see when running add on your registry:

```
┌   jsrepo  v1.19.4
│
◇  Built C:/Users/aidan/Documents/GitHub/jsrepo-ui/src/lib
│
◇  Built C:/Users/aidan/Documents/GitHub/jsrepo-ui/src/lib/components
│
◇  Completed checking manifest.
│
│  Preview:
│  ◻ utils/format-number
│  ◻ utils/utils
│  ◻ ui/button
│  ◻ ui/icons
│  ◻ ui/light-switch
│  ◻ ui/star-button
│
◇  Wrote output to `C:/Users/aidan/Documents/GitHub/jsrepo-ui/jsrepo-manifest.json`
│
└  All done!
```

You'll notice that currently everything is shown to the user. We really just want them to see `star-button` though. To accomplish this we just add need to add the blocks we want to exclude from the list to the `doNotListBlocks` or `doNotListCategories` keys of our config.

```diff
{
	"$schema": "https://unpkg.com/jsrepo@1.19.4/schemas/registry-config.json",
	"dirs": [
		"./src/lib",
		"./src/lib/components"
	],
-	"doNotListBlocks": [],
+	"doNotListBlocks": [
+		"button",
+		"icons",
+ 		"light-switch"
+	],
-	"doNotListCategories": [],
+	"doNotListCategories": ["utils"],
	"excludeDeps": ["svelte"],
	"includeBlocks": [],
	"includeCategories": [],
	"excludeBlocks": [],
	"excludeCategories": ["components"]
}
```

Now if you run `build:registry` again you will get the following output:

```
┌   jsrepo  v1.19.4
│
◇  Built C:/Users/aidan/Documents/GitHub/jsrepo-ui/src/lib
│
◇  Built C:/Users/aidan/Documents/GitHub/jsrepo-ui/src/lib/components
│
◇  Completed checking manifest.
│
│   WARN  ui/light-switch is unused and will be removed no-unused-block
│
│  Preview:
│  ◻ ui/star-button
│
◇  Wrote output to `C:/Users/aidan/Documents/GitHub/jsrepo-ui/jsrepo-manifest.json`
│
└  All done!
```

You can now see that we are only listing `star-button` when the user runs add.

You will now also see a warning that `ui/light-switch` is unused and will be removed. This warning is useful in case there is a block that you wanted to make sure was included in the registry that may have been unintentionally left out.

If you would like to not see this warning you can turn off `no-unused-block` in your config:

```diff
{
	"$schema": "https://unpkg.com/jsrepo@1.19.4/schemas/registry-config.json",
	"dirs": [
		"./src/lib",
		"./src/lib/components"
	],
	"doNotListBlocks": ["button","icons","light-switch"],
	"doNotListCategories": ["utils"],
	"excludeDeps": ["svelte"],
	"includeBlocks": [],
	"includeCategories": [],
	"excludeBlocks": [],
	"excludeCategories": ["components"],
	"preview": true,
+	"rules": {
+		"no-unused-block": "off",
+	}
}
```

However I am going to leave it on for now because I find it useful.

Lets take a peek at the produced jsrepo-manifest.json.

You will now notice that there are 5 blocks there but only 1 is being listed `star-button`. You will also notice that like the warning stated above `light-switch` was removed from the manifest.

Now if we commit these changes to the repository you will be able to add the button with:

```bash
jsrepo add github/ieedan/jsrepo-ui/ui/star-button
```

When you add the `star-button` all of the other necessary local and remote dependencies will be include for you.

Lets look at an issue you may have while creating your first registry.

To demonstrate lets move the `format-number` file outside of the directories we gave to jsrepo earlier.

By moving `format-number` to `./src/lib` we now get the following error:

```
┌   jsrepo  v1.19.4
│
◇  Built C:/Users/aidan/Documents/GitHub/jsrepo-ui/src/lib
│
◇  Built C:/Users/aidan/Documents/GitHub/jsrepo-ui/src/lib/components
│
◇  Completed checking manifest.
│
│   WARN  ui/light-switch is unused and will be removed no-unused-block
│   ERROR  ui/star-button depends on local dependency format-number/index which doesn't exist require-local-dependency-exists
Completed checking manifest with 1 error(s) and 1 warning(s)
```

This is because jsrepo found the local dependency but cannot resolve it to another block. To fix this move `format-number` back to a directory that is built with jsrepo.
