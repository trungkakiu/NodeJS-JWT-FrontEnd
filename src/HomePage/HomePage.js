
import React ,{ useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import '../HomePage/HomePage.scss';
import RouteApi from '../Service/RouteApi';
import slide1 from '../HomePage/Scrourcedata/VN-03-dog.jpg';
import slide2 from '../HomePage/Scrourcedata/👆🤓.png';
import slide3 from '../HomePage/Scrourcedata/tú and chuyền.jpg';
import slide4 from '../HomePage/Scrourcedata/nhại.jpg';
import slide5 from '../HomePage/Scrourcedata/tingg.jpg';
import slide6 from '../HomePage/Scrourcedata/giờ em như nào.jpg';
import slide7 from '../HomePage/Scrourcedata/đấm meme.jpg';
import { Dropdown } from 'react-bootstrap';
import ReactPaginate from "https://cdn.skypack.dev/react-paginate@7.1.3";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const HomePage = (props) =>{
    let history = useHistory();
    const [users, setUsers] = useState([]);
    const [pageCount, setPageCount] = useState([]);
    const [curentPage, setcrentPage] = useState(1);
    const [curentLimit, setcrentLimit] = useState(8);
    const settings = {
        dots: true,
        infinite: true,
        speed: 1000,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
    };
    
    useEffect(()=>{
        fetchClasses();
    },[]);
    const handlePageClick = (event) => {
        setcrentPage(+event.selected + 1);
       };

    const fetchClasses = async() =>{
        try {
            
            let data = await RouteApi.takeListClasses();
            console.log("Data: ", data)
            if(data && data.data.ED && data.data.EC === 0){
                if(Array.isArray(data.data.ED)){
                    setUsers(data.data.ED);
                }else {
                    toast.error("Data format is incorrect");
                }
            } else {
                toast.error("Failed to fetch users");
            }
        } catch (error) {
            toast.error("An error occurred while fetching users");
            console.error("Fetch users error:", error);
        }
    }
    return (
        <>
            <div className="app-container">
                    <div className='Nav-bar'>
                        <Dropdown className='bars'>
                        <i class="fa-solid fa-bars"></i>
                        </Dropdown>
                    </div>  
                    <div className="right-content row">
                            <ToastContainer/>
                            <div className="App-right-header slider-wrapper">
                          
                                <Slider {...settings}>
                                    <div>
                                        <img src={slide1} alt="Slide 1" />
                                    </div>
                                    <div>
                                        <img src={slide2} alt="Slide 2" />
                                    </div>
                                    <div>
                                        <img src={slide3} alt="Slide 3" />
                                    </div>
                                </Slider>
                           
                            </div>
                            <div className='App-theme-container '> 
                                <div className="shadow-lg App-theme App-theme-picture-1">
                                     <img src={slide4} alt="Slide 4" />
                                     <div class="overlay-content">Nothing here!</div>
                                </div>
                                <div className="shadow-lg App-theme App-theme-picture-2">
                                     <img src={slide5} alt="Slide 5" />
                                     <div class="overlay-content">Nothing here!</div>
                                </div>
                                <div className="shadow-lg App-theme App-theme-picture-3">
                                     <img src={slide6} alt="Slide 6" />
                                     <div class="overlay-content">Nothing here!</div>
                                </div>
                                <div className="shadow-lg App-theme App-theme-picture-4">
                                     <img src={slide7} alt="Slide 7" />
                                     <div class="overlay-content">Nothing here!</div>
                                </div>
                            </div>
                            
                            <div className="App-Header-dashborad">
                                <div className="App-table">
                                <table class="table table-hover mt-5">
                                <thead>
                                    <tr>
                                        <th></th>
                                        <th>Tên lớp học phần</th>
                                        <th>Tên học phần</th>
                                        <th>Ngày đăng ký </th> 
                                        <th>Giáo viên phụ trách</th>
                                        <th>Tuần học</th>
                                        <th>Ngày kết thúc</th>
                                        <th>Trạng thái</th>
                                    </tr>
                              </thead>
                             <tbody>
                             {users.map((item, index) => (
                               <tr key={index}>
                                <td>{index+1}</td>
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
                                <div className='page-paginate'>
                            { pageCount &&
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
        
    )
}

export default HomePage;