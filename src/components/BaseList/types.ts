export type ListItemType = {
  label: number | string
  value: number | string
  type: 'primary' | 'danger' | 'warning'
}

export type ListType = Array<ListItemType>
