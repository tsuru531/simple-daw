import * as React from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addNote } from '../../../../../../redux/audio';

export const NoteInput: React.FC = () => {
  const dispatch = useDispatch();

  const [keyNum, setKeyNum] = useState<number>();
  const onChangeKeyNum = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const value: number = Number(e.target.value);
    setKeyNum(value);
  };
  const [startTime, setStartTime] = useState<number>();
  const onChangeStartTime = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const value: number = Number(e.target.value);
    setStartTime(value);
  };
  const [length, setLength] = useState<number>();
  const onChangeLength = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const value: number = Number(e.target.value);
    setLength(value);
  };

  const onClick = () => {
    dispatch(addNote(keyNum, startTime, length));
  };

  return (
    <div>
      <label htmlFor="keyNum">keyNum</label>
      <input name="keyNum" type="number" value={keyNum} onChange={onChangeKeyNum} />
      <label htmlFor="startTime">startTime</label>
      <input name="startTime" type="number" value={startTime} onChange={onChangeStartTime} />
      <label htmlFor="length">length</label>
      <input name="length" type="number" value={length} onChange={onChangeLength} />
      <button onClick={onClick}>addNote</button>
    </div>
  );
};
