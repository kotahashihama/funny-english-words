import { Box, Button, Paper, Typography } from '@mui/material';

export const ExampleSection = () => {
  return (
    <>
      <Button variant="contained" sx={{ marginBottom: '20px' }}>
        例文を生成
      </Button>

      <Paper sx={{ padding: '24px' }}>
        <Typography
          fontSize="24px"
          fontWeight="bold"
          sx={{ marginBottom: '20px' }}
        >
          例文
        </Typography>

        <Box fontSize="14px">
          <Box sx={{ marginBottom: '20px' }}>
            <Box sx={{ marginBottom: '20px' }}>
              The city's squirrels learned to{' '}
              <span style={{ color: '#dd4e4e' }}>
                <b>applaud</b>
              </span>{' '}
              by clapping acorns together, leading to standing ovations for
              particularly impressive parkour performances among the trees.
            </Box>

            <Box>
              訳:
              街のリスたちがドングリをパンパンして拍手する技を覚えちゃってさ。木の間を飛び回る超絶パルクールに大喝采するようになったんだって。
            </Box>
          </Box>

          <Box>
            <img src="./example.webp" style={{ maxWidth: '100%' }}></img>
          </Box>
        </Box>
      </Paper>
    </>
  );
};
