import { boolUndef } from './n-form-props'

export const nGridItemProps = {
  offset: [Number, String],
  span: [Number, String],
  suffix: boolUndef,
}

export const nGridItemPropNames = Object.keys(nGridItemProps)

export const xFormItemProps = {
  wrap: Boolean,
  inputClass: [String, Object, Array],
  wrapClass: [String, Object, Array],
  ...nGridItemProps,
}
