import { useNavigate } from 'react-router-dom'
import { currentAccountState } from '@/presentation/components'
import { useRecoilValue } from 'recoil'

type ResultType = () => void

export const useLogout = (): ResultType => {
  const history = useNavigate()
  const { setCurrentAccount } = useRecoilValue(currentAccountState)
  return (): void => {
    setCurrentAccount(undefined)
    history('/login')
  }
}
