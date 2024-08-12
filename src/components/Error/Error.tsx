import { Box, Button, Typography } from '@mui/material';

type Props = {
  onClick: () => void;
};

export const Error = ({ onClick }: Props) => {
  return (
    <Box
      display={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
      }}
    >
      <Typography sx={{ marginBottom: '16px' }}>
        データを取得できませんでした。
        <br />
        再試行するか、時間をおいてアクセスしてください。
      </Typography>

      <Button onClick={onClick} variant="contained">
        再試行
      </Button>
    </Box>
  );
};
