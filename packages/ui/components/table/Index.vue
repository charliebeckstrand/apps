<script setup lang="ts">
import { computed, ref } from 'vue'
import { ChevronUpIcon, ChevronDownIcon } from '@heroicons/vue/24/solid'

import Icon from '@/components/icon/Index.vue'

import type { Sort } from '@/types/table'

type Emit = {
	(key: 'update:sort', payload: { key: string; order: Sort }): void
}

interface Props {
	columns?: any[]
	data?: any[]
	sortable?: boolean
	striped?: boolean
}

const emit = defineEmits<Emit>()

const props = withDefaults(defineProps<Props>(), {
	columns: Array,
	data: Array,
	sortable: false,
	striped: false
})

const sorting = ref({
	key: '',
	order: 'asc' as Sort
})

const computedColumns = computed(() =>
	props.columns.map((column) => ({
		...column,
		sortable: column.sortable !== false
	}))
)

const sortedData = computed(() => {
	if (!props.sortable || !props.columns || !props.data || sorting.value.order === 'none') return props.data

	const column = props.columns.find((column) => column.field === sorting.value.key)

	if (!column) return props.data

	const sortedData = [...props.data]

	sortedData.sort((a, b) => {
		const valueA = a[column.field]
		const valueB = b[column.field]

		if (valueA < valueB) {
			return sorting.value.order === 'asc' ? -1 : 1
		} else if (valueA > valueB) {
			return sorting.value.order === 'asc' ? 1 : -1
		} else {
			return 0
		}
	})

	return sortedData
})

const handleSort = (column: any) => {
	const isColumnSortable = !props.sortable && !column.sortable

	if (isColumnSortable) return

	if (sorting.value.key === column.field) {
		sorting.value.order = sorting.value.order === 'asc' ? 'desc' : sorting.value.order === 'desc' ? 'none' : 'asc'
	} else {
		sorting.value.key = column.field
		sorting.value.order = 'asc'
	}

	if (sorting.value.order === 'none') {
		sorting.value.key = ''
	}

	emit('update:sort', { key: sorting.value.key, order: sorting.value.order })
}
</script>

<template>
	<div class="relative w-full overflow-x-auto">
		<table
			class="table w-full overflow-hidden rounded-md"
			:class="{ striped: props.striped }"
		>
			<thead>
				<tr>
					<th
						v-for="column in computedColumns"
						:key="column.field"
						:class="{ 'cursor-pointer select-none': props.sortable && column.sortable }"
						@click="handleSort(column)"
					>
						<div class="flex items-center space-x-2">
							<div>{{ column.label }}</div>
							<!-- {{ sorting.key }}
							{{ column.field }} -->
							<div
								:class="{
									'opacity-100': props.sortable && column.sortable && sorting.key === column.field,
									'opacity-0': !props.sortable || !column.sortable || sorting.key !== column.field
								}"
							>
								<Icon
									:icon="
										sorting.order === 'asc'
											? ChevronUpIcon
											: sorting.order === 'desc'
											? ChevronDownIcon
											: null
									"
								/>
							</div>
						</div>
					</th>
				</tr>
			</thead>

			<tbody>
				<tr
					v-for="(row, rowIndex) in sortedData"
					:key="rowIndex"
				>
					<td
						v-for="(column, columnIndex) in columns"
						:key="columnIndex"
					>
						<slot
							:name="`column-${column.field}`"
							:value="row[column.field]"
						>
							<!-- Fallback content if no slot is provided -->
							{{ row[column.field] }}
						</slot>
					</td>
				</tr>
			</tbody>
		</table>
	</div>
</template>

<style scoped>
.table {
	&.striped {
		&:deep(tr:nth-child(even)) {
			@apply bg-primary/5;
		}
	}

	:deep(th) {
		@apply text-left font-medium;
	}

	:deep(th),
	:deep(td) {
		@apply whitespace-nowrap p-2;
	}
}
</style>
