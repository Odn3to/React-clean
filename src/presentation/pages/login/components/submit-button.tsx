import React from 'react'
import { useRecoilState } from 'recoil'
import { loginState } from './atoms'
import { SubmitButtonBase } from '@/presentation/components'

type Props = {
  text: string
}

const SubmitButton: React.FC<Props> = ({ text }: Props) => {
  const [state] = useRecoilState(loginState)

  return (
    <SubmitButtonBase
        text={text}
        state={state}
    />
  )
}

export default SubmitButton
