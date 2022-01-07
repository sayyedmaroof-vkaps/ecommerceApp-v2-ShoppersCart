import { CircularProgress } from '@material-ui/core'

function Loader() {
  let circleCommonClasses = 'h-2.5 w-2.5 bg-current   rounded-full'
  return (
    <div>
      <div class="flex items-center justify-center m-auto inset-1/3 z-50 fixed">
        <div class="w-24 h-24 border-x-2 border-b-2  border-gray-900 rounded-full animate-spin"></div>
      </div>
    </div>
  )
}

export default Loader
