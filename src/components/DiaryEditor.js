import React, {useState, useRef, useContext, useEffect, useCallback} from 'react'
import {useNavigate} from 'react-router-dom';
import {DiaryDispatchContext} from "./../App.js";

import MyHeader from './MyHeader';
import MyButton from './MyButton';
import EmotionItem from './EmotionItem';

/*util */
import { getStringDate } from '../util/date.js';
import { emotionList } from '../util/emotion.js';

const env = process.env;
env.PUBLIC_URL=env.PUBLIC_URL||"";



const DiaryEditor =({isEdit, originData})=> {
    
    const [date, setDate] = useState(getStringDate(new Date()));
    const [emotion, setEmotion] =useState(3);
    const [content, setContent] = useState("");
    const contentRef = useRef();

    
    const handleClickEmotion = useCallback((emotion)=>{
        setEmotion(emotion);
    },[]);

    const navigate = useNavigate();

    const {onCreate, onEdit, onRemove} = useContext(DiaryDispatchContext);

    const handleSubmit = ()=>{
      if(content.length<1){
        contentRef.current.focus();
        return;
      }
      if(window.confirm(
        isEdit ? "수정하시겠습니까?" : "새로 작성하시겠습니까?"
      )){
        if(!isEdit){
          onCreate(date,content, emotion);
        }else{
          onEdit(originData.id, date, content, emotion);
        }
      }
      navigate('/',{replace:true})
    }
    const handleRemove = () =>{
      if(window.confirm("정말 삭제하시겠습니까?")){
        onRemove(originData.id);
        navigate('/',{replace:true})
      }
    }
    useEffect(()=>{
      if(isEdit){
        setDate(getStringDate(new Date(parseInt(originData.date))));
        setEmotion(originData.emotion);
        setContent(originData.content);
      }
    },[isEdit, originData]);
    return (
      <div className='DiaryEditor'>
        <MyHeader
                  headText={isEdit ? "수정하기" : "New Create"}
                  leftChild={
                    <MyButton text={"< 뒤로가기"}
                              type={"negative"}
                              onClick={()=>navigate(-1)}/>
                  }
                  rightChild={
                    isEdit &&
                    <MyButton text={"삭제하기"}
                              type={"nagative"}
                              onClick={handleRemove}
                    />
                  }
        />
        <div>
          <section>
            <h4>오늘은 언제인가요?</h4>
            <div className='input_box'>
                  <input type="date"
                         onChange={(e)=>setDate(e.target.value)}
                         value={date}
                         className="input_date"
                  />
            </div>
          </section>
          <section>
            <h4>오늘의 평가</h4>
            <div className='input_box emotion_list_wrapper'>
                {emotionList.map((it)=>(
                   <EmotionItem key={it.emotion_id} {...it}
                                onClick={handleClickEmotion}
                                isSelected={it.emotion_id===emotion}
                   />
                ))}
            </div>
          </section>
          <section>
            <h4>TodayList</h4>
            <div className='input_box text_wrapper'>
              <textarea
                  ref={contentRef}
                  value={content}
                  onChange={(e)=>setContent(e.target.value)}
              />
            </div>
          </section>
          <section>
            <div className='control_box'>
              <MyButton text={"뒤로가기"} onClick={()=>navigate(-1)}/>
              <MyButton text={"완료"} type={"positive"} onClick={handleSubmit}/>
            </div>
          </section>
        </div>
      </div>
    )
}

export default DiaryEditor