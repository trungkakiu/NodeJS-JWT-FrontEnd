import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import '../HomePage/HomePage.scss';
import CryptoJS from 'crypto-js';
import RouteApi from '../Service/RouteApi';
import slide1 from '../HomePage/Scrourcedata/Sự kết nối kỳ diệu.jpg';
import slide2 from '../HomePage/Scrourcedata/👆🤓.png';
import slide3 from '../HomePage/Scrourcedata/tú and chuyền.jpg';
import slide4 from '../HomePage/Scrourcedata/nhại.jpg';
import slide5 from '../HomePage/Scrourcedata/tingg.jpg';
import slide6 from '../HomePage/Scrourcedata/vit ngoc.jpg';
import slide7 from '../HomePage/Scrourcedata/đấm meme.jpg';
import { Dropdown } from 'react-bootstrap';
import ReactPaginate from 'react-paginate';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthContext } from '../Context/Authenticate-context';
import DangKyTinChi from '../Components/DangKyTinChi/DangKyTinChi';
import DangkytinchiApi from '../Service/DangkytinchiApi'


const HomePage = () => {
  const { authState } = useContext(AuthContext);
  const history = useHistory();
  const [users, setUsers] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentLimit, setCurrentLimit] = useState(8);
  const settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
  };

  const handlePageClick = (event) => {
    setCurrentPage(event.selected + 1);
  };


  const fetchClasses = async () => {
    try {
      let data = await RouteApi.takeListClasses();
      if (data && data.data.ED && data.data.EC === 0) {
        if (Array.isArray(data.data.ED)) {
          setUsers(data.data.ED);
          setPageCount(Math.ceil(data.data.ED.length / currentLimit));
        } else {
          toast.error("Data format is incorrect");
        }
      } else {
        toast.warning("You don't have any classes");
      }
    } catch (error) {
      toast.error("An error occurred while fetching users");
      console.error("Fetch users error:", error);
    }
  };

  const generateMD5Hash = (data) => {
    return CryptoJS.MD5(data).toString();
  };
  const getxlsx = async() =>{
    try {
        const txtUserName = 'DTC225200152';
        const txtPassword = generateMD5Hash('07/05/2004');
        let response = await DangkytinchiApi(txtUserName,txtPassword);
        console.log("Dktc response: ", response);
        if(response) {
            console.log("Dktc response: ", response);
        }else{
            console.log("Khong lay duoc thong tin roi :))")
        }
    } catch (error) {
        console.log("Loi server roi nhe :))")
        console.log(error)
    }
  }
  useEffect(() => {
    fetchClasses();
  }, []);



  
  return (
    <>
      <div className="app-container">
        <div className='Nav-bar'>
          <Dropdown className='bars'>
            <i className="fa-solid fa-bars"></i>
            <button onClick={getxlsx} className='btn btn-secondary'>Get</button>
          </Dropdown>
        </div>
        <div className="right-content row">
          <ToastContainer />
          <div className="App-right-header slider-wrapper">
            <Slider {...settings}>
              <div><img src={slide1} alt="Slide 1" /></div>
              <div><img src={slide2} alt="Slide 2" /></div>
              <div><img src={slide3} alt="Slide 3" /></div>
            </Slider>
          </div>
          <div className='App-theme-container'>
            <div className="shadow-lg App-theme App-theme-picture-1">
              <img src={slide4} alt="Slide 4" />
              <div className="overlay-content">Nothing here!</div>
            </div>
            <div className="shadow-lg App-theme App-theme-picture-2">
              <img src={slide5} alt="Slide 5" />
              <div className="overlay-content">Nothing here!</div>
            </div>
            <div className="shadow-lg App-theme App-theme-picture-3">
              <img src={slide6} alt="Slide 6" />
              <div className="overlay-content">Nothing here!</div>
            </div>
            <div className="shadow-lg App-theme App-theme-picture-4">
              <img src={slide7} alt="Slide 7" />
              <div className="overlay-content">Nothing here!</div>
            </div>
          </div>
          <div className="App-Header-dashborad">
            <div className="App-table">
              {authState.data.Roleid === "SV" ? 
              <table className="table table-hover mt-5">
              <thead>
                <tr>
                  <th></th>
                  <th>Tên lớp học phần</th>
                  <th>Tên học phần</th>
                  <th>Ngày đăng ký</th>
                  <th>Giáo viên phụ trách</th>
                  <th>Tuần học</th>
                  <th>Ngày kết thúc</th>
                  <th>Trạng thái</th>
                </tr>
              </thead>
              <tbody>
                {users.map((item, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{item.TenLop}</td>
                    <td>{item.TenHP}</td>
                    <td>{new Date(item.NgayBD).toLocaleDateString()}</td>
                    <td>{item.GiaoVien}</td>
                    <td>{item.TuanHoc}</td>
                    <td>{new Date(item.NgayKT).toLocaleDateString()}</td>
                    <td>{item.TrangThai}</td>
                  </tr>
                ))}
              </tbody>
            </table> : <table className="table table-hover mt-5">
                <thead>
                  <tr>
                    <th></th>
                    <th>Tên lớp học phần</th>
                    <th>Tên học phần</th>
                    <th>Ngày đăng ký</th>
                    <th>Tuần học</th>
                    <th>Ngày kết thúc</th>
                    <th>Trạng thái</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((item, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{item.TenLop}</td>
                      <td>{item.TenHP}</td>
                      <td>{new Date(item.NgayBD).toLocaleDateString()}</td>
                      <td>{item.GiaoVien}</td>
                      <td>{item.TuanHoc}</td>
                      <td>{new Date(item.NgayKT).toLocaleDateString()}</td>
                      <td>{item.TrangThai}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              }
              
              <div className='page-paginate'>
                {pageCount > 0 &&
                  <ReactPaginate
                    nextLabel="next >"
                    onPageChange={handlePageClick}
                    pageRangeDisplayed={3}
                    marginPagesDisplayed={2}
                    pageCount={pageCount}
                    previousLabel="< previous"
                    pageClassName="page-item"
                    pageLinkClassName="page-link"
                    previousClassName="page-item"
                    previousLinkClassName="page-link"
                    nextClassName="page-item"
                    nextLinkClassName="page-link"
                    breakLabel="..."
                    breakClassName="page-item"
                    breakLinkClassName="page-link"
                    containerClassName="pagination"
                    activeClassName="active"
                    renderOnZeroPageCount={null}
                  />
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;
