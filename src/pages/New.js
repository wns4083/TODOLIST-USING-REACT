import { useEffect } from 'react';
import DiaryEditor from '../components/DiaryEditor';

const New =() => {
  useEffect(()=>{
    const titleElement = document.getElementsByTagName('title')[0];
    titleElement.innerHTML = `TodoList 만들기`
  },[])
  return (
    <>
      <DiaryEditor/>
    </>
  )
}

export default New