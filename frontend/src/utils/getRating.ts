export const getRating = (min: number = 4) => {
   const floatRandom = Math.random() 
   const randomWithinRange = floatRandom + min 
   return randomWithinRange
 }