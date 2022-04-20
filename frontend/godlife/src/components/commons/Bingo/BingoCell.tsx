import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box'


// const useStyles = makeStyles(() => ({
//   root: { position: "relative" },
//   wrapper: {
//     position: "absolute",
//     top: 0,
//     left: 0,
//     right: 0,
//     bottom: 0,
//     "& > *": { height: "100%", width: "100%" }
//   }
// }));


// const AspectRatioBox = ({ children, ratio = 1 }) => {
//   const classes = useStyles();
//   return (
//     <div className={classes.root}>
//       <div className={classes.wrapper}>{children}</div>
//       <div style={{ paddingBottom: (1 / ratio) * 100 + "%" }} />
//     </div>
//   );
// };

const BingoCell = (cellText: String) => {
  return (
    <Grid 
      item xs = { 4 }
      sx={{
        bgcolor:'white',
        border: "1px solid black",
        position: "relative",
        width: 120,
        "&::before": {
          display: "block",
          content: "''",
          paddingBottom: "100%"
        }

        
      }}  
    >
      <Box
        sx={{
          backgroundColor: 'primary.light',
          border: '1px dashed grey',
          borderRadius: 4,
          // width: '100%',
          // height: '100%'
          position: "absolute",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0

        }}
      >
        <Typography
          align='center'
        >
          { cellText }
        </Typography>
      </Box>
    </Grid>
  ) 
}


export default BingoCell






