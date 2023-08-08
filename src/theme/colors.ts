import { Colors } from 'react-native-ui-lib'

const colors = {
  red: '#FC3342',
  blue: '#4554DD',
  gold: '#FFEA34',
  black: '#3d3d3d',
  grey: '#747474',
  yellow: '#ffc000',

  'faded-red': '#e16666',

  'light-red': '#e57b7b',
  'light-blue': '#9ca5fd',
  'light-gold': '#FFF7cE',

  'dark-red': '#B0000D',
  'dark-blue': '#101A7D',
  'dark-gold': '#B5A300',
  'dark-yellow': '#c09000',
}

Colors.loadColors({
  // BG colors
  'primary-bg': 'transparent',

  // Text colors
  'primary-text-color': colors.black,
  'red-text-color': colors.red,
  'gold-text-color': colors['dark-gold'],

  // Button colors
  'btn-primary-text-color': colors['light-gold'],
  'btn-primary-bg': colors.blue,
  'btn-secondary-text-color': colors['light-gold'],
  'btn-secondary-bg': colors['dark-red'],
  'btn-tertiary-text-color': colors['light-gold'],
  'btn-tertiary-bg': colors.grey,
})

export default colors
