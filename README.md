# Nuxt Minimal Starter

Look at the [Nuxt documentation](https://nuxt.com/docs/getting-started/introduction) to learn more.

## Setup

Make sure to install dependencies:

```bash
# npm
npm install

# pnpm
pnpm install

# yarn
yarn install

# bun
bun install
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
# npm
npm run dev

# pnpm
pnpm dev

# yarn
yarn dev

# bun
bun run dev
```

## Production

Build the application for production:

```bash
# npm
npm run build

# pnpm
pnpm build

# yarn
yarn build

# bun
bun run build
```

Locally preview production build:

```bash
# npm
npm run preview

# pnpm
pnpm preview

# yarn
yarn preview

# bun
bun run preview
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.

#### Data Tagging

**GTM**

`data-fn-action` = action name

`data-fn-location` = location name

`data-fn-params` = tagging params (optional)

**Example** - basic tagging
```html
<div data-fn-location="stock-section">
  <button data-fn-action="stock_open" data-fn-params="{ 'name' : 'ORI' }">View</button>
</div>
```
**Example 2** - Send tagging to reuse component eg. list, button group

use props `tagging-action` `tagging-params-key`  `tagging-params-value`

```html
<!-- Parent.vue -->
<template>
    <ATabNavigate 
      data-fn-location="stock-navigation" 
      tagging-params-key="mode" 
      tagging-params-value="mode" 
      :items="navMenu" 
    />
</template>

...
<script >
  ...
  const navMenu: ObjectString[] = [
    { label: 'จัดอันดับหุ้น', to: '/stock', mode: 'hit' },
    { label: 'ติดตาม', to: '/stock/followed', mode: 'follow' }
  ]
</script>

<!-- Navigate.vue -->
<template>
	<nav aria-label="Tabs">
		<NuxtLink
			v-for="(item, idx) in items"
			:key="idx"
			:to="item.to"
			data-fn-action="navigation_change"
			:data-fn-params="sendFnParams({ [taggingParamsKey]: item[taggingParamsValue] })"
		>
			{{ item.label }}
		</NuxtLink>
	</nav>
</template>

<script setup lang="ts">
defineProps({
  items: { type: Array<ObjectString>, default: () => [] },
  taggingParamsKey: { type: String, default: 'mode' },
  taggingParamsValue: { type: String, default: 'mode' }
})
</script>
```

```
OUPUT : params = { "mode" : "hit"}
```
 
**Example 3** - Send tagging to reuse component for multiple params

In `tagging-params-key` can use value option by
- `:` for option eg. `exchange:lower` (can implement in `/utils/tagging.ts`)

In `tagging-params-value` attribute we can use params value option by 

- `|` for split params
- `[...]` for fixed specific value
- `*` for set data to param key (when data is not object type) eg. `[th]|*`

```html
<!-- Parent.vue -->
<template>
    <AGraphPeriod 
      tagging-action="period_change"
      tagging-params-key="exchange:lower|period"
      :tagging-params-value="`[TH]|*`"
      :items="list" 
    />
</template>


<!-- Period.vue -->
<template>
  <div
    v-for="(period, index) in range"
    :data-fn-action="taggingAction"
    :data-fn-params="sendFnParams(createFnParams(taggingParamsKey, taggingParamsValue, period)"
    >
    {{ item.label }}
    </div>
</template>

```

```
OUPUT : params = { "exchange" : "th", "period" : "1M"}
```