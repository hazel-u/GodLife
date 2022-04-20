// 3rd party
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
// Local
import BingoCell from './BingoCell'

type BingoProps = {
  // 1. Size: 한 변의 길이.
  size: Number, 
  // 2. goals: 배열. 
  goals: Array<String>,
  // 3. isActive: 빙고 작동 여부 
  isActive: Boolean,
}


export const Bingo = ({size, goals, isActive} : BingoProps) => {
  console.log(size, goals, isActive)
  return (
  <Box 
    sx={{ 
      flexGrow: 1,
      bgcolor: 'text.secondary',
      // stretch: { height : '100%'}
      height: 800,
    }}
  >
    <h1> 도와주세요! 개발자가 갇혀있어요!</h1>
    <h1>000님 XX일째 갓생중✨</h1>
    {/* 빙고 박스 */}
        <Grid 
          container 
          spacing={2}
          padding={5}
          sx={{
            bgcolor: 'GrayText',
            stretch: {height: '100%'}
          }}
        
        >
          {
            goals.map(function(goal, index){
              console.log(index)
              return BingoCell(goal)
            })
          }
        </Grid>
  </Box>
  )
}

export default Bingo