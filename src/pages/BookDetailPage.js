import React, { useEffect, useState } from "react";
import ratingStar from "../data/ratingStar.svg";
import { useParams } from "react-router-dom";
import Cookies from "js-cookie";
import ReactLoading from "react-loading";
import Header from "../components/Header";
import Footer from "../components/Footer";

const BookDetailPage = (props) => {
  const { bookId } = useParams();
  const [isLoading, setisLoading] = useState(true);
  const [bookDatas, setBookDatas] = useState({});
  const apiHandler = async () => {
    const jwtToken = Cookies.get("jwt_token");
    const URL = `https://apis.ccbp.in/book-hub/books/${bookId}`;
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: "GET",
    };

    const responseData = await fetch(URL, options);
    if (responseData.ok === true) {
      const res = await responseData.json();
      setBookDatas(res.book_details);
      setisLoading(false);
    }
  };
  useEffect(() => {
    apiHandler();
  }, []);
  return (
    <div>
      <Header />
      <div className="bg-[#F5F7FA]">
        <div className="px-[24px]  md:px-[150px] ">
          {isLoading ? (
            <div className="w-[320px] md:w-[800px] h-[99px] md:h-[224px] flex justify-center items-center">
              <ReactLoading type="spin" color="#0284C7" />
            </div>
          ) : bookDatas !== undefined ? (
            <div className=" pt-[24px] rounded-[12px]  md:p-[64px] md:rounded-[16px]">
              <div className="flex flex-col justify-center items-center space-y-[24px] pb-[24px] md:flex-row md:justify-center md:items-center md:space-y-0 md:space-x-[48px] md:pb-[32px] border-b-[1px] border-[#94A3B8]">
                {/* <div className='flex justify-center items-center'> */}
                <div className="  w-[235px] h-[274px] min-w-[235px] min-h-[274px] rounded-[8px] md:rounded-[14px]">
                  <img
                    src={bookDatas.cover_pic}
                    className="w-full h-full bg-gray-200 object-cover rounded-[8px] md:rounded-[14px] "
                    alt="books"
                  />
                </div>
                {/* </div> */}
                <div className="flex justify-center items-center">
                  <div className="w-full md:max-w-[152px] flex flex-col space-y-[8px]">
                    <h2 className="text-[#334155] text-[16px] font-semibold leading-[24px] max-w-[152px] breake-words">
                      {bookDatas.title}
                    </h2>
                    <p className="text-[#475569] text-[14px] font-medium leading-[16px]">
                      {bookDatas.about_author}
                    </p>
                    <div className="flex flex-row items-center justify-start">
                      <span className="text-[#475569] text-[12px] font-medium leading-[16px] mr-[4px]">
                        Avg Rating
                      </span>
                      <span className="w-[16px] h-[16px] max-w-[16px] max-h-[16px] mr-[4px]">
                        <img
                          src={ratingStar}
                          className=""
                          width="16px"
                          height="16px"
                        />
                      </span>
                      <span className="text-[#334155] text-[14px] font-normal leading-[14px] ">
                        {bookDatas.rating}
                      </span>
                    </div>
                    <div>
                      <span className="text-[#475569] text-[12px] font-medium leading-[16px] mr-[4px]">
                        Status :
                      </span>
                      <span className="text-[#0284C7] text-[12px] font-medium leading-[16px]">
                        {bookDatas.read_status}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <p className="pt-[24px] pb-[8px] text-[#334155] text-[16px] font-semibold leading-[24px] md:pt-[24px] md:pb-[16px] md:text-[24px] md:leading-[32px]">
                  About Author
                </p>
                <p className="text-[#475569] text-[14px] font-normal leading-[20px] md:text-[16px] md:leading-[28px]">
                  {bookDatas.about_author}
                </p>
              </div>
              <div>
                <p className="pt-[16px] pb-[8px] text-[#334155] text-[16px] font-semibold leading-[24px] md:pt-[32px] md:pb-[16px] md:text-[24px] md:leading-[32px]">
                  About Book
                </p>
                <p className="text-[#475569] text-[14px] font-normal leading-[20px] md:text-[16px] md:leading-[28px]">
                  {bookDatas.about_book}
                </p>
              </div>
            </div>
          ) : (
            <div className="w-[320px] md:w-[800px] h-[99px] md:h-[224px] flex justify-center items-center">
              <p>No books found</p>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default BookDetailPage;
