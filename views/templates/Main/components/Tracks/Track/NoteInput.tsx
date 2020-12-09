import * as React from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addNote, Types } from '../../../../../../redux/audio';

type props = {
  trackId: string
};

export const NoteInput: React.FC<props> = ({ trackId }) => {
  const dispatch = useDispatch();

  const [keyNum, setKeyNum] = useState<number>(60);
  const onChangeKeyNum = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const value: number = Number(e.target.value);
    setKeyNum(value);
  };
  const [startTime, setStartTime] = useState<number>(0);
  const onChangeStartTime = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const value: number = Number(e.target.value);
    setStartTime(value);
  };
  const [length, setLength] = useState<number>(1);
  const onChangeLength = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const value: number = Number(e.target.value);
    setLength(value);
  };

  const noteState: Types.noteState = {
    keyNum: keyNum,
    startTime: startTime,
    length: length,
    trackId: trackId,
  };

  return (
    <div>
      <label htmlFor="keyNum">keyNum</label>
      <input name="keyNum" type="number" value={keyNum} onChange={onChangeKeyNum} />
      <label htmlFor="startTime">startTime</label>
      <input name="startTime" type="number" value={startTime} onChange={onChangeStartTime} />
      <label htmlFor="length">length</label>
      <input name="length" type="number" value={length} onChange={onChangeLength} />
      <button onClick={() => dispatch(addNote(noteState))}>addNote</button>
    </div>
  );
};
