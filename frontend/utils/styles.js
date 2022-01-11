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
    margin: '20px 0',
  },
  footer: {
    minHeight: 50,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#3535ff',
  },
  section: {
    margin: '10px 0',
  },
  form: {
    maxWidth: 600,
    margin: '0 auto',
    width: '100%',
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
  chipStyle: {
    margin: '0 10px',
  },
  disableSpacing: {
    margin: 0,
    padding: 0,
  },
  filterDropdown: {
    minWidth: '150px',
  },
  searchBtn: {
    margin: '0 5px',
  },
})

export default useStyles
