import { ThemeManager } from 'react-native-ui-lib'
import colors from './colors'
import images from './images'

ThemeManager.setComponentTheme('Card', {
  borderRadius: 8,
})

ThemeManager.setComponentTheme('Button', (props: any) => {
  return {
    borderRadius: 4,
  }
})

export { colors, images }
