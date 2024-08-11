import { Box } from '@mui/material';
import { ExampleSection } from './components/ExampleSection/ExampleSection';
import { Logo } from './components/Logo/Logo';
import { MeaningSection } from './components/MeaningSection/MeaningSection';
import { SearchSection } from './components/SearchSection/SearchSection';

function App() {
  return (
    <Box sx={{ margin: '100px auto 0', width: '680px' }}>
      <Logo />
      <SearchSection />
      <MeaningSection />
      <ExampleSection />
    </Box>
  );
}

export default App;
