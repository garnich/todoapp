import React, { ChangeEvent, FunctionComponent, ReactElement, useState } from 'react'
import { useForm } from 'react-hook-form'

import './newItem.scss'

interface IProps {
  addNewItem: (text: string) => void,
}

interface FormInput {
  newItem: string
}

const NewItem: FunctionComponent<IProps> = ({addNewItem}):ReactElement => {

  const [label, setLabel] = useState('');
  const { register, handleSubmit } = useForm<FormInput>();


  function onLabelchange(event: ChangeEvent<HTMLInputElement>):void {
    setLabel(event.target.value)
  }

  function onSubmit(data: FormInput): void {
    if (label === '') {
      alert("You can't add EMPTY task!")
      return null
    }
    addNewItem(label)
    setLabel('')
  }

  return (
    <form className="item-add-form d-flex" onSubmit={handleSubmit(onSubmit)}>
      <input
        type="text"
        className="form-control"
        onChange={onLabelchange}
        placeholder={'Add new task'}
        value={label}
        name={'newItem'}
        ref={register}
      />
      <button
        className="new-item btn btn-outline-secondary"
        onClick={() => addNewItem}
      >
        Add item
      </button>
    </form>
  )
}

export default NewItem 
