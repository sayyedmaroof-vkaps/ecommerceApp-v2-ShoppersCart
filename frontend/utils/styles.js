import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles({
  navbar: {
    backgroundColor: '#3535ff',
    '& a': {
      color: '#fff',
      marginLeft: 10,
    },
  },
  brand: {
    fontWeight: 'bold',
    fontSize: '1.5rem',
  },
  grow: {
    flexGrow: 1,
  },
  main: {
    minHeight: '80vh',
  },
  footer: {
    textAlign: 'center',
  },
  section: {
    margin: '10px 0',
  },
  form: {
    maxWidth: 600,
    margin: '0 auto',
  },
  navbarButton: {
    color: '#fff',
    textTransform: 'initial',
  },
  transparentBackground: {
    backgroundColor: 'transparent',
  },
  fullWidth: {
    width: '100%',
  },
})

export default useStyles
