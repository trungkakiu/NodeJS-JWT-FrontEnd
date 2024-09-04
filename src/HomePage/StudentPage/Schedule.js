import { Dropdown } from 'react-bootstrap';
import './Schedule.scss';
import Theme from '../Scrourcedata/images (1).jpg';
import { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import RouteApi from '../../Service/RouteApi';
import { forEach } from 'lodash';

const Schedule = () => {
  const currentDate = new Date();
  const daysOfWeek = ['Chủ Nhật', 'Thứ Hai', 'Thứ Ba', 'Thứ Tư', 'Thứ Năm', 'Thứ Sáu', 'Thứ Bảy'];
  const currentDay = daysOfWeek[currentDate.getDay()];
  const [currentWeek, setCurrentWeek] = useState();
  const [ApiResponse, setApiResponse] = useState();
  const [ListOfDay, setListOfDay] = useState([]);
  const [activeDay, setActiveDay] = useState({
    Monday: false,
    Tuesday: false,
    Wednesday: false,
    Thursday: false,
    Friday: false,
    Saturday: false,
    Sunday: false,
  });
  const [Mondaydata, SetMondayData] = useState();
  const [TuesDayData, SetTuesDayData] = useState();
  const [WednesdayData, SetWednesdayData] = useState();
  const [ThursdayData, SetThursdayData] = useState();
  const [FridayData, SetFridayData] = useState();
  const [SaturdayData, SetSaturdayData] = useState();
  const [SundayData, SetSundayData] = useState();
  const [scheduleData, setScheduleData] = useState(null);

  useEffect(() => {
    checkingday();
    TakeSchedule();
  }, []);

  const checkingday = () => {
    switch (currentDay) {
      case 'Thứ Hai':
        setActiveDay((prev) => ({ ...prev, Monday: true }));
        break;
      case 'Thứ Ba':
        setActiveDay((prev) => ({ ...prev, Tuesday: true }));
        break;
      case 'Thứ Tư':
        setActiveDay((prev) => ({ ...prev, Wednesday: true }));
        break;
      case 'Thứ Năm':
        setActiveDay((prev) => ({ ...prev, Thursday: true }));
        break;
      case 'Thứ Sáu':
        setActiveDay((prev) => ({ ...prev, Friday: true }));
        break;
      case 'Thứ Bảy':
        setActiveDay((prev) => ({ ...prev, Saturday: true }));
        break;
      case 'Chủ Nhật':
        setActiveDay((prev) => ({ ...prev, Sunday: true }));
        break;
      default:
        break;
    }
  };

  const TakeSchedule = async () => {
    try {
      let schedule = await RouteApi.GetSchedule();
      setScheduleData(schedule.data.ED); 
      const currentWeek = findCurrentWeek(schedule.data.ED); 
      if (currentWeek) {
        setCurrentWeek(currentWeek.week)
      
        setListOfDay(currentWeek.schedule);
    
        
        ListOfDay.forEach(item => {
          if(item.NgayHoc){
            if(item.NgayHoc === '2'){
              SetMondayData(item)
            }
            if(item.NgayHoc === '3'){
              SetTuesDayData(item)
            }
            if(item.NgayHoc === '4'){
              SetSaturdayData(item)
            }
            if(item.NgayHoc === '5'){
              SetThursdayData(item)
            }
            if(item.NgayHoc === '6'){
              SetFridayData(item)
            }
            if(item.NgayHoc === '7'){
              SetSaturdayData(item)
            }
            SetSundayData('');
          }
        })
       
      } else {
        console.log('Không tìm thấy tuần hiện tại.');
      }
    } catch (error) {
      console.error(error);
      toast.error('Không thể lấy lịch trình!');
    }
  };

  const extractDates = (weekString) => {
    const datePattern = /\d{2}\/\d{2}\/\d{4}/g;
    const dates = weekString.match(datePattern);
    if (dates && dates.length === 2) {
      const [start, end] = dates;
      return {
        start: new Date(start.split('/').reverse().join('-')),
        end: new Date(end.split('/').reverse().join('-')),
      };
    }
    return null;
  };

  const findCurrentWeek = (data) => {
    const today = new Date();
    for (const item of data) {
      const dates = extractDates(item.week);
      if (dates && today >= dates.start && today <= dates.end) {
        return item;
      }
    }

    return null;
  };

  return (
    <>
      <div className="Schedule-container">
        <div className="Nav-bar">
          <Dropdown className="bars">
            <i className="fa-solid fa-bars"></i>
            <span>Schedule</span>
          </Dropdown>
        </div>
        <div className="Schedule-contents">
          <div className="Theme-header">
            <img className="img-header" src={Theme} alt="Theme" />
          </div>
          <div className="Time-card">
            <span className="span-ln">
              <div className="Year-ln">Năm học: 2024 - 2025</div>
              <div className="Session-ln">Học kỳ: Học Kỳ I</div>
              <div className="Week-ln">Tuần Học: {currentWeek}</div>
            </span>
          </div>
          <span className="Span-studies">
          <div className={activeDay.Monday ? 'day-now' : 'day'}>
            {activeDay.Monday ? <div>
              <i class="fa-solid fa-thumbtack"></i>
            </div> : ''}
              <div className='DayTag'>
               Monday (Thứ Hai):
              </div>
              <span className='Data-Tag'>
              {Mondaydata ? <>
                <div>
                {Mondaydata.TenHP}
                </div>
                <div>
                Phòng Học: {Mondaydata.PhongHoc}
                </div>
                <div>
                Tiết: {Mondaydata.Tiet}
                </div>
              </> : <>
              <div>
                {activeDay.Monday ? "Hôm nay không có lịch học, bạn rảnh!" : "Hiện bạn không có lịch học"}
              </div>
              </> }
              </span>
           </div>
          </span>
          <span className="Span-studies">
          <div className={activeDay.Tuesday ? 'day-now' : 'day'}>
           {activeDay.Tuesday ? <div>
              <i class="fa-solid fa-thumbtack"></i>
            </div> : ''}
              <div className='DayTag'>
               Tuesday (Thứ Ba):
              </div>
              <span className='Data-Tag'>
              {TuesDayData ? <>
                <div>
                {TuesDayData.TenHP}
                </div>
                <div>
                Phòng Học: {TuesDayData.PhongHoc}
                </div>
                <div>
                Tiết: {TuesDayData.Tiet}
                </div>
              </> : <>
              <div>
                {activeDay.Tuesday ? "Hôm nay không có lịch học, bạn rảnh!" : "Hiện bạn không có lịch học"}
              </div>
              </> }
              </span>
           </div>
          </span>
          <span className="Span-studies">
          <div className={activeDay.Wednesday ? 'day-now' : 'day'}>
            {activeDay.Wednesday ? <div>
              <i class="fa-solid fa-thumbtack"></i>
            </div> : ''}
              <div className='DayTag'>
               Wednesday (Thứ Tư):
              </div>
              <span className='Data-Tag'>
              {WednesdayData ? <>
                <div>
                 {WednesdayData.TenHP}
                </div>
                <div>
                Phòng Học: {WednesdayData.PhongHoc}
                </div>
                <div>
                Tiết: {WednesdayData.Tiet}
                </div>
                
              </> : <>
              <div>
                {activeDay.Wednesday ? "Hôm nay không có lịch học, bạn rảnh!" : "Hiện bạn không có lịch học"}
              </div>
              </> }
              </span>
           </div>
          </span>
          <span className="Span-studies">
          <div className={activeDay.Thursday ? 'day-now' : 'day'}>
           {activeDay.Thursday ? <div>
              <i class="fa-solid fa-thumbtack"></i>
            </div> : ''}
              <div className='DayTag'>
               Thursday (Thứ Năm):
              </div>
              <span className='Data-Tag'>
              {ThursdayData ? <>
                <div>
                {ThursdayData.TenHP}
                </div>
                <div>
                Phòng Học: {ThursdayData.PhongHoc}
                </div>
                <div>
                Tiết: {ThursdayData.Tiet}
                </div>
                
              </> : <>
              <div>
                {activeDay.Thursday ? "Hôm nay bạn rảnh!" : "Hiện bạn không có lịch học"}
              </div>
              </> }
              </span>
           </div>
          </span>
          <span className="Span-studies">
          <div className={activeDay.Friday ? 'day-now' : 'day'}>
            {activeDay.Friday ? <div>
              <i class="fa-solid fa-thumbtack"></i>
            </div> : ''}
              <div className='DayTag'>
               Friday (Thứ Sáu):
              </div>
              <span className='Data-Tag'>
              {FridayData ? <>
                <div>
                {FridayData.TenHP}
                </div>
                <div>
                Phòng Học: {FridayData.PhongHoc}
                </div>
                <div>
                Tiết: {FridayData.Tiet}
                </div>
                
              </> : <>
              <div>
                {activeDay.Friday ? "Hôm nay bạn rảnh!" : "Hiện bạn không có lịch học"}
              </div>
              </> }
              </span>
           </div>
          </span>
          <span className="Span-studies">
          <div className={activeDay.Friday ? 'day-now' : 'day'}>
            {activeDay.Saturday ? <div>
              <i class="fa-solid fa-thumbtack"></i>
            </div> : ''}
              <div className='DayTag'>
               Saturday (Thứ Bảy):
              </div>
              <span className='Data-Tag'>
              {SaturdayData ? <>
                <div>
                {SaturdayData.TenHP}
                </div>
                <div>
                Phòng Học: {SaturdayData.PhongHoc}
                </div>
                <div>
                Tiết: {SaturdayData.Tiet}
                </div>
              </> : <>
              <div>
                {activeDay.Saturday ? "Hôm nay không có lịch học, bạn rảnh!" : "Hiện bạn không có lịch học"}
              </div>
              </> }
              </span>
           </div>
          </span>
          <span className="Span-studies">
          <div className={activeDay.Sunday ? 'day-now' : 'day'}>
            {activeDay.Saturday ? <div>
              <i class="fa-solid fa-thumbtack"></i>
            </div> : ''}
              <div className='DayTag'>
               Sunday (Chủ Nhật):
              </div>
              <span className='Data-Tag'>
              {SundayData ? <>
                <div>
                {SundayData.TenHP}
                </div>
                <div>
                Phòng Học: {SundayData.PhongHoc}
                </div>
                <div>
                Tiết: {SundayData.Tiet}
                </div>
              </> : <>
              <div>
                {activeDay.Sunday ?  "Hôm nay không có lịch học, bạn rảnh!" : "Hiện bạn không có lịch học"}
              </div>
              </> }
              </span>
           </div>
          </span>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default Schedule;
