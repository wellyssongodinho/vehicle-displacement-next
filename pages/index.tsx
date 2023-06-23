import { Grid, Typography } from '@mui/material';

export default function HomePage() {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant="h4">Página Inicial</Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="body1">Bem vindo à aplicação de controle de deslocamento de veículos!</Typography>
        <Typography variant="body1">Escolha no menu as opções desejadas.</Typography>
      </Grid>
    </Grid>
  );
};

// import Box from '@mui/material/Box';
// import Container from '@mui/material/Container';
// import Typography from '@mui/material/Typography';
// import Copyright from '../src/Copyright';
// import Link from '../src/Link';
// import ProTip from '../src/ProTip';

// export default function Home() {
//   return (
//     <Container maxWidth="lg">
//       <Box
//         sx={{
//           my: 4,
//           display: 'flex',
//           flexDirection: 'column',
//           justifyContent: 'center',
//           alignItems: 'center',
//         }}
//       >
//         <Typography variant="h4" component="h1" gutterBottom>
//           Material UI - Next.js example in TypeScript
//         </Typography>
//         <Link href="/about" color="secondary">
//           Go to the about page
//         </Link>
//         <Link href="/customer" color="secondary">
//           Go to the customer page
//         </Link>
//         <ProTip />
//         <Copyright />
//       </Box>
//     </Container>
//   );
// }
