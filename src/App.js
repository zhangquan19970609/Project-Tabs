import React, { useState, useEffect } from 'react'
import { FaAngleDoubleRight, FaAudioDescription } from 'react-icons/fa'
// ATTENTION!!!!!!!!!!
// I SWITCHED TO PERMANENT DOMAIN
const url = 'https://course-api.com/react-tabs-project'

function App() {
  // const [isActive, setIsActive] = useState(false);

  const [jobList, setJobListTo] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loopValue, setLoopValue] = useState(0);
  
  async function getList(){
    const response = await fetch(url);
    const urlList = await response.json();
    setJobListTo(urlList); 
    setIsLoading(false);
  }

  // const toggleClass = () => {
  //   setIsActive(!isActive)
  // }

  useEffect(() => {
    getList();
  },[])

  if (isLoading === true) {
    return <div className='loading'>
      <h1>Loading...</h1>
    </div>
  }

  const {title,company,dates,duties} = jobList[loopValue];

  return <section className='section'>
    <div className='title'>
      <h2>Experience</h2>
      <div className='underline'></div>
    </div>
    <div className='jobs-center'>
      <div className='btn-container'>
        {jobList.map((job, index) => {
          return (<button key={job.order}
              className={`job-btn ${loopValue === index && 'active-btn'}`} 
              onClick={() => {
                setLoopValue(index);
                return;
              }}
              >
              {job.company}
            </button>
          );
        })
        }
      </div>
      <article className='job-info'>
        <h3>{title}</h3>
        <h4>{company}</h4>
        <p className='job-date'>
          {dates}
        </p>
      {duties.map((duty) => {
        return <div className='job-desc'>
          <FaAngleDoubleRight className='job-icon'/>
          <p>{duty}</p>
        </div>
      })}
      </article>

    </div>
    <button type='button' className='btn'>
      More Info
    </button>
  </section>
}

export default App

// 1st try 成果：
  // 有 tab 的基本功能雏形与思路； 
  // 在不做 nested array: job description 的情况下，可以点击并轮番显示。
  // 设置了 showJob useState, 每次点击 button 都会将 showJob 更改为现存路径。

// 现存两个问题：
  // 1. 无法 map through showJob 中的 nested description array;
  // 2. 无法在刷新后的第一时间显示页面，必须点击才能正常显示。

// 两个问题的共同解决方法：使用 一个 loopValue 来 循环，避免使用 showJob 来 refer to 某一 item.
  // 使用 useState Hook showItem 来指代 array element 并进行 map 循环，会导致出错！

// 使用 loopValue, 将 loopValue 设置为点击按钮的 index（jobList 中不同 jobs 的 index）
  // 从而对 jobList[loopValue] 中的不同 object 进行 render。

// 使用 template literals, 在 JS 的 string 中插入判断
  // `` + ${} 是固定格式！
  // className={`job-btn ${loopValue === index && 'active-btn'}`} 