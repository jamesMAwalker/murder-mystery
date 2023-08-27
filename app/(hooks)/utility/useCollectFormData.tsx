import { useRef } from 'react'

interface IDataObject {
  [key: string]: [value: string]
}

export const useCollectFormData = () => {
  const formRef = useRef<HTMLFormElement>(null)

  const getData = () => {
    const data: IDataObject = {}

    if (formRef.current) {
      Array.from(formRef?.current.children).forEach(({ placeholder, value, tagName }: any) => {
        if (tagName === 'INPUT') {
          data[placeholder] = value
        }
      })
    }

    return data;
  }

  return { formRef, getData }
}
