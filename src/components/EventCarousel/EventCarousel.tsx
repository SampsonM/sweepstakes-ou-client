import React from 'react'
import { StyleSheet } from 'react-native'
import { Carousel, View } from 'react-native-ui-lib'

const styles = StyleSheet.create({
  loopCarousel: {
    bottom: 21,
  },
})

interface EventCarouselProps {
  children: JSX.Element[] | JSX.Element
  loop: boolean
}

export const EventCarousel = ({ children, loop }: EventCarouselProps) => {
  return (
    <View padding-0>
      <Carousel
        loop={loop}
        pageControlPosition={Carousel.pageControlPositions.OVER}
        pageControlProps={{
          size: 12,
          containerStyle: styles.loopCarousel,
        }}
      >
        {children}
      </Carousel>
    </View>
  )
}
