import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";

const BingoCell = (cellText: String) => {
  return (
    <Grid
      item
      xs={4}
      sx={{
        position: "relative",
        width: 120,
        "&::before": {
          display: "block",
          content: "''",
          paddingBottom: "100%",
        },
      }}
    >
      <Paper
        elevation={3}
        sx={{
          position: "absolute",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          top: 2,
          left: 2,
          right: 2,
          bottom: 2,

          borderRadius: 4,
          padding: 1,
        }}
      >
        <Typography align="center">{cellText}</Typography>
      </Paper>
    </Grid>
  );
};

export default BingoCell;
