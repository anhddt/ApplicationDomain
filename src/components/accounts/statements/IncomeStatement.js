import { Box, Grid, Typography } from "@mui/material"
import dayjs from "dayjs";
import { useThemeProvider } from "../../utils/themeProvider/CustomThemeProvier";
const IncomeStatement = ({fromDate, toDate}) => {
    const { theme } = useThemeProvider();
    const getDate = () => {
        const day = dayjs(fromDate);
        const day2 = dayjs(toDate);
        const date1 = day.date() <=9 ? `0${day.date()}`: `${day.date()}`;
        const date2 = day2.date() <=9 ? `0${day2.date()}`: `${day2.date()}`;
        const month1 = day.month() <=9 ? `0${day.month()}`: `${day.month()}`;
        const month2 = day2.month() <=9 ? `0${day2.month()}`: `${day2.month()}`;
        return `From ${month1}/${date1}/${day.year()} to ${month2}/${date2}/${day2.year()}`;
    }
    return (
        <Box sx={{display: "flex", width: "800px", height: "1000px", mr: "200px", backgroundColor: theme==="dark"?"#252525":"whitesmoke", elevation: 1, boxShadow: 5}}>
            <Grid container sx={{pt: 10}}>
                <Grid item xs={12} sx={{alignItems: "center"}}>
                    <Typography variant="h5" sx={{textTransform:"uppercase", fontWeight: "bold", textAlign: "center", }}> {"Some Company"} <br/> {"Income Statement"}</Typography>
                    <Typography variant="subtitle1" sx={{fontWeight: "bold", textAlign: "center"}}>{getDate()}</Typography>
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="subtitle1" sx={{fontWeight: "bold", textAlign: "center"}}>Revenue</Typography>
                </Grid>
            </Grid>
        </Box>
    );
}
export default IncomeStatement;