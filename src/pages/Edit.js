import { useContext, useEffect, useState } from 'react';
import {useNavigate, useParams} from 'react-router-dom'
import { DiarystateContext } from '../App';
import DiaryEditor from '../components/DiaryEditor';
const Edit =()=> {
  const [originData, setOriginData]=useState();
  const navigate = useNavigate();
  const {id} =useParams();

  const diaryList = useContext(DiarystateContext);
  useEffect(()=>{
    const titleElement = document.getElementsByTagName('title')[0];
    titleElement.innerHTML = `TodoList ${id}번째 수정`
  },[])
  useEffect(()=>{
    if(diaryList.length>=1){
      const targetDiary = diaryList.find((it)=>parseInt(it.id)===parseInt(id));
      if(targetDiary){
        setOriginData(targetDiary);
      }else{
        alert("찾는 리스트가 없습니다.")
        navigate('/',{replace:true})
      }
    }
  },[id, diaryList])
  return (
    <div>
      {originData&& <DiaryEditor isEdit={true} originData={originData}/>}
    </div>
  )
}

export default Edit