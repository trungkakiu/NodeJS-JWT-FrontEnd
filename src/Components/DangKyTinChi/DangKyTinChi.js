
import DangkytinchiApi from '../../Service/DangkytinchiApi'

const DangKyTinChi = (props) => {

    const getxlsx = async() =>{
        try {
            const txtUserNam = 'DTC225200152';
            const txtPassword = '07/05/2004';
            let response = await DangkytinchiApi.GetXlsxfile(txtUserNam,txtPassword);
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
}
export default DangKyTinChi;