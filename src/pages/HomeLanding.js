import React, { useState } from "react";
import { useEffect } from "react";
import ReactLoading from "react-loading";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import Header from "../components/Header";
import Footer from "../components/Footer";

const HomeLanding = () => {
  const [isLoading, setisLoading] = useState(true);
  const [topRatedBooks, setTopRaatedBooks] = useState({});
  const bookFetchUrl = "https://apis.ccbp.in/book-hub/top-rated-books";
  const apiHandler = async (key, value) => {
    const jwtToken = Cookies.get("jwt_token");
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: "GET",
    };

    const responseData = await fetch(bookFetchUrl, options);
    if (responseData.ok === true) {
      const res = await responseData.json();
      setTopRaatedBooks(res);
      setisLoading(false);
    }
  };
  useEffect(() => {
    apiHandler();
  }, []);
  return (
    <div>
      <Header />
      <div className="px-6 pt-6 lg:px-[100px] lg:pt-[48px] bg-[#F5F7FA]">
        <h1 className="text-[#1E293B] text-[20px] leading-[32px] lg:text-[40px] font-semibold lg:leading-[64px]">
          Find Your Next Favorite Books?
        </h1>
        <p className="pt-8 mb-4 text-[#475569] text-[14px] font-medium leading-[24px] lg:pt-3 lg:max-w-[998px] lg:mb-[32px] md:text-[20px] md:leading-[32px] ">
          You are in the right place. Tell us what titles or genres you have
          enjoyed in the past, and we will give you surprisingly insightful
          recommendations.
        </p>
        <div className=" bg-[#FFFFFF] rounded-[16px] shadow-md">
        <div className="pb-[12px] md:px-6 md:pt-[34px] md:pb-[32px]">
          <div className="flex flex-col-reverse md:flex-row md:justify-between md:items-center md:px-[47px]">
            <p className="text-[#1E293B] text-[24px] font-semibold leading-[32px]">
              Top Rated books
            </p>
            <Link
              to="/BooksListPage"
              className="block w-[104px] h-[36px] py-[10px] text-center bg-[#0284C7] rounded-[4px} text-[#F8FAFC] text-[12px] font-medium leading-[16px] mb-[32px] md:mb-0"
            >
              Find Books
            </Link>
          </div>
        </div>
        <ul className="flex flex-row justify-start items-center space-x-[12px] md:space-x-[24px] max-w-[1200px] overflow-scroll  no-scrollbar md:mx-[24px] rounded-b-[5px] pb-3">
          {isLoading ? (
            <div className="w-[320px] md:w-[800px] h-[99px] md:h-[224px] flex justify-center items-center">
              <ReactLoading type="spin" color="#0284C7" />
            </div>
          ) : topRatedBooks !== undefined ? (
            topRatedBooks.books.map((book, index) => (
              <li className="max-w-[146px] md:max-w-[350px]" key={book.id}>
                <Link to={`/BookDetailPage/${book.id}`}>
                  <div className="w-[146px] h-[99px] mb-[8px] rounded-[2px] md:w-[350px] md:h-[224px] md:mb-[24px] md:rounded-[4px]">
                    <img
                      src={book.cover_pic}
                      className="w-full h-full bg-gray-200 object-inherit rounded-[2px] md:rounded-[4px]"
                      alt="books"
                    />
                  </div>
                  <p className="text-[#334155] text-[12px] leading-[16px] md:text-[24px] font-semibold text-center md:leading-[32px] md:mb-[4px]">
                    {book.title}
                  </p>
                  <p className="text-[#475569] text-[10px] leading-[12px] md:text-[14px] text-center font-normal md:leading-[16px]">
                    {book.author_name}
                  </p>
                </Link>
              </li>
            ))
          ) : (
            <div className="w-[320px] md:w-[800px] h-[99px] md:h-[224px] flex justify-center items-center">
              <p>No books found</p>
            </div>
          )}
        </ul>
          
        </div>
       
      </div>
      <Footer />
    </div>
  );
};

export default HomeLanding;
