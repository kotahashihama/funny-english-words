import { Box, Paper, Typography } from '@mui/material';

export const MeaningSection = () => {
  return (
    <Paper sx={{ marginBottom: '48px', padding: '24px' }}>
      <Typography
        fontSize="24px"
        fontWeight="bold"
        sx={{ marginBottom: '20px' }}
      >
        applaud とは
      </Typography>

      <Box fontSize="14px">
        <Box
          sx={{
            marginBottom: '20px',
          }}
        >
          applaud 【動詞】
        </Box>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <Box>
            <Box>自動:</Box>
            <Box>拍手［称賛］する</Box>
          </Box>

          <Box>
            <Box>他動:</Box>
            <Box>〔～に〕拍手を送る、〔～を〕称賛する</Box>
          </Box>
        </Box>
      </Box>
    </Paper>
  );
};
