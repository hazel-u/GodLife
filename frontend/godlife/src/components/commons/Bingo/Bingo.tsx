import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

const BingoCell = (cellText: String) => {
  return (
    <Grid>
      <Typography>
        { cellText }
      </Typography>
    </Grid>
  ) 
}

const exampleBingo  = [
  '일','이','삼','사','오','육','칠','팔','구'
]

// type BingoProps = {
//   Size: Number,
  
// }


export const Bingo = () => {
  return (
  <div>
    <h1> 도와주세요! 개발자가 같혀있어요!</h1>
    <Grid>
      {
        exampleBingo.map(function(cellText){
          return BingoCell(cellText)
        })
      }
    </Grid>
  </div>
  )
}

export default Bingo