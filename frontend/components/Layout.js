import Head from 'next/head'
import { AppBar, Container, Toolbar, Typography } from '@material-ui/core'

const Layout = ({ children }) => {
  return (
    <>
      <Head>
        <title>Shoppers Cart</title>
      </Head>
      <AppBar position="static">
        <Toolbar>
          <Typography>ShoppersCart</Typography>
        </Toolbar>
      </AppBar>
      <Container>{children}</Container>
      <footer>
        <Typography> Copyright &copy; NotesInfinity </Typography>
      </footer>
    </>
  )
}

export default Layout
