import { useState, useContext, useEffect } from "react";
import MyHeader from "./../components/MyHeader";
import MyButton from "./../components/MyButton";
import { DiaryStateContext } from "../App";
import DiaryList from "../components/DiaryList";

const Home = () => {
  useEffect(() => {
    const titleElement = document.getElementsByTagName("title")[0];
    titleElement.innerHTML = `감정 일기장`;
  }, []);
  const diaryList = useContext(DiaryStateContext);

  const [data, setData] = useState([]);
  const [curDate, setCurDate] = useState(new Date()); //날짜를 저장하는 state, 기본값은 현재시간
  const headText = `${curDate.getFullYear()}년 ${curDate.getMonth() + 1}월`; //js는 월이 0월부터 시작

  useEffect(() => {
    if (diaryList.length >= 1) {
      const firstDay = new Date(
        curDate.getFullYear(),
        curDate.getMonth(),
        1
      ).getTime();

      const lastDay = new Date(
        curDate.getFullYear(),
        curDate.getMonth() + 1,
        0,
        23,
        59,
        59
      ).getTime();
      setData(
        diaryList.filter((it) => firstDay <= it.date && it.date <= lastDay) //같은 달 안에 작성된 일기들
      );
    }
  }, [diaryList, curDate]);

  /*
  useEffect(() => {
    console.log(data);
  }, [data]);
*/

  const increaseMonth = () => {
    setCurDate(
      new Date(curDate.getFullYear(), curDate.getMonth() + 1, curDate.getDate())
    );
  }; //월을 늘리는 함수
  const decreaseMonth = () => {
    setCurDate(
      new Date(curDate.getFullYear(), curDate.getMonth() - 1, curDate.getDate())
    );
  }; //월을 감소시키는 함수

  return (
    <div>
      <MyHeader
        headText={headText}
        leftChild={<MyButton text={"<"} onClick={decreaseMonth} />}
        rightChild={<MyButton text={">"} onClick={increaseMonth} />}
      />
      <DiaryList diaryList={data} />
    </div>
  );
};

export default Home;
