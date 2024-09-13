import { Dropdown } from 'react-bootstrap';
import './Schedule.scss';
import Theme from '../Scrourcedata/images (1).jpg';
import { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import RouteApi from '../../Service/RouteApi';

const Schedule = () => {
  const currentDate = new Date();
  const daysOfWeek = ['Chủ Nhật', 'Thứ Hai', 'Thứ Ba', 'Thứ Tư', 'Thứ Năm', 'Thứ Sáu', 'Thứ Bảy'];
  const currentDay = daysOfWeek[currentDate.getDay()];
  
  const [currentWeek, setCurrentWeek] = useState('');
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
  const [Weekdata, SetWeekdata] = useState(null);

  useEffect(() => {
    TakeSchedule();  
    checkingday(); 
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
      if (schedule) {
        const currentWeek = findCurrentWeek(schedule.data.ED);
        if (!currentWeek) {
          toast.error('Không tìm thấy tuần học hiện tại!');
          return;
        }
        SetWeekdata(currentWeek);  // Store the fetched week data in state
        setCurrentWeek(currentWeek.week);
        setListOfDay(currentWeek.schedule);

        currentWeek.schedule.forEach(item => {
          switch (item.NgayHoc) {
            case '2':
              SetMondayData(item);
              break;
            case '3':
              SetTuesDayData(item);
              break;
            case '4':
              SetWednesdayData(item);
              break;
            case '5':
              SetThursdayData(item);
              break;
            case '6':
              SetFridayData(item);
              break;
            case '7':
              SetSaturdayData(item);
              break;
            default:
              SetSundayData('');
              break;
          }
        });
      } else {
        toast.error('Không thể lấy lịch trình!');
      }
    } catch (error) {
      console.log(error);
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
          <div className="Schedule-entries">
            <DayEntry title="Monday" active={activeDay.Monday} data={Mondaydata} />
            <DayEntry title="Tuesday" active={activeDay.Tuesday} data={TuesDayData} />
            <DayEntry title="Wednesday" active={activeDay.Wednesday} data={WednesdayData} />
            <DayEntry title="Thursday" active={activeDay.Thursday} data={ThursdayData} />
            <DayEntry title="Friday" active={activeDay.Friday} data={FridayData} />
            <DayEntry title="Saturday" active={activeDay.Saturday} data={SaturdayData} />
            <DayEntry title="Sunday" active={activeDay.Sunday} data={SundayData} />
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

const DayEntry = ({ title, active, data }) => (
  <div className={active ? 'day-now' : 'day'}>
    {active && <div><i className="fa-solid fa-thumbtack"></i></div>}
    <div className="DayTag">{title}:</div>
    <span className="Data-Tag">
      {data ? (
        <>
          <div>{data.TenHP}</div>
          <div>Phòng Học: {data.PhongHoc}</div>
          <div>Tiết: {data.Tiet}</div>
        </>
      ) : (
        <div>{active ? "Hôm nay không có lịch học, bạn rảnh!" : "Hiện bạn không có lịch học"}</div>
      )}
    </span>
  </div>
);

export default Schedule;
