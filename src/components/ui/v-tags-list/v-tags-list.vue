<template>
	<div class="tags-wrapper">
		<div v-if="label" class="tags-wrapper__label">
			{{ label }}
		</div>
		<ul class="tags-wrapper__list">
			<li class="tags-wrapper__item" v-for="(tag, index) of tags" >
				{{ tag.name }}
				<div class="tags-wrapper__remove" @click="$emit('removeTag', index)">
					<svg xmlns="http://www.w3.org/2000/svg" width="9" height="9" viewBox="0 0 9 9" fill="none" >
						<path d="M7.125 1.875L1.87502 7.12498" stroke="#868D95" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
						<path d="M1.875 1.875L7.12498 7.12498" stroke="#868D95" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
					</svg>
				</div>
			</li>
			<li v-if="!maxTags || (tags.length < maxTags)" class="tags-wrapper__add" @click="$emit('openModal')">
				<svg xmlns="http://www.w3.org/2000/svg" width="7" height="7" viewBox="0 0 7 7" fill="none">
					<path fill-rule="evenodd" clip-rule="evenodd" d="M4.2 2.8V0H2.8V2.8H0V4.2H2.8V7H4.2V4.2H7V2.8H4.2Z" fill="#1058D0"/>
				</svg>
				Добавить
			</li>
		</ul>
		<slot/>
	</div>
</template>

<script>
export default {
	name: "v-tags-list",
	emits: ['openModal', 'removeTag'],
	props: {
		label: String,
		tags: [Array, Object],
		maxTags: Number
	}
	
}
</script>

<style src="./style.scss" lang="scss" scoped/>
